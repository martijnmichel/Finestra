import { useMemo, useState } from "react";

import { getApplication } from "../applications";
import { useAppState } from "../store";

export const useWindowManager = () => {
  const { applications } = useAppState();

  const activeApp = useMemo(
    () => applications.find((app) => app.active),
    [applications]
  );

  const appIcon = (AppName: string) => {
    const App = getApplication(AppName);

    return App && App.icon();
  };

  const isActive = (id: string) => activeApp?.id === id;

  return {
    activeApp,
    appIcon,
    isActive,
  };
};
