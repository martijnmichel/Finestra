import React from "react";
import { ClockWidget } from "./ClockWidget";
import { AboutWidget } from "./AboutWidget";
import { ProjectsWidget } from "./ProjectsWidget";
import { ContactWidget } from "./ContactWidget";

/** macOS Desktop — stacked widgets anchored top-right. */
export function DesktopWidgets() {
  return (
    <aside
      className="pointer-events-none absolute bottom-24 right-5 top-[52px] z-[6] flex w-[338px] flex-col gap-3 overflow-y-auto overscroll-contain pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Desktop widgets"
    >
      <ClockWidget size="md" />
      <AboutWidget size="md" />
      <ProjectsWidget size="lg" />
      <ContactWidget size="md" className="h-auto min-h-[150px]" />
    </aside>
  );
}
