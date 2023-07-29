import React, { useEffect } from "react";
import { useWindowManager } from "../services/WindowManager";
import { useRecoilState } from "recoil";
import { launchpad } from "../store/atoms/launchpad";
import Launchpad from "../icons/launchpad.png";
import { applications } from "../store/atoms/applications";
import { AppButton } from "./application/AppButton";

const BottomDock = () => {
  const { toggleApp, appIcon } = useWindowManager();
  const [launchPadState, setLaunchPadState] = useRecoilState(launchpad);
  const [applicationState, setApplicationState] = useRecoilState(applications);

  return (
    <nav
      className={`fixed z-30 bottom-0 right-0 left-0 flex transform transition-all ${
        launchPadState ? "translate-y-28" : ""
      }`}
    >
      <div className="mx-auto bg-white/50 w-auto min-w-[300px] border-1 border-gray-700 rounded-xl mb-2 px-2 py-1">
        <AppButton
          appIcon={<img src={Launchpad} alt="Logo" />}
          onClick={() => setLaunchPadState(true)}
        />

        {applicationState.map((app, index) => {
          return (
            <AppButton
              key={`dock-app-button-${index}${app.name}`}
              appIcon={appIcon(app.name)}
              onClick={() => toggleApp(app.id)}
            />
          );
        })}
      </div>
    </nav>
  );
};

export default BottomDock;
