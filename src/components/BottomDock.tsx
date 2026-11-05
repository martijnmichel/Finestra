import React, { useEffect } from "react";
import { useWindowManager } from "../services/WindowManager";
import Launchpad from "../icons/launchpad.png";
import { AppButton } from "./application/AppButton";
import { useAppContext } from "../store";
import { toggleLaunchpad } from "../store/actions/toggleLaunchPad";
import { MacOSDock } from "./ui/shadcn-io/mac-os-dock";
import { startApp } from "@/store/actions/startApp";
import { uniqBy } from "lodash";
import { cn } from "@/lib/utils";

const BottomDock = () => {
  const { appIcon } = useWindowManager();
  const { state, dispatch } = useAppContext();

  console.log(state.applications);

  const hasFullscreenApp = state.applications.some((app) => app.fullscreen);

  const apps = uniqBy(
    [
      {
        id: "launchpad",
        name: "Launchpad",
        icon: <img src={Launchpad} alt="Logo" />,
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
    <div className="fixed z-30 bottom-0 right-0 left-0 p-4 flex items-center justify-center">
      <MacOSDock
        className={cn(hasFullscreenApp && "hidden")}
        apps={apps}
        onAppClick={(appId) => {
          const app = apps.find((app) => app.id === appId);
          if (app) {
            app.action();
          }
        }}
        openApps={state.applications.map((app) => app.id)}
      />
    </div>
    /**<nav
      className={`fixed z-30 bottom-0 right-0 left-0 flex transform transition-all ${
        state.launchpad ? "translate-y-28" : ""
      }`}
    >
      <div className="mx-auto bg-white/50 flex items-center gap-1 w-auto min-w-[300px] border-1 border-gray-700 rounded-xl mb-2 px-2 py-1">
        <AppButton
          id="step-launchpad"
          appIcon={<img src={Launchpad} alt="Logo" />}
          onClick={() => toggleLaunchpad()(dispatch)}
        />

        {state.applications.map((app, index) => {
          return (
            <AppButton
              key={`dock-app-button-${index}${app.name}`}
              appIcon={appIcon(app.name)}
              onClick={() => toggleApp(app.id)(dispatch)}
            />
          );
        })}
      </div>
    </nav> */
  );
};

export default BottomDock;
