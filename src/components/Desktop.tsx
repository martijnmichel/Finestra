import React, { useEffect, useRef } from "react";
import { AppButton } from "./application/AppButton";
import { Applications } from "../applications";
import { useAppContext } from "../store";
import { startApp } from "../store/actions/startApp";
import { toggleApp } from "@/store/actions/toggleApp";
export const Desktop = () => {
  const { state, dispatch } = useAppContext();

  return (
    <div className="mt-[32px] p-5 flex flex-col gap-4 relative">
      <AppButton
        size={"80px"}
        appIcon={Applications.About.icon()}
        appName={Applications.About.name}
        onClick={() => {
          const app = state.applications.find(
            (app) => app.name === Applications.About.name
          );
          if (app) {
            toggleApp(app.id)(dispatch);
          } else {
            startApp(Applications.About.name)(dispatch);
          }
        }}
      />
      <AppButton
        id="step-vscode"
        size={"80px"}
        appIcon={Applications.VSCode.icon()}
        appName={Applications.VSCode.name}
        onClick={() => {
          const app = state.applications.find(
            (app) => app.name === Applications.VSCode.name
          );
          if (app) {
            toggleApp(app.id)(dispatch);
          } else {
            startApp(Applications.VSCode.name)(dispatch);
          }
        }}
      />
      <AppButton
        size={"80px"}
        appIcon={Applications.Terminal.icon()}
        appName={Applications.Terminal.name}
        onClick={() => {
          const app = state.applications.find(
            (app) => app.name === Applications.Terminal.name
          );
          if (app) {
            toggleApp(app.id)(dispatch);
          } else {
            startApp(Applications.Terminal.name)(dispatch);
          }
        }}
      />
      <AppButton
        size={"80px"}
        appIcon={Applications.Sonid.icon()}
        appName={Applications.Sonid.name}
        onClick={() => {
          const app = state.applications.find(
            (app) => app.name === Applications.Sonid.name
          );
          if (app) {
            toggleApp(app.id)(dispatch);
          } else {
            startApp(Applications.Sonid.name)(dispatch);
          }
        }}
      />
      <AppButton
        size={"80px"}
        appIcon={Applications.DirectusMobile.icon()}
        appName={Applications.DirectusMobile.name}
        onClick={() => {
          const app = state.applications.find(
            (app) => app.name === Applications.DirectusMobile.name
          );
          if (app) {
            toggleApp(app.id)(dispatch);
          } else {
            startApp(Applications.DirectusMobile.name)(dispatch);
          }
        }}
      />
    </div>
  );
};
