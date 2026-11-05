import React from "react";
import { useWindowManager } from "../services/WindowManager";
import LaunchpadIcon from "../icons/launchpad.png";
import { useAppContext } from "../store";
import { toggleLaunchpad } from "../store/actions/toggleLaunchPad";
import { MacOSDock } from "./ui/shadcn-io/mac-os-dock";
import { startApp } from "@/store/actions/startApp";
import { uniqBy } from "lodash";
import { cn } from "@/lib/utils";
import { useOsFormFactor } from "@/hooks/useOsFormFactor";
import { HomeIndicator } from "./HomeIndicator";

const BottomDock = () => {
  const { appIcon } = useWindowManager();
  const { state, dispatch } = useAppContext();
  const { isMobileShell, isMacos, isIos } = useOsFormFactor();

  const hasFullscreenApp = state.applications.some((app) => app.fullscreen);
  const onHome = !state.applications.some((app) => !app.minimized);

  // iPhone: dock only on Home Screen. iPad / macOS: dock stays (macOS hides if FS).
  const showDock =
    isMacos
      ? !hasFullscreenApp
      : isIos
        ? onHome && !state.appSwitcher
        : !state.appSwitcher;

  const apps = uniqBy(
    [
      {
        id: isMacos ? "launchpad" : "app-library",
        name: isMacos ? "Launchpad" : "App Library",
        icon: <img src={LaunchpadIcon} alt={isMacos ? "Launchpad" : "App Library"} />,
        action: () => toggleLaunchpad()(dispatch),
      },
      {
        id: "finder",
        name: "Finder",
        icon: appIcon("Finder"),
        action: () => startApp("Finder")(dispatch),
      },
      ...state.applications.map((app) => ({
        id: app.id,
        name: app.name,
        icon: appIcon(app.name),
        action: () => startApp(app.name)(dispatch),
      })),
      {
        id: "safari",
        name: "Safari",
        icon: appIcon("Safari"),
        action: () => startApp("Safari")(dispatch),
      },
      {
        id: "settings",
        name: "Settings",
        icon: appIcon("Settings"),
        action: () => startApp("Settings")(dispatch),
      },
    ],
    "name"
  );

  return (
    <div
      className={cn(
        // pointer-events-none so this layer never steals scroll from apps underneath
        "pointer-events-none fixed z-30 bottom-0 right-0 left-0 flex flex-col items-center justify-end",
        isMobileShell
          ? "pb-[max(8px,env(safe-area-inset-bottom))]"
          : "p-4"
      )}
    >
      {showDock ? (
        <div className="pointer-events-auto">
          <MacOSDock
            className={cn(isIos && "mb-1")}
            magnification={!isMobileShell}
            apps={apps}
            onAppClick={(appId) => {
              const app = apps.find((a) => a.id === appId);
              if (app) app.action();
            }}
            openApps={state.applications
              .filter((app) => !app.minimized)
              .map((app) => app.id)}
          />
        </div>
      ) : null}
      {isMobileShell ? (
        <div className="pointer-events-auto">
          <HomeIndicator />
        </div>
      ) : null}
    </div>
  );
};

export default BottomDock;
