import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "@/store";
import {
  matchAssistantActions,
  resolveActionLabel,
  runAssistantAction,
} from "@/lib/assistant/actions";
import { cn } from "@/lib/utils";

type AssistantSearchProps = {
  /** Called after an action runs (e.g. close Spotlight). */
  onRan?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
};

/** Shared Siri / Spotlight results list backed by app-declared actions. */
export const AssistantSearch = ({
  onRan,
  placeholder,
  autoFocus = true,
  className,
}: AssistantSearchProps) => {
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
      closeSelf: onRan,
    });
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-5 -translate-y-1/2 text-[#86868b]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && actions[0]) {
              e.preventDefault();
              run(actions[0].id);
            }
          }}
          placeholder={placeholder ?? t("common:menuBar.spotlight")}
          className="os-chrome h-[40px] w-full rounded-xl bg-transparent pl-10 pr-2 text-[15px] font-[400] tracking-[-0.2px] outline-none placeholder:text-[#86868b]"
          autoFocus={autoFocus}
        />
      </div>

      {query.trim() ? (
        <ul className="max-h-[min(40vh,280px)] overflow-y-auto py-1">
          {actions.length === 0 ? (
            <li className="os-chrome-muted px-2.5 py-2 text-[13px]">
              {t("apps:siri.noResults")}
            </li>
          ) : (
            actions.map((action) => (
              <li key={action.id}>
                <button
                  type="button"
                  onClick={() => run(action.id)}
                  className={cn(
                    "os-chrome flex w-full items-center rounded-lg px-2.5 py-2 text-left text-[14px] tracking-[-0.2px]",
                    "hover:bg-black/[0.06] dark:hover:bg-white/[0.08]"
                  )}
                >
                  {resolveActionLabel(action, t)}
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
};
