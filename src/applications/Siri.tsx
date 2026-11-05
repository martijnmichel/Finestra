import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Application } from "./application";
import { AppIcon } from "../components/application/AppIcon";
import { useAppContext } from "../store";
import { closeApp } from "../store/actions/closeApp";
import {
  matchAssistantActions,
  runAssistantAction,
} from "@/lib/assistant/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Icon from "../icons/siri.png";

export class Siri extends Application {
  static appName = "Siri";
  public name = "Siri";
  static icon = () => <AppIcon src={Icon} alt="Siri" />;
  public category = "default";

  width = 420;
  height = 360;
  x =
    typeof window !== "undefined"
      ? Math.max(24, (window.innerWidth - 420) / 2)
      : 0;
  y =
    typeof window !== "undefined"
      ? Math.max(48, (window.innerHeight - 360) / 2 - 40)
      : 80;

  component = () => SiriApp(this.id);

  constructor() {
    super();
  }
}

export const SiriApp = (id: string) => {
  const { t } = useTranslation();
  const { dispatch } = useAppContext();
  const [query, setQuery] = useState("");

  const actions = useMemo(
    () => matchAssistantActions(query, t),
    [query, t]
  );

  const run = (actionId: string) => {
    runAssistantAction(actionId, {
      dispatch,
      closeSelf: () => closeApp(id)(dispatch),
    });
  };

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="flex flex-col items-center gap-3 pt-2 text-center">
        <img
          src={Icon}
          alt=""
          className="size-14 object-contain drop-shadow-sm"
          draggable={false}
        />
        <div>
          <h1 className="os-chrome-em text-[17px] tracking-[-0.3px]">
            {t("apps:siri.greeting")}
          </h1>
          <p className="os-chrome-muted mt-1 text-[13px]">
            {t("apps:siri.subtitle")}
          </p>
        </div>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-[color:var(--macos-secondary-label,#86868b)]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && actions[0]) {
              e.preventDefault();
              run(actions[0].id);
            }
          }}
          placeholder={t("apps:siri.placeholder")}
          className="macos-input w-full pl-9"
          autoFocus
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
        {actions.length === 0 ? (
          <p className="os-chrome-muted px-1 text-[13px]">
            {t("apps:siri.noResults")}
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {actions.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => run(action.id)}
                className={cn(
                  "os-chrome rounded-full px-3 py-1.5 text-left text-[13px] tracking-[-0.08px]",
                  "bg-black/[0.05] hover:bg-black/[0.08] dark:bg-white/[0.08] dark:hover:bg-white/[0.12]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--macos-accent)]"
                )}
              >
                {t(action.labelKey)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="macos-button"
          onClick={() => closeApp(id)(dispatch)}
        >
          {t("apps:siri.done")}
        </Button>
      </div>
    </div>
  );
};
