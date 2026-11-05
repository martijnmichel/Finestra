import { useRef } from "react";
import { useAppContext } from "../store";
import { goHome } from "../store/actions/goHome";
import { toggleAppSwitcher } from "../store/actions/toggleAppSwitcher";
import { toggleLaunchpad } from "../store/actions/toggleLaunchPad";

const HOLD_MS = 320;
const SWIPE_PX = 28;
const FAST_MS = 400;

/**
 * Simple home indicator (no Motion scrub):
 * - swipe up + hold → App Switcher
 * - fast swipe up (app open) → Home
 * - fast swipe up (on Home) → App Library
 */
export const HomeIndicator = () => {
  const { state, dispatch } = useAppContext();
  const startY = useRef<number | null>(null);
  const startAt = useRef(0);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didHold = useRef(false);
  const holdArmed = useRef(false);

  const clearHold = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
    holdArmed.current = false;
  };

  const onHome = !state.applications.some((app) => !app.minimized);

  const armHold = () => {
    if (holdArmed.current || didHold.current || onHome || state.launchpad) return;
    holdArmed.current = true;
    holdTimer.current = setTimeout(() => {
      didHold.current = true;
      toggleAppSwitcher(true)(dispatch);
    }, HOLD_MS);
  };

  return (
    <div
      className="fixed z-[45] inset-x-0 bottom-0 flex flex-col items-center justify-end"
      style={{
        height: "calc(24px + max(8px, env(safe-area-inset-bottom)))",
        touchAction: "none",
      }}
      onPointerDown={(e) => {
        if (state.appSwitcher) return;
        startY.current = e.clientY;
        startAt.current = performance.now();
        didHold.current = false;
        clearHold();
        try {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      }}
      onPointerMove={(e) => {
        if (startY.current == null) return;
        const dy = startY.current - e.clientY;
        if (dy > SWIPE_PX) armHold();
      }}
      onPointerUp={(e) => {
        const sy = startY.current;
        const held = didHold.current;
        clearHold();
        startY.current = null;
        if (held || sy == null) return;

        const dy = Math.max(0, sy - e.clientY);
        const elapsed = performance.now() - startAt.current;
        if (dy < SWIPE_PX || elapsed >= FAST_MS) return;

        if (onHome) {
          if (!state.launchpad) toggleLaunchpad()(dispatch);
        } else {
          goHome()(dispatch);
        }
      }}
      onPointerCancel={() => {
        clearHold();
        startY.current = null;
        didHold.current = false;
      }}
    >
      <div
        className="mb-[max(8px,env(safe-area-inset-bottom))] h-1.5 w-[134px] rounded-full bg-white/70 shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
        aria-hidden
      />
      <span className="sr-only">
        Swipe up for Home or App Library. Swipe up and hold for App Switcher.
      </span>
    </div>
  );
};
