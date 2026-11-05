import React, { useEffect, useState } from "react";
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
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import { useShellGesture } from "./shell/ShellGestureContext";
import { useOsFormFactor } from "@/hooks/useOsFormFactor";
import { cn } from "@/lib/utils";

type AppClass = (typeof Applications)[keyof typeof Applications];

/** iOS / iPadOS App Library — list on iPhone, icon grid on iPad. */
export const AppLibrary = () => {
  const { launchpad: open } = useAppState();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [raised, setRaised] = useState(false);
  const { width } = useWindowSize();
  const { isIos } = useOsFormFactor();
  const { progress, settleProgress, setMode, reset } = useShellGesture();

  useMotionValueEvent(progress, "change", (p) => {
    setRaised(p > 0.02 || open);
  });

  useEffect(() => {
    setRaised(open || progress.get() > 0.02);
    if (open) {
      setMode("library");
      void settleProgress(1);
    } else if (progress.get() > 0) {
      void (async () => {
        await settleProgress(0);
        reset();
      })();
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

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

  const overlayOpacity = useTransform(progress, [0, 0.12, 1], [0, 0.4, 0.78]);
  const blurPx = useTransform(progress, [0, 1], [0, 40]);
  const backdropFilter = useMotionTemplate`blur(${blurPx}px) saturate(180%)`;

  const contentY = useTransform(progress, [0, 1], [88, 0]);
  const contentOpacity = useTransform(progress, [0, 0.18, 1], [0, 0.5, 1]);
  const contentScale = useTransform(progress, [0, 1], [1.08, 1]);
  const searchY = useTransform(progress, [0, 1], [-28, 0]);
  const searchOpacity = useTransform(progress, [0, 0.4, 1], [0, 0, 1]);

  const dismiss = () => {
    if (open) toggleLaunchpad()(dispatch);
  };

  const launch = (appName: string) => startApp(appName)(dispatch);

  return (
    <div
      id="app-library"
      className="fixed inset-0 w-screen h-screen overflow-y-auto overflow-x-hidden"
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
        className="fixed inset-0 z-0 border-0 cursor-default"
        style={{
          opacity: overlayOpacity,
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter,
          WebkitBackdropFilter: backdropFilter as unknown as string,
        }}
      />

      <motion.div
        className="pointer-events-none fixed left-1/2 z-[1] -translate-x-1/2 w-[min(340px,88vw)] flex items-center justify-center"
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
        className={cn(
          "pointer-events-none relative z-[1] mx-auto px-4",
          isIos ? "max-w-lg" : "max-w-3xl px-6"
        )}
        style={{
          paddingTop: "calc(var(--status-strip-height) + 64px)",
          paddingBottom: "calc(var(--mobile-dock-offset) + 24px)",
          y: contentY,
          opacity: contentOpacity,
          scale: contentScale,
          transformOrigin: "center top",
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
    <section className={className}>
      <h2 className="os-chrome-em mb-2 px-1 text-[13px] tracking-[-0.08px] text-white/55 uppercase">
        {title}
      </h2>
      <ul className="pointer-events-auto overflow-hidden rounded-[14px] bg-white/12 backdrop-blur-xl border border-white/10">
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
