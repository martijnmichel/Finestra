import React from "react";
import { useTranslation } from "react-i18next";
import Headshot from "../../../profile/assets/headshot.png";
import { useAppContext } from "@/store";
import { startApp } from "@/store/actions/startApp";
import { WidgetShell, type WidgetSize } from "./WidgetShell";
import { cn } from "@/lib/utils";

/** Profile card — tap opens About. */
export function AboutWidget({
  size = "md",
  className,
}: {
  size?: WidgetSize;
  className?: string;
}) {
  const { t } = useTranslation();
  const { dispatch } = useAppContext();
  const compact = size === "sm";

  return (
    <WidgetShell
      size={size}
      className={cn(
        "flex gap-3 p-3.5",
        compact ? "flex-col items-center text-center" : "items-center",
        className
      )}
      aria-label="Martijn van der Eijk"
      onClick={() => startApp("About")(dispatch)}
    >
      <img
        src={Headshot}
        alt=""
        draggable={false}
        className={cn(
          "shrink-0 rounded-full object-cover shadow-sm",
          compact ? "size-14" : "size-[72px]"
        )}
      />
      <div className={cn("min-w-0", compact && "w-full")}>
        <p className="os-chrome-em truncate text-[15px] tracking-[-0.2px]">
          Martijn van der Eijk
        </p>
        <p className="os-chrome-muted mt-0.5 line-clamp-2 text-[12px] leading-snug">
          {t("apps:about.subtitle")}
        </p>
        {!compact ? (
          <p className="os-chrome-muted mt-1.5 truncate text-[11px]">
            {t("apps:about.tagline")}
          </p>
        ) : null}
      </div>
    </WidgetShell>
  );
}
