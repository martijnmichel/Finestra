import { useRef } from "react";
import { useAppContext } from "../store";
import { goHome } from "../store/actions/goHome";
import { toggleAppSwitcher } from "../store/actions/toggleAppSwitcher";
import { toggleLaunchpad } from "../store/actions/toggleLaunchPad";
import {
  GENIE_CANCEL,
  GENIE_SETTLE,
  useShellGesture,
} from "./shell/ShellGestureContext";

/** Hold past dismiss threshold before App Switcher opens. */
const HOLD_MS = 2000;
/** Finger travel (px) that maps to progress 0→1 — drag is the timeline. */
const SCRUB_DISTANCE = 420;
/** Release at/above this progress commits dismiss; hold only arms at/above this. */
const COMMIT = 0.55;
/** Strong upward flick can commit a bit earlier, but still needs real scrub. */
const FLICK_COMMIT = 0.42;
const DISMISS_VELOCITY = 1.35; // px/ms

/**
 * Home indicator gestures:
 * - Home + drag → App Library scrubs with the finger (release past threshold opens)
 * - App + drag → dismiss timeline follows the finger; drag back down cancels
 * - App + hold several seconds after dismiss threshold → App Switcher
 * - Release past threshold → finish genie / open library
 */
export const HomeIndicator = () => {
  const { state, dispatch } = useAppContext();
  const gesture = useShellGesture();
  const startY = useRef<number | null>(null);
  const startX = useRef<number | null>(null);
  const startAt = useRef(0);
  const lastY = useRef(0);
  const lastT = useRef(0);
  const velocityY = useRef(0);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didHold = useRef(false);
  const holdArmed = useRef(false);
  const dragging = useRef(false);

  const clearHold = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
    holdArmed.current = false;
  };

  const stopSettling = () => {
    gesture.progress.stop();
    gesture.dragX.stop();
    gesture.dragY.stop();
  };

  const onHome = !state.applications.some((app) => !app.minimized);
  const libraryOpen = state.launchpad;
  const switcherOpen = state.appSwitcher;

  const armHold = () => {
    if (holdArmed.current || didHold.current || libraryOpen || onHome) return;
    holdArmed.current = true;
    holdTimer.current = setTimeout(() => {
      // Still past dismiss threshold when the hold completes?
      if (gesture.progress.get() < COMMIT) {
        holdArmed.current = false;
        holdTimer.current = null;
        return;
      }
      didHold.current = true;
      gesture.setMode("switcher");
      toggleAppSwitcher(true)(dispatch);
    }, HOLD_MS);
  };

  const commitLibrary = async () => {
    gesture.setMode("library");
    const remaining = Math.max(0.15, 1 - gesture.progress.get());
    await Promise.all([
      gesture.settleProgress(1, {
        ...GENIE_SETTLE,
        duration: 0.35 + remaining * 0.45,
      }),
      gesture.settleDrag(GENIE_SETTLE),
    ]);
    if (!state.launchpad) toggleLaunchpad()(dispatch);
    gesture.setMode("idle");
  };

  const commitHome = async () => {
    gesture.setMode("home");
    const remaining = Math.max(0.12, 1 - gesture.progress.get());
    // Only animate the unfinished tail — scrub already played up to release.
    await Promise.all([
      gesture.settleProgress(1, {
        ...GENIE_SETTLE,
        duration: 0.4 + remaining * 0.55,
      }),
      gesture.settleDrag({
        ...GENIE_SETTLE,
        duration: 0.35 + remaining * 0.4,
      }),
    ]);
    goHome()(dispatch);
    window.setTimeout(() => gesture.reset(), 80);
  };

  const cancelScrub = async () => {
    clearHold();
    await Promise.all([
      gesture.settleProgress(0, GENIE_CANCEL),
      gesture.settleDrag(GENIE_CANCEL),
    ]);
    gesture.setMode("idle");
  };

  return (
    <div
      className="fixed z-[45] inset-x-0 bottom-0 flex flex-col items-center justify-end"
      style={{
        height: "calc(28px + max(8px, env(safe-area-inset-bottom)))",
        touchAction: "none",
      }}
      onPointerDown={(e) => {
        if (switcherOpen) return;
        stopSettling();
        startY.current = e.clientY;
        startX.current = e.clientX;
        startAt.current = performance.now();
        lastY.current = e.clientY;
        lastT.current = startAt.current;
        velocityY.current = 0;
        didHold.current = false;
        dragging.current = true;
        clearHold();
        gesture.setMode(onHome ? "library" : "home");
        gesture.setProgress(0);
        gesture.setDragOffset(0, 0);
        try {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      }}
      onPointerMove={(e) => {
        if (startY.current == null || startX.current == null || !dragging.current)
          return;
        if (libraryOpen && onHome) return;
        if (didHold.current) return;

        const now = performance.now();
        const dy = Math.max(0, startY.current - e.clientY);
        const dx = e.clientX - startX.current;
        const dt = Math.max(1, now - lastT.current);
        velocityY.current = (lastY.current - e.clientY) / dt;
        lastY.current = e.clientY;
        lastT.current = now;

        // Drag position IS the timeline (incl. dragging back down toward 0).
        const p = Math.min(1, dy / SCRUB_DISTANCE);
        gesture.setProgress(p);
        gesture.setDragOffset(dx * 0.85, -dy * 0.55);

        // Switcher only after dismiss threshold + long hold; drag back cancels arm.
        if (p >= COMMIT) {
          armHold();
        } else if (holdArmed.current) {
          clearHold();
        }
      }}
      onPointerUp={async (e) => {
        const sy = startY.current;
        const held = didHold.current;
        const wasDragging = dragging.current;
        clearHold();
        startY.current = null;
        startX.current = null;
        dragging.current = false;

        if (!wasDragging || sy == null) return;

        if (held) {
          await gesture.settleDrag();
          gesture.setProgress(0.55);
          return;
        }

        if (libraryOpen && onHome) {
          gesture.reset();
          return;
        }

        // Decide from release position — not from peak. Dragging back cancels.
        const dy = Math.max(0, sy - e.clientY);
        const p = Math.min(1, dy / SCRUB_DISTANCE);
        const flickAssist =
          !onHome &&
          p >= FLICK_COMMIT &&
          velocityY.current >= DISMISS_VELOCITY;
        const committed = p >= COMMIT || flickAssist;

        if (!committed) {
          await cancelScrub();
          return;
        }

        if (onHome) {
          await commitLibrary();
        } else {
          await commitHome();
        }
      }}
      onPointerCancel={async () => {
        clearHold();
        startY.current = null;
        startX.current = null;
        dragging.current = false;
        didHold.current = false;
        if (state.appSwitcher) {
          await gesture.settleDrag();
          return;
        }
        await cancelScrub();
      }}
    >
      <div
        className="mb-[max(8px,env(safe-area-inset-bottom))] h-1.5 w-[134px] rounded-full bg-white/70 shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
        aria-hidden
      />
      <span className="sr-only">
        Drag up to scrub dismiss. Drag back down to cancel. Hold past the
        dismiss threshold for App Switcher.
      </span>
    </div>
  );
};
