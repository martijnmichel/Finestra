import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { Applications, App } from "../applications";
import {
  AppConfig,
  Application,
  applications,
} from "../store/atoms/applications";
import { launchpad } from "../store/atoms/launchpad";
import { find } from "lodash";

export const useWindowManager = () => {
  const [applicationState, setApplicationState] = useRecoilState(applications);

  const [launchpadState, setLaunchpadState] = useRecoilState(launchpad);

  const startApp = useCallback(
    (AppName: string, config?: AppConfig) => {
      const App = find(Applications, (app) => app.name === AppName);

      const activeAppWindow = find(
        applicationState,
        (app) => app.name === AppName
      );

      console.log({ AppName, activeAppWindow });

      if (
        !!activeAppWindow &&
        !activeAppWindow.multiple &&
        !activeAppWindow.active
      ) {
        toggleApp(activeAppWindow.id);
      } else if (App && !activeAppWindow) {
        const newState = applicationState.map((app) => ({
          ...app,
          active: false,
        }));

        setApplicationState([...newState, new App(config)]);
        setLaunchpadState(false);
      }
    },
    [applicationState, setApplicationState, Applications]
  );

  /**
   * close app
   * @param appId
   */
  const closeApp = useCallback(
    (appId: string) => {
      console.log(applicationState);
      const newState = [...applicationState.filter((app) => app.id !== appId)];
      console.log(newState);
      setApplicationState(() => [...newState]);
    },
    [applicationState, setApplicationState]
  );

  /**
   * Set app invisible
   * @param appId
   */
  const hideApp = useCallback(
    (appId: string) => {
      const newState = applicationState.map((app) => ({
        ...app,
        minimized: app.id === appId ? true : app.minimized,
      }));

      console.log(newState);
      setApplicationState(newState);
    },
    [applicationState, setApplicationState]
  );

  /**
   * Make app active
   * @param appId
   */
  const toggleApp = useCallback(
    (appId: string) => {
      const newState = applicationState.map((app) => ({
        ...app,
        active: app.id === appId,
        minimized: app.id === appId ? false : app.minimized,
      }));
      setApplicationState(newState);
      setLaunchpadState(false);
    },
    [applicationState, setApplicationState]
  );

  const updateWindow = useCallback(
    (
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

      console.log(newState);
    },
    [applicationState, setApplicationState]
  );

  const activeApp = useMemo(
    () => applicationState.find((app) => app.active),
    [applicationState]
  );

  const appIcon = (AppName: string) => {
    const App = find(Applications, (app) => app.name === AppName);

    return App && App.icon();
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
