import { createContext, useReducer, useRef } from "react";
import { Application } from "../applications/application";
import React, { useContext, useEffect, useState } from "react";
import { ActionType, AppActions } from "./actions";
import { appReducer } from "./reducer";
import { getOsFormFactor } from "@/hooks/useOsFormFactor";
export interface IAppState {
  applications: Application[];
  launchpad: boolean;
  appSwitcher: boolean;
  siriOpen: boolean;
}

export const initialState: IAppState = {
  applications: [],
  launchpad: false,
  appSwitcher: false,
  siriOpen: false,
};
export interface IAppContext {
  state: IAppState;
  dispatch: React.Dispatch<AppActions>;
}

const AppContext = createContext<IAppContext>({
  state: initialState,
  dispatch: () => {},
});

const APPS_STORAGE_KEY = "martijnvde-applications";

/** Keeps open windows across Fast Refresh remounts of the provider. */
let sessionState: IAppState | null = null;

if (import.meta.hot) {
  sessionState = import.meta.hot.data.sessionState ?? sessionState;
  import.meta.hot.dispose((data) => {
    data.sessionState = sessionState;
  });
}

const reduceAndCache = (state: IAppState, action: AppActions): IAppState => {
  const next = appReducer(state, action);
  sessionState = next;
  return next;
};

const restoreApplications = (dispatch: React.Dispatch<AppActions>) => {
  // iPhone: land on Home — no restored windows, no default About.
  if (getOsFormFactor() === "ios") return;

  const applications = localStorage.getItem(APPS_STORAGE_KEY);
  if (applications) {
    JSON.parse(applications)
      .filter((application: Application) => application.name !== "Siri")
      .sort((a: Application, b: Application) => (a.active ? 1 : -1))
      .forEach((application: Application) => {
        dispatch({
          type: ActionType.START_APP,
          appName: application.name,
          config: application,
        });
      });
  } else {
    dispatch({ type: ActionType.START_APP, appName: "About" });
  }
};

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const restoredFromSession = useRef(sessionState != null);
  const [state, dispatch] = useReducer(
    reduceAndCache,
    undefined,
    () => sessionState ?? { ...initialState }
  );
  const [init, setInit] = useState(restoredFromSession.current);
  const value = { state, dispatch };

  useEffect(() => {
    if (init && state.applications.length)
      localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(state.applications));
  }, [state.applications, init]);

  useEffect(() => {
    if (restoredFromSession.current) return;
    restoreApplications(dispatch);
    setInit(true);
  }, []);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => useContext(AppContext);
const useAppState = () => useAppContext()?.state;
const useAppDispatch = () => useAppContext()?.dispatch;

export {
  AppContext,
  AppContextProvider,
  useAppContext,
  useAppState,
  useAppDispatch,
};
