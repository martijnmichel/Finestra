import React from "react";
import { AppButton } from "./application/AppButton";
import { Applications } from "../applications";
import { useAppContext } from "../store";
import { startApp } from "../store/actions/startApp";
import { toggleApp } from "@/store/actions/toggleApp";
import { DesktopWidgets } from "./widgets";

export const Desktop = () => {
  const { state, dispatch } = useAppContext();

  const desktopApps = [
    Applications.About,
    Applications.Request,
    Applications.VSCode,
    Applications.Sonid,
    Applications.DirectusMobile,
  ] as const;

  return (
    <div className="absolute inset-0 z-[5] overflow-hidden">
      <div className="mt-[32px] flex flex-col gap-4 p-5">
        {desktopApps.map((AppClass) => (
          <AppButton
            key={AppClass.appName}
            id={AppClass.appName === "VSCode" ? "step-vscode" : undefined}
            size={"80px"}
            appIcon={AppClass.icon()}
            appName={AppClass.appName}
            onClick={() => {
              const app = state.applications.find(
                (app) => app.name === AppClass.appName
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
      <DesktopWidgets />
    </div>
  );
};
