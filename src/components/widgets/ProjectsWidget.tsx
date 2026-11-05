import React from "react";
import { useTranslation } from "react-i18next";
import { projects } from "@/applications/projects/projects";
import { useAppContext } from "@/store";
import { startApp } from "@/store/actions/startApp";
import { WidgetShell, type WidgetSize } from "./WidgetShell";
import { cn } from "@/lib/utils";

const FEATURED = [
  { key: "directusMobile", app: "DirectusMobile" },
  { key: "sonid", app: "Sonid" },
  { key: "capo", app: "Capo" },
  { key: "toka", app: "Toka" },
] as const;

/** Selected work list — tap a row to open that project app. */
export function ProjectsWidget({
  size = "md",
  className,
  limit,
}: {
  size?: WidgetSize;
  className?: string;
  limit?: number;
}) {
  const { t } = useTranslation();
  const { dispatch } = useAppContext();
  const all = projects();
  const count = limit ?? (size === "lg" ? 4 : size === "sm" ? 2 : 3);
  const rows = FEATURED.slice(0, count);

  return (
    <WidgetShell
      size={size}
      className={cn("flex flex-col p-3", className)}
      aria-label={t("apps:about.selectedWork")}
    >
      <p className="os-chrome-em px-1 pb-1.5 text-[12px] tracking-[-0.08px]">
        {t("apps:about.selectedWork")}
      </p>
      <ul className="flex min-h-0 w-full flex-1 flex-col justify-evenly gap-0.5">
        {rows.map(({ key, app }) => {
          const project = all[key];
          if (!project) return null;
          return (
            <li key={key} className="min-w-0">
              <button
                type="button"
                onClick={() => startApp(app)(dispatch)}
                className={cn(
                  "os-chrome flex w-full min-w-0 items-center gap-2.5 rounded-[10px] px-1.5 py-1.5 text-left",
                  "hover:bg-black/[0.06] dark:hover:bg-white/[0.08]",
                  "focus-visible:outline-none focus-visible:bg-black/[0.06] dark:focus-visible:bg-white/[0.08]"
                )}
              >
                <img
                  src={project.icon as string}
                  alt=""
                  draggable={false}
                  className="size-8 shrink-0 rounded-[8px] object-cover shadow-sm"
                />
                <span className="os-chrome-em min-w-0 flex-1 truncate text-[13px]">
                  {project.title}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </WidgetShell>
  );
}
