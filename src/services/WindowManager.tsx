import { useMemo, useState } from "react";

import { Applications, App } from "../applications";
import { find } from "lodash";
import { useAppState } from "../store";

export const useWindowManager = () => {
  const { applications } = useAppState();

  const activeApp = useMemo(
    () => applications.find((app) => app.active),
    [applications]
  );

  const appIcon = (AppName: string) => {
    const App = find(Applications, (app) => app.name === AppName);

    return App && App.icon();
  };

  const isActive = (id: string) => activeApp?.id === id;

  return {
    activeApp,
    appIcon,
    isActive,
  };
};
