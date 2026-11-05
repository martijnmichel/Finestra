import React, { useEffect, useRef } from "react";
import { useAppContext } from "../store";
import { toggleApp } from "../store/actions/toggleApp";
import { closeApp } from "../store/actions/closeApp";
import { goHome } from "../store/actions/goHome";
import { toggleAppSwitcher } from "../store/actions/toggleAppSwitcher";
import { useWindowManager } from "../services/WindowManager";
import { useOsFormFactor } from "../hooks/useOsFormFactor";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useShellGestureOptional } from "./shell/ShellGestureContext";

export const AppSwitcher = () => {
  const { state, dispatch } = useAppContext();
  const { appIcon } = useWindowManager();
  const { isIos } = useOsFormFactor();
  const gesture = useShellGestureOptional();
  const open = state.appSwitcher;
  const touchStartY = useRef<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const dismiss = () => {
    gesture?.reset();
    goHome()(dispatch);
  };

  // Center the active app card when the flipbook opens.
  useEffect(() => {
    if (!open || !scrollerRef.current) return;
    const active = state.applications.find((a) => a.active);
    if (!active) return;
    const el = scrollerRef.current.querySelector<HTMLElement>(
      `[data-switcher-id="${active.id}"]`
    );
    el?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [open, state.applications]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="app-switcher"
          className="fixed inset-0 z-[55]"
          role="dialog"
          aria-modal="true"
          aria-label="App Switcher"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 z-0 border-0 cursor-default bg-black/55"
            style={{
              backdropFilter: "blur(28px) saturate(180%)",
              WebkitBackdropFilter: "blur(28px) saturate(180%)",
            }}
            aria-label="Dismiss App Switcher"
            onClick={dismiss}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            ref={scrollerRef}
            className={cn(
              "relative z-[1] h-full pointer-events-none",
              "flex items-center overflow-x-auto overflow-y-hidden snap-x snap-mandatory"
            )}
            style={{
              paddingTop: "calc(var(--status-strip-height) + 12px)",
              paddingBottom: "calc(var(--mobile-dock-offset) + 24px)",
            }}
            initial={{ y: 36, opacity: 0.7, scale: 0.94 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 28, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
          >
            {state.applications.length === 0 ? (
              <p className="os-chrome mx-auto text-white/80 pointer-events-none px-6">
                No Open Apps
              </p>
            ) : (
              <div className="flex h-full items-center gap-4 px-[12vw]">
                {state.applications.map((app, i) => (
                  <motion.div
                    key={app.id}
                    data-switcher-id={app.id}
                    className="pointer-events-auto shrink-0 snap-center"
                    initial={{
                      opacity: 0,
                      x: i === 0 ? 0 : 48,
                      scale: 0.92,
                      rotateY: i === 0 ? 0 : 12,
                    }}
                    animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                    transition={{
                      delay: 0.03 + i * 0.04,
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                    style={{ transformPerspective: 900 }}
                  >
                    <SwitcherCard
                      name={app.name}
                      icon={appIcon(app.name)}
                      wide={isIos}
                      onOpen={() => {
                        gesture?.reset();
                        toggleApp(app.id)(dispatch);
                        toggleAppSwitcher(false)(dispatch);
                      }}
                      onClose={() => closeApp(app.id)(dispatch)}
                      touchStartY={touchStartY}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

function SwitcherCard({
  name,
  icon,
  wide,
  onOpen,
  onClose,
  touchStartY,
}: {
  name: string;
  icon: React.ReactNode;
  wide?: boolean;
  onOpen: () => void;
  onClose: () => void;
  touchStartY: React.MutableRefObject<number | null>;
}) {
  return (
    <div
      className={cn("relative", wide ? "w-[min(78vw,320px)]" : "w-[min(56vw,300px)]")}
      onTouchStart={(e) => {
        touchStartY.current = e.touches[0]?.clientY ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchStartY.current;
        touchStartY.current = null;
        if (start == null) return;
        const end = e.changedTouches[0]?.clientY;
        if (end != null && start - end > 80) onClose();
      }}
    >
      <div className="mb-2 flex items-center gap-2 px-0.5">
        <div className="size-5 overflow-hidden rounded-[5px]">{icon}</div>
        <span className="os-chrome-sm truncate text-white/90 drop-shadow">
          {name}
        </span>
      </div>

      <button
        type="button"
        className="w-full aspect-[3/4] max-h-[58vh] overflow-hidden rounded-[24px] border border-white/20 shadow-2xl text-left cursor-pointer p-0"
        style={{
          background: "var(--window-body)",
          backdropFilter:
            "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
        }}
        onClick={onOpen}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6">
          <div className="size-16 overflow-hidden">{icon}</div>
          <span className="os-chrome-em text-foreground">{name}</span>
        </div>
      </button>
    </div>
  );
}
