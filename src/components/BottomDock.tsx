import React, { useEffect } from "react";
import { useWindowManager } from "../services/WindowManager";
import Launchpad from "../icons/launchpad.png";
import { AppButton } from "./application/AppButton";
import { useAppContext } from "../store";
import { toggleLaunchpad } from "../store/actions/toggleLaunchPad";
import { toggleApp } from "../store/actions/toggleApp";

const BottomDock = () => {
  const { appIcon } = useWindowManager();
  const { state, dispatch } = useAppContext();

  return (
    <nav
      className={`fixed z-30 bottom-0 right-0 left-0 flex transform transition-all ${
        state.launchpad ? "translate-y-28" : ""
      }`}
    >
      <div className="mx-auto bg-white/50 w-auto min-w-[300px] border-1 border-gray-700 rounded-xl mb-2 px-2 py-1">
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
    </nav>
  );
};

export default BottomDock;
