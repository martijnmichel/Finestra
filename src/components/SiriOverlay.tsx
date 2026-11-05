import React, { useEffect, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { useAppContext } from "@/store";
import { setSiriOpen } from "@/store/actions/siri";
import {
  matchAssistantActions,
  resolveActionLabel,
  runAssistantAction,
} from "@/lib/assistant/actions";
import { cn } from "@/lib/utils";
import { useOsFormFactor } from "@/hooks/useOsFormFactor";
import SiriIcon from "@/icons/siri.png";

const easeOut = [0.22, 1, 0.36, 1] as const;

/**
 * Spotlight-style Siri: bottom-centered FAB — glass suggestions, glass search,
 * circular animated orb. Click outside (or Esc) to dismiss. No window chrome.
 * Open choreography: orb → search → suggestion panel / items.
 */
export const SiriOverlay = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useAppContext();
  const { siriOpen, applications, appSwitcher } = state;
  const { isIos, isMacos } = useOsFormFactor();
  const [query, setQuery] = useState("");

  const onHome = !applications.some((app) => !app.minimized);
  const hasFullscreenApp = applications.some((app) => app.fullscreen);
  // Match BottomDock visibility — iPhone hides dock while an app is open.
  const dockVisible = isMacos
    ? !hasFullscreenApp
    : isIos
      ? onHome && !appSwitcher
      : !appSwitcher;

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
            "flex max-h-[min(70dvh,560px)] flex-col items-center gap-2.5"
          )}
          style={{
            // Sit above the dock when it's showing; iPhone hides dock in-app
            // so only clear the home indicator then.
            bottom: isMacos
              ? "calc(88px + env(safe-area-inset-bottom, 0px))"
              : dockVisible
                ? "calc(var(--home-dock-offset, var(--mobile-dock-offset, 0px)) + 12px)"
                : "calc(var(--mobile-dock-offset, 0px) + 20px)",
          }}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            // Focus after orb + search have started entering
            window.setTimeout(() => {
              document.getElementById("siri-overlay-input")?.focus();
            }, 220);
          }}
        >
          <Dialog.Title className="sr-only">
            {t("common:menuBar.siri")}
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            {t("apps:siri.greeting")}
          </Dialog.Description>

          {/* Glass suggestions — enters last */}
          <motion.div
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
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.32, ease: easeOut, delay: 0.22 }}
          >
            <div className="shrink-0 px-3 pt-2.5 pb-1">
              <p className="os-chrome-em text-[12px] tracking-[-0.08px] sm:text-[13px]">
                {t("apps:siri.greeting")}
              </p>
            </div>
            <motion.ul
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-0.5"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.04,
                    delayChildren: 0.06,
                  },
                },
              }}
            >
              {actions.length === 0 ? (
                <motion.li
                  className="os-chrome-muted px-3 py-2 text-[13px]"
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.22, ease: easeOut },
                    },
                  }}
                >
                  {t("apps:siri.noResults")}
                </motion.li>
              ) : (
                actions.map((action) => (
                  <motion.li
                    key={action.id}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.22, ease: easeOut },
                      },
                    }}
                  >
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
                  </motion.li>
                ))
              )}
            </motion.ul>
          </motion.div>

          {/* Glass search — enters second */}
          <motion.div
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
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: easeOut, delay: 0.1 }}
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
          </motion.div>

          {/* Orb — enters first */}
          <motion.button
            type="button"
            aria-label={t("common:menuBar.siri")}
            onClick={close}
            className={cn(
              "siri-orb-fab relative mt-0.5 size-14 shrink-0 overflow-hidden rounded-full sm:size-[68px]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--macos-accent)]"
            )}
            initial={{ opacity: 0, scale: 0.45, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 460,
              damping: 28,
              delay: 0,
            }}
          >
            <img
              src={SiriIcon}
              alt=""
              draggable={false}
              className="siri-orb-spin pointer-events-none absolute inset-0 size-full select-none object-cover"
            />
          </motion.button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
