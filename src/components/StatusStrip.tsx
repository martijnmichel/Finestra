import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Battery, Signal, Wifi, WifiOff } from "lucide-react";
import { storageKey } from "@/lib/os";
import { cn } from "@/lib/utils";
import { useOsFormFactor } from "@/hooks/useOsFormFactor";
import { useAppState } from "@/store";

/** iPhone status bar — overlays the app (or Home wallpaper), with a Dynamic Island camera mock. */
export const StatusStrip = () => {
  const [dateTime, setDateTime] = useState(Date.now());
  const [brightness] = useLocalStorage(storageKey("brightness"), 85);
  const [wifi] = useLocalStorage(storageKey("wifi"), true);
  const [focus] = useLocalStorage(storageKey("focus"), false);
  const { isIos } = useOsFormFactor();
  const { applications } = useAppState();

  const appOpen = applications.some((a) => !a.minimized);
  // Light app UIs → dark status glyphs; Home wallpaper → light glyphs.
  const onLightSurface = appOpen;

  useEffect(() => {
    const timer = setInterval(() => setDateTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--display-brightness",
      String(Math.max(0.35, brightness / 100))
    );
  }, [brightness]);

  const time = new Date(dateTime).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div
      className={cn(
        "fixed z-40 top-0 inset-x-0 pointer-events-none select-none"
      )}
      style={{
        height: "var(--status-strip-height)",
        paddingTop: "max(11px, var(--safe-area-top))",
      }}
      aria-hidden
    >
      {/* When an app is open, paint status over the app surface — never the desktop wallpaper */}
      {appOpen ? (
        <div
          className="absolute inset-0 -z-0"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in srgb, var(--window-body) 92%, transparent), color-mix(in srgb, var(--window-body) 55%, transparent) 70%, transparent)",
          }}
        />
      ) : null}

      <div
        className={cn(
          "relative z-[1] flex h-full items-start justify-between px-[28px]",
          onLightSurface ? "text-black/90" : "text-white"
        )}
        style={
          onLightSurface
            ? undefined
            : { textShadow: "0 1px 2px rgba(0,0,0,0.35)" }
        }
      >
        <div className="flex items-center gap-1 min-w-[76px] pt-[2px]">
          <span
            className="tabular-nums tracking-tight font-semibold"
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
              fontSize: 16,
              letterSpacing: "-0.3px",
            }}
          >
            {time}
          </span>
          {focus ? <span className="text-[11px] opacity-90">☾</span> : null}
        </div>

        {/* Dynamic Island / camera pill */}
        {isIos ? (
          <div
            className="absolute left-1/2 -translate-x-1/2 top-[max(10px,calc(var(--safe-area-top)+2px))] flex items-center justify-end"
            style={{
              width: 122,
              height: 36,
              borderRadius: 20,
              background: "#0a0a0a",
              boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.08)",
            }}
          >
            {/* Camera / sensors cluster on the right of the island */}
            <div className="mr-[10px] flex items-center gap-[7px]">
              <span
                className="block rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  background:
                    "radial-gradient(circle at 35% 35%, #3a4a6a 0%, #0b1020 55%, #000 100%)",
                  boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.15)",
                }}
              />
              <span
                className="block rounded-full"
                style={{
                  width: 11,
                  height: 11,
                  background:
                    "radial-gradient(circle at 30% 30%, #1a2838 0%, #05080f 60%, #000 100%)",
                  boxShadow:
                    "inset 0 0 0 1px rgba(40,80,120,0.35), 0 0 0 0.5px rgba(0,0,0,0.8)",
                }}
              />
            </div>
          </div>
        ) : null}

        <div
          className={cn(
            "flex items-center gap-[5px] min-w-[76px] justify-end pt-[3px]",
            onLightSurface ? "text-black/90" : "text-white"
          )}
        >
          <Signal className="size-[14px]" strokeWidth={2.5} aria-hidden />
          {wifi ? (
            <Wifi className="size-[14px]" strokeWidth={2.5} aria-hidden />
          ) : (
            <WifiOff
              className="size-[14px] opacity-70"
              strokeWidth={2.5}
              aria-hidden
            />
          )}
          <Battery className="size-[20px]" strokeWidth={2.2} aria-hidden />
        </div>
      </div>
    </div>
  );
};
