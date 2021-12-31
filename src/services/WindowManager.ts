import { useState } from "react";
import { useRecoilState } from "recoil";
import { Applications } from "../applications";
import { applications } from "../store/atoms/applications";
import { launchpad } from "../store/atoms/launchpad";
import { removeItemAtIndex } from "../store/utils/array";

export const useWindowManager = () => {
  const [applicationState, setApplicationState] = useRecoilState(applications);
  
  const [launchpadState, setLaunchpadState] = useRecoilState(launchpad);

  const startApp = (AppName: string) => {
    const App = Applications.find((app) => app.name === AppName);
    if (App) {
      const newState = applicationState.map(app => ({ ...app, active: false }))
      setApplicationState([...newState, new App()]);
      setLaunchpadState(false);
    }
  };

  const closeApp = (appId: string) => {
    const index = applicationState.findIndex((app) => app.id === appId);
    const newApps = removeItemAtIndex(applicationState, index);
    setApplicationState(newApps);
  };

  const toggleApp = (appId: string) => {

    const newState = applicationState.map(app => ({ ...app, active: app.id === appId}))
    setApplicationState(newState);
  };

  const activeApp = () => applicationState.find(app => app.active)
  

  return {
    startApp,
    closeApp,
    toggleApp,
    activeApp
  };
};
