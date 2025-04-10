import React, { useEffect, useRef } from "react";
import { AppButton } from "./application/AppButton";
import { Applications } from "../applications";
import { useAppContext } from "../store";
import { startApp } from "../store/actions/startApp";
export const Desktop = () => {
  const { dispatch } = useAppContext();

  return (
    <div className="mt-[32px] p-5 flex flex-col gap-4 relative">
      <AppButton
        size={"80px"}
        appIcon={Applications.About.icon()}
        appName={Applications.About.name}
        onClick={() => startApp(Applications.About.name)(dispatch)}
      />
      <AppButton
        id="step-vscode"
        size={"80px"}
        appIcon={Applications.VSCode.icon()}
        appName={Applications.VSCode.name}
        onClick={() => startApp(Applications.VSCode.name)(dispatch)}
      />
      <AppButton
        size={"80px"}
        appIcon={Applications.Terminal.icon()}
        appName={Applications.Terminal.name}
        onClick={() => startApp(Applications.Terminal.name)(dispatch)}
      />
      <AppButton
        size={"80px"}
        appIcon={Applications.Sonid.icon()}
        appName={Applications.Sonid.name}
        onClick={() => startApp(Applications.Sonid.name)(dispatch)}
      />
      <AppButton
        size={"80px"}
        appIcon={Applications.DirectusMobile.icon()}
        appName={Applications.DirectusMobile.name}
        onClick={() => startApp(Applications.DirectusMobile.name)(dispatch)}
      />
    </div>
  );
};
