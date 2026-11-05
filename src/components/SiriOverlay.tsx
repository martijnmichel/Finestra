import React, { useEffect, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "@/store";
import { setSiriOpen } from "@/store/actions/siri";
import {
  matchAssistantActions,
  resolveActionLabel,
  runAssistantAction,
} from "@/lib/assistant/actions";
import { cn } from "@/lib/utils";
import SiriIcon from "@/icons/siri.png";

/**
 * Spotlight-style Siri: bottom-centered FAB — glass suggestions, glass search,
 * circular animated orb. Click outside (or Esc) to dismiss. No window chrome.
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
            "fixed z-[91] outline-none",
            // Safe inset box — avoids 100vw / translate overflow on iPhone
            "left-4 right-4 mx-auto w-auto max-w-[300px]",
            "bottom-[calc(var(--mobile-dock-offset,0px)+20px)]",
            "sm:bottom-[calc(88px+env(safe-area-inset-bottom,0px))]",
            "flex max-h-[min(70dvh,560px)] flex-col items-center gap-2.5",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-bottom-4 data-[state=open]:slide-in-from-bottom-4",
            "duration-200"
          )}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            document.getElementById("siri-overlay-input")?.focus();
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
              "flex min-h-0 w-full flex-col overflow-hidden rounded-2xl",
              "border border-black/10 dark:border-white/10 shadow-2xl"
            )}
            style={{
              background: "var(--dock-bg, rgba(245,245,247,0.72))",
              backdropFilter:
                "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
              WebkitBackdropFilter:
                "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
            }}
          >
            <div className="shrink-0 px-3 pt-2.5 pb-1">
              <p className="os-chrome-em text-[12px] tracking-[-0.08px] sm:text-[13px]">
                {t("apps:siri.greeting")}
              </p>
            </div>
            <ul className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-0.5">
              {actions.length === 0 ? (
                <li className="os-chrome-muted px-3 py-2 text-[13px]">
                  {t("apps:siri.noResults")}
                </li>
              ) : (
                actions.map((action) => (
                  <li key={action.id}>
                    <button
                      type="button"
                      onClick={() => run(action.id)}
                      className={cn(
                        "os-chrome flex w-full items-center px-3 py-2 text-left text-[13px] tracking-[-0.2px] sm:text-[14px]",
                        "hover:bg-black/[0.06] dark:hover:bg-white/[0.08]",
                        "focus-visible:outline-none focus-visible:bg-black/[0.06] dark:focus-visible:bg-white/[0.08]"
                      )}
                    >
                      {resolveActionLabel(action, t)}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Glass search bar */}
          <div
            className={cn(
              "relative w-full shrink-0 rounded-full",
              "border border-black/10 dark:border-white/10 shadow-xl"
            )}
            style={{
              background: "var(--dock-bg, rgba(245,245,247,0.72))",
              backdropFilter:
                "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
              WebkitBackdropFilter:
                "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
            }}
          >
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[color:var(--macos-secondary-label,#86868b)]" />
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
              className="os-chrome w-full bg-transparent py-2.5 pl-9 pr-3.5 text-[14px] tracking-[-0.2px] outline-none placeholder:text-[#86868b] sm:py-3 sm:text-[15px]"
            />
          </div>

          {/* Circular animated orb — clip square PNG to a circle */}
          <button
            type="button"
            aria-label={t("common:menuBar.siri")}
            onClick={close}
            className={cn(
              "siri-orb-fab relative mt-0.5 size-14 shrink-0 overflow-hidden rounded-full sm:size-[68px]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--macos-accent)]"
            )}
          >
            <img
              src={SiriIcon}
              alt=""
              draggable={false}
              className="siri-orb-spin pointer-events-none absolute inset-0 size-full select-none object-cover"
            />
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
