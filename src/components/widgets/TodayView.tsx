import React from "react";
import { useTranslation } from "react-i18next";
import { ClockWidget } from "./ClockWidget";
import { AboutWidget } from "./AboutWidget";
import { ProjectsWidget } from "./ProjectsWidget";
import { ContactWidget } from "./ContactWidget";

/**
 * Standalone Today stack (desktop previews / tests).
 * iPhone Home uses the shared CSS grid in HomeScreen instead.
 */
export function TodayView() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex w-full max-w-[360px] flex-col gap-3 px-1 pb-2">
      <p className="os-chrome-em px-1 text-[13px] tracking-[-0.08px] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
        {t("apps:widgets.today")}
      </p>
      <div className="grid grid-cols-2 gap-3 [grid-auto-rows:minmax(150px,auto)]">
        <ClockWidget size="sm" className="h-full w-full max-w-none" />
        <AboutWidget size="sm" className="h-full w-full max-w-none" />
      </div>
      <ProjectsWidget size="md" className="max-w-none" />
      <ContactWidget size="md" className="h-auto min-h-[150px] max-w-none" />
    </div>
  );
}
