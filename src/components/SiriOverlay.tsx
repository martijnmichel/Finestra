import React, { useEffect, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "@/store";
import { setSiriOpen } from "@/store/actions/siri";
import {
  matchAssistantActions,
  runAssistantAction,
} from "@/lib/assistant/actions";
import { cn } from "@/lib/utils";
import SiriIcon from "@/icons/siri.png";

/**
 * Spotlight-style Siri: bottom-centered FAB — glass suggestions, glass search,
 * animated orb. Click outside (or Esc) to dismiss. No window chrome.
 */
export const SiriOverlay = () => {
  const { t } = useTranslation();
  const {
    state: { siriOpen },
    dispatch,
  } = useAppContext();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!siriOpen) setQuery("");
  }, [siriOpen]);

  const actions = useMemo(
    () => matchAssistantActions(query, t),
    [query, t]
  );

  const close = () => setSiriOpen(false)(dispatch);

  const run = (actionId: string) => {
    runAssistantAction(actionId, {
      dispatch,
      closeSelf: close,
    });
  };

  return (
    <Dialog.Root
      open={siriOpen}
      onOpenChange={(open) => setSiriOpen(open)(dispatch)}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-[90]",
            "bg-black/25 dark:bg-black/40",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        />
        <Dialog.Content
          className={cn(
            "fixed z-[91] left-1/2 -translate-x-1/2 outline-none",
            "bottom-[calc(var(--home-dock-offset,var(--mobile-dock-offset,96px))+28px)]",
            "md:bottom-[calc(88px+env(safe-area-inset-bottom,0px))]",
            "w-[min(360px,calc(100vw-32px))]",
            "flex flex-col items-center gap-3",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-bottom-4 data-[state=open]:slide-in-from-bottom-4",
            "duration-200"
          )}
          onOpenAutoFocus={(e) => {
            // Focus the search field, not the dialog shell.
            e.preventDefault();
            const input = document.getElementById("siri-overlay-input");
            input?.focus();
          }}
        >
          <Dialog.Title className="sr-only">
            {t("common:menuBar.siri")}
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            {t("apps:siri.greeting")}
          </Dialog.Description>

          {/* Glass suggestions menu */}
          <div
            className={cn(
              "w-full overflow-hidden rounded-2xl border border-black/10 dark:border-white/10",
              "shadow-2xl"
            )}
            style={{
              background: "var(--dock-bg, rgba(245,245,247,0.72))",
              backdropFilter:
                "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
              WebkitBackdropFilter:
                "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
            }}
          >
            <div className="px-3.5 pt-3 pb-1.5">
              <p className="os-chrome-em text-[13px] tracking-[-0.08px]">
                {t("apps:siri.greeting")}
              </p>
            </div>
            <ul className="max-h-[40vh] overflow-y-auto py-1">
              {actions.length === 0 ? (
                <li className="os-chrome-muted px-3.5 py-2 text-[13px]">
                  {t("apps:siri.noResults")}
                </li>
              ) : (
                actions.map((action) => (
                  <li key={action.id}>
                    <button
                      type="button"
                      onClick={() => run(action.id)}
                      className={cn(
                        "os-chrome flex w-full items-center px-3.5 py-2 text-left text-[14px] tracking-[-0.2px]",
                        "hover:bg-black/[0.06] dark:hover:bg-white/[0.08]",
                        "focus-visible:outline-none focus-visible:bg-black/[0.06] dark:focus-visible:bg-white/[0.08]"
                      )}
                    >
                      {t(action.labelKey)}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Glass search bar */}
          <div
            className={cn(
              "relative w-full rounded-full border border-black/10 dark:border-white/10",
              "shadow-xl"
            )}
            style={{
              background: "var(--dock-bg, rgba(245,245,247,0.72))",
              backdropFilter:
                "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
              WebkitBackdropFilter:
                "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
            }}
          >
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[color:var(--macos-secondary-label,#86868b)]" />
            <input
              id="siri-overlay-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && actions[0]) {
                  e.preventDefault();
                  run(actions[0].id);
                }
              }}
              placeholder={t("apps:siri.placeholder")}
              className="os-chrome w-full bg-transparent py-3 pl-10 pr-4 text-[15px] tracking-[-0.2px] outline-none placeholder:text-[#86868b]"
            />
          </div>

          {/* Animated Siri orb */}
          <button
            type="button"
            aria-label={t("common:menuBar.siri")}
            onClick={close}
            className="siri-orb-fab relative mt-1 size-[72px] shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--macos-accent)]"
          >
            <img
              src={SiriIcon}
              alt=""
              draggable={false}
              className="siri-orb-spin pointer-events-none absolute inset-0 size-full select-none object-contain drop-shadow-lg"
            />
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
