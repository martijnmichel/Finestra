import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ControlCenter } from "./topbar/ControlCenter";
import { WifiMenu, BatteryMenu } from "./topbar/StatusMenus";
import { storageKey } from "@/lib/os";
import { cn } from "@/lib/utils";

export const StatusStrip = () => {
  const [dateTime, setDateTime] = useState(Date.now());
  const [brightness] = useLocalStorage(storageKey("brightness"), 85);
  const [focus] = useLocalStorage(storageKey("focus"), false);

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
        "os-chrome fixed z-40 top-0 inset-x-0 flex items-end justify-between px-4 pb-1.5 pointer-events-none"
      )}
      style={{
        height: "var(--status-strip-height)",
        color: "var(--menubar-fg)",
        paddingTop: "var(--safe-area-top)",
      }}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in srgb, var(--menubar-bg) 70%, transparent), transparent)",
        }}
      />

      <div className="relative z-[1] flex items-center gap-1.5 pointer-events-auto">
        <span className="os-chrome-em tabular-nums tracking-tight">{time}</span>
        {focus ? <span className="os-chrome-xs opacity-80">☾</span> : null}
      </div>

      <div className="relative z-[1] flex items-center gap-0.5 pointer-events-auto">
        <WifiMenu />
        <BatteryMenu />
        <ControlCenter />
      </div>
    </div>
  );
};
