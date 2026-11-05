import React, { useEffect, useMemo, useState } from "react";
import Headshot from "../../profile/assets/headshot.png";
import { DEFAULT_THEME, type ThemeConfig } from "@/lib/appearance";
import { OS_NAME, storageKey } from "@/lib/os";
import { cn } from "@/lib/utils";

const USER_NAME = "Martijn van der Eijk";
const THEME_KEY = storageKey("theme");

function readBootTheme(): ThemeConfig {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    if (!raw) return DEFAULT_THEME;
    return { ...DEFAULT_THEME, ...(JSON.parse(raw) as ThemeConfig) };
  } catch {
    return DEFAULT_THEME;
  }
}

/** macOS-style login / “Logging in…” splash while resources warm up. */
export const Boot = () => {
  const theme = useMemo(() => readBootTheme(), []);
  const [progress, setProgress] = useState(0.08);
  const [phase, setPhase] = useState<"ready" | "signing-in">("ready");

  useEffect(() => {
    // Brief “password field” beat, then signing-in spinner — reads as login.
    const arm = window.setTimeout(() => setPhase("signing-in"), 420);

    let raf = 0;
    const started = performance.now();
    const duration = 2200;

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / duration);
      // Ease out — fills most of the bar before Home mounts.
      const eased = 1 - Math.pow(1 - t, 2.4);
      setProgress(0.08 + eased * 0.9);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.clearTimeout(arm);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden select-none"
      role="status"
      aria-live="polite"
      aria-label={`Signing in to ${OS_NAME}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 scale-105 bg-cover bg-center"
        style={{ backgroundImage: `url(${theme.background})` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-black/35 backdrop-blur-[28px] saturate-[1.15]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.45)_100%)]"
      />

      <div className="relative z-[1] flex w-full max-w-[320px] flex-col items-center px-6">
        <div
          className={cn(
            "relative size-[96px] overflow-hidden rounded-full",
            "shadow-[0_10px_40px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.18)]",
            "ring-1 ring-white/25"
          )}
        >
          <img
            src={Headshot}
            alt=""
            draggable={false}
            className="size-full object-cover"
          />
        </div>

        <p className="os-chrome-em mt-5 text-center text-[22px] tracking-[-0.3px] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)]">
          {USER_NAME}
        </p>

        <div className="mt-5 flex h-[44px] w-full max-w-[240px] flex-col items-center justify-center">
          {phase === "ready" ? (
            <div
              className={cn(
                "flex h-[36px] w-full items-center rounded-full px-3.5",
                "border border-white/25 bg-white/14 shadow-[inset_0_0.5px_0_rgba(255,255,255,0.35)]",
                "backdrop-blur-xl"
              )}
              aria-hidden
            >
              <span className="os-chrome text-[13px] text-white/45">
                Enter Password
              </span>
            </div>
          ) : (
            <div className="flex w-full flex-col items-center gap-3">
              <div
                className="size-5 animate-spin rounded-full border-[2.5px] border-white/25 border-t-white"
                aria-hidden
              />
              <p className="os-chrome text-[13px] tracking-[-0.08px] text-white/75">
                Logging in…
              </p>
            </div>
          )}
        </div>

        <div
          className="mt-8 h-[4px] w-[168px] overflow-hidden rounded-full bg-white/20"
          aria-hidden
        >
          <div
            className="h-full rounded-full bg-white/90 transition-[width] duration-150 ease-out"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>

      <p className="os-chrome absolute bottom-[max(28px,env(safe-area-inset-bottom))] z-[1] text-[12px] tracking-[-0.08px] text-white/50">
        {OS_NAME}
      </p>
    </div>
  );
};
