import React from "react";
import { AppButton } from "./application/AppButton";
import { Applications } from "../applications";
import { useAppContext } from "../store";
import { startApp } from "../store/actions/startApp";
import { toggleApp } from "@/store/actions/toggleApp";
import { cn } from "@/lib/utils";

const homeApps = [
  Applications.About,
  Applications.Siri,
  Applications.Request,
  Applications.Finder,
  Applications.Safari,
  Applications.Settings,
  Applications.VSCode,
  Applications.Terminal,
  Applications.Sonid,
  Applications.DirectusMobile,
] as const;

/** Plain Home Screen — no Motion (keeps window dragging snappy on iPad). */
export const HomeScreen = () => {
  const { state, dispatch } = useAppContext();
  const hasForegroundApp = state.applications.some((a) => !a.minimized);

  return (
    <div
      className={cn(
        "absolute inset-0 z-[5] overflow-y-auto",
        hasForegroundApp && "pointer-events-none"
      )}
      style={{
        paddingTop: "calc(var(--status-strip-height) + 16px)",
        paddingBottom:
          "calc(var(--home-dock-offset, var(--mobile-dock-offset)) + 16px)",
        paddingLeft: "max(20px, env(safe-area-inset-left, 0px))",
        paddingRight: "max(20px, env(safe-area-inset-right, 0px))",
      }}
      aria-hidden={hasForegroundApp}
    >
      <div className="mx-auto grid max-w-lg grid-cols-4 gap-x-4 gap-y-6 sm:grid-cols-5 md:grid-cols-6">
        {homeApps.map((AppClass) => (
          <AppButton
            key={AppClass.appName}
            size="64px"
            appIcon={AppClass.icon()}
            appName={AppClass.appName}
            onClick={() => {
              const app = state.applications.find(
                (a) => a.name === AppClass.appName
              );
              if (app) {
                toggleApp(app.id)(dispatch);
              } else {
                startApp(AppClass.appName)(dispatch);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};
