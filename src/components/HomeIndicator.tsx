import { useRef } from "react";
import { useAppContext } from "../store";
import { goHome } from "../store/actions/goHome";
import { toggleAppSwitcher } from "../store/actions/toggleAppSwitcher";
import { toggleLaunchpad } from "../store/actions/toggleLaunchPad";
import {
  GENIE_SETTLE,
  useShellGesture,
} from "./shell/ShellGestureContext";

const HOLD_MS = 300;
const SWIPE_PX = 24;
const FAST_MS = 360;
const SCRUB_DISTANCE = 260;
const COMMIT = 0.4;
const DISMISS_PROGRESS = 0.72;
const DISMISS_VELOCITY = 1.1; // px/ms

/**
 * Home indicator gestures:
 * - Home + drag → App Library scrubs in
 * - App + drag → window follows finger, genie-scales down
 * - App + hold mid-drag → App Switcher
 * - App + fast / far flick → genie dismiss to Home
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

  const onHome = !state.applications.some((app) => !app.minimized);
  const libraryOpen = state.launchpad;
  const switcherOpen = state.appSwitcher;

  const armHold = () => {
    if (holdArmed.current || didHold.current || libraryOpen || onHome) return;
    holdArmed.current = true;
    holdTimer.current = setTimeout(() => {
      didHold.current = true;
      gesture.setMode("switcher");
      toggleAppSwitcher(true)(dispatch);
    }, HOLD_MS);
  };

  const commitLibrary = async () => {
    gesture.setMode("library");
    await gesture.settleProgress(1);
    await gesture.settleDrag();
    if (!state.launchpad) toggleLaunchpad()(dispatch);
    gesture.setMode("idle");
  };

  const commitHome = async () => {
    gesture.setMode("home");
    // Tween (not spring) so the genie suck doesn't overshoot and stutter.
    await Promise.all([
      gesture.settleProgress(1, GENIE_SETTLE),
      gesture.settleDrag(GENIE_SETTLE),
    ]);
    goHome()(dispatch);
    // Delay reset so the poured frame stays until Transition unmounts
    // (reset → progress 0 would otherwise snap the window full-size).
    window.setTimeout(() => gesture.reset(), 80);
  };

  const cancelScrub = async () => {
    clearHold();
    await Promise.all([gesture.settleProgress(0), gesture.settleDrag()]);
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

        const p = Math.min(1, dy / SCRUB_DISTANCE);
        gesture.setProgress(p);
        // Follow the finger: upward drag + horizontal freedom.
        gesture.setDragOffset(dx * 0.85, -dy * 0.55);

        if (dy > SWIPE_PX) armHold();
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

        const dy = Math.max(0, sy - e.clientY);
        const elapsed = performance.now() - startAt.current;
        const p = Math.min(1, dy / SCRUB_DISTANCE);
        const fastUp = dy > SWIPE_PX && elapsed < FAST_MS;
        const flickDismiss =
          !onHome &&
          (p >= DISMISS_PROGRESS ||
            (fastUp && velocityY.current >= DISMISS_VELOCITY));
        const committed = p >= COMMIT || fastUp;

        if (!committed) {
          await cancelScrub();
          return;
        }

        if (onHome) {
          await commitLibrary();
        } else if (flickDismiss || committed) {
          await commitHome();
        } else {
          await cancelScrub();
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
        Drag up to shrink the app. Hold for App Switcher. Flick to go Home.
      </span>
    </div>
  );
};
