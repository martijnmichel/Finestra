import { useState } from "react";
import { useRecoilState } from "recoil";
import { Applications } from "../applications";
import { applications } from "../store/atoms/applications";
import { launchpad } from "../store/atoms/launchpad";
import { removeItemAtIndex, replaceItemAtIndex } from "../store/utils/array";

export const useWindowManager = () => {
  const [applicationState, setApplicationState] = useRecoilState(applications);

  const [launchpadState, setLaunchpadState] = useRecoilState(launchpad);

  const startApp = (AppName: string) => {
    const App = Applications.find((app) => app.name === AppName);
    if (App) {
      const newState = applicationState.map((app) => ({
        ...app,
        active: false,
      }));
      setApplicationState([...newState, new App()]);
      setLaunchpadState(false);
    }
  };

  /**
   * close app
   * @param appId
   */
  const closeApp = (appId: string) => {
    const index = applicationState.findIndex((app) => app.id === appId);
    const newApps = removeItemAtIndex(applicationState, index);
    setApplicationState(newApps);
  };

  /**
   * Set app invisible
   * @param appId
   */
  const hideApp = (appId: string) => {
    const newState = applicationState.map((app) => ({
      ...app,
      visible: app.id === appId ? false : app.visible,
    }));

    console.log(newState);
    setApplicationState(newState);
  };

  /**
   * Make app active
   * @param appId
   */
  const toggleApp = (appId: string) => {
    const newState = applicationState.map((app) => ({
      ...app,
      active: app.id === appId,
      visible: app.id === appId ? true : app.visible,
    }));
    setApplicationState(newState);
  };

  const updateWindow = (
    appId: string,
    {
      width,
      height,
      x,
      y,
    }: { width?: number; height?: number; x?: number; y?: number }
  ) => {
    const newState = applicationState.map((app) => ({
      ...app,
      width: app.id === appId && width ? width : app.width,
      height: app.id === appId && height ? height : app.height,
      x: app.id === appId && x ? x : app.x,
      y: app.id === appId && y ? y : app.y,
    }));

    setApplicationState(newState);
  };

  const activeApp = () => applicationState.find((app) => app.active);

  const appIcon = (AppName: string) => {
    const App = Applications.find((app) => app.name === AppName);
    return App?.icon();
  };

  return {
    startApp,
    closeApp,
    toggleApp,
    activeApp,
    hideApp,
    updateWindow,
    appIcon,
  };
};
