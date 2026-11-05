import React, { useEffect, useRef, useState } from "react";
import { Applications } from "../applications";
import { AppButton } from "./application/AppButton";
import { filter } from "lodash";
import { useWindowSize } from "usehooks-ts";
import { useAppDispatch, useAppState } from "../store";
import { toggleLaunchpad } from "../store/actions/toggleLaunchPad";
import { startApp } from "../store/actions/startApp";
import { Search } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import { GENIE_CANCEL, useShellGesture } from "./shell/ShellGestureContext";
import { useOsFormFactor } from "@/hooks/useOsFormFactor";
import { cn } from "@/lib/utils";

type AppClass = (typeof Applications)[keyof typeof Applications];

/** Finger travel (px) that maps open→closed while swiping down. */
const DISMISS_SCRUB = 240;
const DISMISS_COMMIT = 0.42;
const DISMISS_FLICK = 0.22;
/** Downward velocity (px/ms) that assists dismiss. */
const DISMISS_VELOCITY = 0.55;

/** iOS / iPadOS App Library — list on iPhone, icon grid on iPad. */
export const AppLibrary = () => {
  const { launchpad: open } = useAppState();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [raised, setRaised] = useState(false);
  const { width } = useWindowSize();
  const { isIos } = useOsFormFactor();
  const {
    progress,
    mode,
    settleProgress,
    setProgress,
    setMode,
    reset,
  } = useShellGesture();
  const scrollRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(open);
  const dismissRef = useRef<() => void>(() => {});
  // Only scrub library visuals from Home — ignore shared progress during app→home / switcher.
  const libraryProgress = useMotionValue(0);

  openRef.current = open;

  const syncLibraryProgress = (p: number, m = mode.get()) => {
    const active = open || m === "library";
    libraryProgress.set(active ? p : 0);
    setRaised(active && (open || p > 0.02));
  };

  useMotionValueEvent(progress, "change", (p) => syncLibraryProgress(p));
  useMotionValueEvent(mode, "change", (m) =>
    syncLibraryProgress(progress.get(), m)
  );

  useEffect(() => {
    if (open) {
      setMode("library");
      void settleProgress(1);
      syncLibraryProgress(1, "library");
    } else if (mode.get() === "library" && progress.get() > 0) {
      void (async () => {
        await settleProgress(0);
        reset();
        syncLibraryProgress(0, "idle");
      })();
    } else {
      syncLibraryProgress(0);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  const dismiss = () => {
    if (openRef.current) toggleLaunchpad()(dispatch);
  };
  dismissRef.current = dismiss;

  /**
   * Native non-passive touch listeners — React's onPointerMove is passive for
   * touch on iOS, so preventDefault never wins against scroll and the gesture dies.
   */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !open) return;

    let startY: number | null = null;
    let startX: number | null = null;
    let lastY = 0;
    let lastT = 0;
    let velocityY = 0;
    let scrubbing = false;
    let suppressClick = false;

    const onStart = (e: TouchEvent) => {
      if (!openRef.current || e.touches.length !== 1) return;
      if ((e.target as HTMLElement).closest("input, textarea")) {
        startY = null;
        return;
      }
      const t = e.touches[0];
      startY = t.clientY;
      startX = t.clientX;
      lastY = t.clientY;
      lastT = performance.now();
      velocityY = 0;
      scrubbing = false;
      suppressClick = false;
    };

    const onMove = (e: TouchEvent) => {
      if (!openRef.current || startY == null || startX == null) return;
      if (e.touches.length !== 1) return;

      const t = e.touches[0];
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      velocityY = (t.clientY - lastY) / dt;
      lastY = t.clientY;
      lastT = now;

      const dy = t.clientY - startY;
      const dx = t.clientX - startX;
      const atTop = el.scrollTop <= 1;

      if (!scrubbing) {
        if (!atTop || dy < 8) return;
        if (dy < Math.abs(dx) * 1.05) return;
        scrubbing = true;
        suppressClick = true;
        progress.stop();
        setMode("library");
      }

      // Must be non-passive — blocks iOS scroll so the dismiss scrub can run.
      e.preventDefault();
      el.scrollTop = 0;
      const p = Math.min(1, Math.max(0, 1 - Math.max(0, dy) / DISMISS_SCRUB));
      setProgress(p);
    };

    const finish = async (clientY: number) => {
      if (!scrubbing || startY == null) {
        startY = null;
        startX = null;
        scrubbing = false;
        return;
      }

      const dy = Math.max(0, clientY - startY);
      const p = Math.min(1, Math.max(0, 1 - dy / DISMISS_SCRUB));
      const flick =
        p <= 1 - DISMISS_FLICK && velocityY >= DISMISS_VELOCITY;
      const commit = p <= 1 - DISMISS_COMMIT || flick;

      scrubbing = false;
      startY = null;
      startX = null;

      if (commit) {
        dismissRef.current();
        return;
      }

      await settleProgress(1, GENIE_CANCEL);
    };

    const onEnd = (e: TouchEvent) => {
      const y = e.changedTouches[0]?.clientY ?? lastY;
      void finish(y);
    };

    const onCancel = () => {
      void finish(lastY);
    };

    // Kill the synthetic click after a dismiss scrub so list rows don't launch.
    const onClickCapture = (e: MouseEvent) => {
      if (!suppressClick) return;
      e.preventDefault();
      e.stopPropagation();
      suppressClick = false;
    };

    // Capture + non-passive so iOS can't steal the gesture for scroll first.
    el.addEventListener("touchstart", onStart, { passive: true, capture: true });
    el.addEventListener("touchmove", onMove, { passive: false, capture: true });
    el.addEventListener("touchend", onEnd, { capture: true });
    el.addEventListener("touchcancel", onCancel, { capture: true });
    el.addEventListener("click", onClickCapture, true);

    return () => {
      el.removeEventListener("touchstart", onStart, true);
      el.removeEventListener("touchmove", onMove, true);
      el.removeEventListener("touchend", onEnd, true);
      el.removeEventListener("touchcancel", onCancel, true);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, [open, progress, setMode, setProgress, settleProgress]);

  const iconSize = width >= 768 ? "100px" : "72px";
  const q = search.toLowerCase();

  const apps = filter(
    Applications,
    (a) => a.category === "default" && a.appName.toLowerCase().includes(q)
  ) as AppClass[];
  const projects = filter(
    Applications,
    (a) => a.category === "project" && a.appName.toLowerCase().includes(q)
  ) as AppClass[];

  const overlayOpacity = useTransform(
    libraryProgress,
    [0, 0.12, 1],
    [0, 0.4, 0.78]
  );
  const blurPx = useTransform(libraryProgress, [0, 1], [0, 40]);
  const backdropFilter = useMotionTemplate`blur(${blurPx}px) saturate(180%)`;

  const contentY = useTransform(libraryProgress, [0, 1], [88, 0]);
  const contentOpacity = useTransform(
    libraryProgress,
    [0, 0.18, 1],
    [0, 0.5, 1]
  );
  const contentScale = useTransform(libraryProgress, [0, 1], [1.08, 1]);
  const searchY = useTransform(libraryProgress, [0, 1], [-28, 0]);
  const searchOpacity = useTransform(libraryProgress, [0, 0.4, 1], [0, 0, 1]);

  const launch = (appName: string) => startApp(appName)(dispatch);

  return (
    <div
      id="app-library"
      className="fixed inset-0 flex w-screen flex-col overflow-hidden"
      style={{
        zIndex: raised ? 50 : -10,
        pointerEvents: open ? "auto" : "none",
      }}
      aria-hidden={!open}
    >
      <motion.button
        type="button"
        aria-label="Dismiss App Library"
        onClick={dismiss}
        className="absolute inset-0 z-0 border-0 cursor-default"
        style={{
          opacity: overlayOpacity,
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter,
          WebkitBackdropFilter: backdropFilter as unknown as string,
        }}
      />

      <motion.div
        className="pointer-events-none absolute left-1/2 z-[2] -translate-x-1/2 w-[min(340px,88vw)] flex items-center justify-center"
        style={{
          top: "calc(var(--status-strip-height) + 8px)",
          y: searchY,
          opacity: searchOpacity,
        }}
      >
        <div className="pointer-events-auto relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="App Library"
            className="os-chrome w-full pr-3 pl-9 py-2 rounded-full border border-white/20 bg-white/15 focus:outline-none text-white/95 text-[15px] tracking-[-0.08px] focus:ring-1 focus:ring-white/35 placeholder:text-white/45"
          />
        </div>
      </motion.div>

      <motion.div
        ref={scrollRef}
        className={cn(
          "relative z-[1] mx-auto min-h-0 w-full flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain px-4",
          isIos ? "max-w-lg" : "max-w-3xl px-6"
        )}
        style={{
          paddingTop: "calc(var(--status-strip-height) + 64px)",
          paddingBottom: "calc(var(--mobile-dock-offset) + 24px)",
          y: contentY,
          opacity: contentOpacity,
          scale: contentScale,
          transformOrigin: "center top",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
        }}
      >
        {isIos ? (
          <>
            <LibraryListSection title="Apps" apps={apps} onLaunch={launch} />
            <LibraryListSection
              title="Projects"
              apps={projects}
              onLaunch={launch}
              className="mt-8"
            />
            {/* Extra pull room so swipe-down is easy even with short lists */}
            <div className="h-24" aria-hidden />
          </>
        ) : (
          <>
            <h2 className="os-chrome-em mb-4 text-[20px] tracking-[-0.3px] text-white/95">
              Apps
            </h2>
            <div className="pointer-events-auto grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-y-8 gap-x-3 justify-items-center">
              {apps.map((app) => (
                <AppButton
                  size={iconSize}
                  key={`lib-app-${app.appName}`}
                  appIcon={app.icon()}
                  appName={app.appName}
                  onClick={() => launch(app.appName)}
                />
              ))}
            </div>

            <h2 className="os-chrome-em mb-4 mt-12 text-[20px] tracking-[-0.3px] text-white/95">
              Projects
            </h2>
            <div className="pointer-events-auto grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-y-8 gap-x-3 justify-items-center">
              {projects.map((app) => (
                <AppButton
                  size={iconSize}
                  key={`lib-project-${app.appName}`}
                  appIcon={app.icon()}
                  appName={app.appName}
                  onClick={() => launch(app.appName)}
                />
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

function LibraryListSection({
  title,
  apps,
  onLaunch,
  className,
}: {
  title: string;
  apps: AppClass[];
  onLaunch: (name: string) => void;
  className?: string;
}) {
  if (apps.length === 0) return null;

  return (
    <section className={cn("pointer-events-auto", className)}>
      <h2 className="os-chrome-em mb-2 px-1 text-[13px] tracking-[-0.08px] text-white/55 uppercase">
        {title}
      </h2>
      <ul className="overflow-hidden rounded-[14px] bg-white/12 backdrop-blur-xl border border-white/10">
        {apps.map((app, i) => (
          <li key={`lib-row-${app.appName}`}>
            <button
              type="button"
              onClick={() => onLaunch(app.appName)}
              className={cn(
                "flex w-full items-center gap-3 px-3.5 py-2.5 text-left cursor-pointer",
                "active:bg-white/10",
                i > 0 && "border-t border-white/10"
              )}
            >
              <div className="size-11 shrink-0 overflow-hidden rounded-[11px]">
                {app.icon()}
              </div>
              <span className="os-chrome flex-1 truncate text-[17px] tracking-[-0.4px] text-white/95">
                {app.appName}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
