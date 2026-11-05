import React, { useRef } from "react";
import { useWindowManager } from "../services/WindowManager";
import Launchpad from "../icons/launchpad.png";
import { useAppContext } from "../store";
import { toggleLaunchpad } from "../store/actions/toggleLaunchPad";
import { MacOSDock } from "./ui/shadcn-io/mac-os-dock";
import { startApp } from "@/store/actions/startApp";
import { goHome } from "@/store/actions/goHome";
import { toggleAppSwitcher } from "@/store/actions/toggleAppSwitcher";
import { uniqBy } from "lodash";
import { cn } from "@/lib/utils";
import { useOsFormFactor } from "@/hooks/useOsFormFactor";
import { House } from "lucide-react";

const BottomDock = () => {
  const { appIcon } = useWindowManager();
  const { state, dispatch } = useAppContext();
  const { isMobileShell, isMacos } = useOsFormFactor();
  const swipeStartY = useRef<number | null>(null);

  const hasFullscreenApp = state.applications.some((app) => app.fullscreen);
  const hideForFullscreen = isMacos && hasFullscreenApp;

  const apps = uniqBy(
    [
      ...(isMacos
        ? [
            {
              id: "launchpad",
              name: "Launchpad",
              icon: <img src={Launchpad} alt="Launchpad" />,
              action: () => toggleLaunchpad()(dispatch),
            },
          ]
        : [
            {
              id: "home",
              name: "Home",
              icon: (
                <span className="flex size-full items-center justify-center rounded-[22%] bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                  <House className="size-[55%]" strokeWidth={2.25} />
                </span>
              ),
              action: () => goHome()(dispatch),
            },
          ]),
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
        "fixed z-30 bottom-0 right-0 left-0 flex flex-col items-center justify-end",
        isMobileShell ? "pb-[max(8px,env(safe-area-inset-bottom))]" : "p-4"
      )}
      onTouchStart={(e) => {
        if (!isMobileShell) return;
        swipeStartY.current = e.touches[0]?.clientY ?? null;
      }}
      onTouchEnd={(e) => {
        if (!isMobileShell) return;
        const start = swipeStartY.current;
        swipeStartY.current = null;
        if (start == null) return;
        const end = e.changedTouches[0]?.clientY;
        if (end != null && start - end > 48) {
          toggleAppSwitcher(true)(dispatch);
        }
      }}
    >
      {isMobileShell ? (
        <button
          type="button"
          aria-label="Open App Switcher"
          className="mb-2 h-1 w-32 rounded-full bg-white/55 shadow-sm border-0 cursor-pointer"
          onClick={() => toggleAppSwitcher(true)(dispatch)}
        />
      ) : null}

      <MacOSDock
        className={cn(hideForFullscreen && "hidden")}
        magnification={!isMobileShell}
        apps={apps}
        onAppClick={(appId) => {
          const app = apps.find((a) => a.id === appId);
          if (app) {
            app.action();
          }
        }}
        openApps={state.applications
          .filter((app) => !app.minimized)
          .map((app) => app.id)}
      />
    </div>
  );
};

export default BottomDock;
