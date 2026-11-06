import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { WidgetShell, type WidgetSize } from "./WidgetShell";
import { cn } from "@/lib/utils";

/** Live clock + date — Calendar / Clock widget vibe. */
export function ClockWidget({
  size = "md",
  className,
}: {
  size?: WidgetSize;
  className?: string;
}) {
  const [now, setNow] = useState(() => dayjs());

  useEffect(() => {
    const id = window.setInterval(() => setNow(dayjs()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const compact = size === "sm";

  return (
    <WidgetShell
      size={size}
      className={cn("flex flex-col justify-between p-3.5", className)}
      aria-label={now.format("dddd, D MMMM, HH:mm")}
    >
      <div>
        <p className="os-chrome-em text-[13px] uppercase tracking-[0.04em] text-[var(--macos-accent)]">
          {now.format("dddd")}
        </p>
        <p
          className={cn(
            "os-chrome-em tabular-nums tracking-tight text-foreground",
            compact ? "mt-1 text-[36px] leading-none" : "mt-0.5 text-[44px] leading-none"
          )}
        >
          {now.format("D")}
        </p>
      </div>
      <div>
        <p
          className={cn(
            "os-chrome tabular-nums font-light tracking-tight text-foreground",
            compact ? "text-[28px] leading-none" : "text-[34px] leading-none"
          )}
        >
          {now.format("HH:mm")}
        </p>
        {!compact ? (
          <p className="widget-secondary mt-1 text-[12px]">{now.format("MMMM YYYY")}</p>
        ) : null}
      </div>
    </WidgetShell>
  );
}
