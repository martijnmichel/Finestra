import React from "react";
import { useWindowManager } from "../services/WindowManager";
import { Applications } from "../applications";
import { useRecoilState } from "recoil";
import { launchpad } from "../store/atoms/launchpad";
import Launchpad from "../icons/launchpad.png";
import { AppButton } from "./application/AppButton";
import { applications } from "../store/atoms/applications";

const BottomDock = () => {
  const { toggleApp } = useWindowManager();
  const [launchPadState, setLaunchPadState] = useRecoilState(launchpad);
  const [applicationState, setApplicationState] = useRecoilState(applications);


  return (
    <nav className={`fixed bottom-0 right-0 left-0 flex transform transition-all ${launchPadState ? 'translate-y-28' : ''}`}>
      <div className="mx-auto bg-white/50 w-auto min-w-[300px] border-1 border-gray-700 rounded-xl mb-2 p-2">
     
        <AppButton appIcon={<img src={Launchpad} alt="Logo" />} onClick={() => setLaunchPadState(true)} />

        {applicationState.map((app, index) => {
          return (
            <AppButton key={`app-button-${index}`} appIcon={Applications[index].icon()} onClick={() => toggleApp(app.id)} />
          );
        })}
      </div>
    </nav>
  );
};

export default BottomDock;
