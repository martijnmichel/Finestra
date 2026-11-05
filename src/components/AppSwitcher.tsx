import React, { useRef } from "react";
import { useAppContext } from "../store";
import { toggleApp } from "../store/actions/toggleApp";
import { closeApp } from "../store/actions/closeApp";
import { goHome } from "../store/actions/goHome";
import { toggleAppSwitcher } from "../store/actions/toggleAppSwitcher";
import { useWindowManager } from "../services/WindowManager";
import { cn } from "@/lib/utils";

export const AppSwitcher = () => {
  const { state, dispatch } = useAppContext();
  const { appIcon } = useWindowManager();
  const open = state.appSwitcher;
  const touchStartY = useRef<number | null>(null);

  if (!open && state.applications.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[55] transition-opacity duration-300",
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
      role="dialog"
      aria-modal="true"
      aria-label="App Switcher"
      aria-hidden={!open}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-2xl border-0 cursor-default"
        aria-label="Dismiss App Switcher"
        onClick={() => goHome()(dispatch)}
      />

      <div
        className={cn(
          "relative z-[1] flex h-full items-center gap-4 overflow-x-auto px-6 transition-transform duration-300",
          open ? "translate-y-0" : "translate-y-8"
        )}
        style={{
          paddingTop: "var(--status-strip-height)",
          paddingBottom: "var(--mobile-dock-offset)",
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) goHome()(dispatch);
        }}
      >
        {state.applications.length === 0 ? (
          <p className="os-chrome mx-auto text-white/80">No Open Apps</p>
        ) : (
          state.applications.map((app) => (
            <div
              key={app.id}
              className="relative shrink-0 w-[min(72vw,280px)] snap-center"
              onTouchStart={(e) => {
                touchStartY.current = e.touches[0]?.clientY ?? null;
              }}
              onTouchEnd={(e) => {
                const start = touchStartY.current;
                touchStartY.current = null;
                if (start == null) return;
                const end = e.changedTouches[0]?.clientY;
                if (end != null && start - end > 80) {
                  closeApp(app.id)(dispatch);
                }
              }}
            >
              <button
                type="button"
                className="w-full aspect-[9/16] max-h-[58vh] rounded-[22px] overflow-hidden border border-white/20 shadow-2xl text-left cursor-pointer p-0"
                style={{
                  background: "var(--window-body)",
                  backdropFilter:
                    "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
                }}
                onClick={() => {
                  toggleApp(app.id)(dispatch);
                  toggleAppSwitcher(false)(dispatch);
                }}
              >
                <div className="h-full w-full flex flex-col items-center justify-center gap-3 p-6">
                  <div className="size-16 overflow-hidden">{appIcon(app.name)}</div>
                  <span className="os-chrome-em text-foreground">{app.name}</span>
                </div>
              </button>
              <button
                type="button"
                className="absolute -top-2 -right-2 size-7 rounded-full bg-white/90 text-black os-chrome-sm shadow"
                aria-label={`Close ${app.name}`}
                onClick={() => closeApp(app.id)(dispatch)}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
