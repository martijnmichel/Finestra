import { createContext, useReducer } from "react";
import { Application } from "../applications/application";
import React, { useContext, useEffect, useState } from "react";
import { ActionType, AppActions } from "./actions";
import { appReducer } from "./reducer";
export interface IAppState {
  applications: Application[];
  launchpad: boolean;
  appSwitcher: boolean;
}

export const initialState: IAppState = {
  applications: [],
  launchpad: false,
  appSwitcher: false,
};
export interface IAppContext {
  state: IAppState;
  dispatch: React.Dispatch<AppActions>;
}

const AppContext = createContext<IAppContext>({
  state: initialState,
  dispatch: () => {},
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState as IAppState);
  const [init, setInit] = useState(false);
  const value = { state, dispatch };

  useEffect(() => {
    if (init && state.applications.length)
      localStorage.setItem(
        "martijnvde-applications",
        JSON.stringify(state.applications)
      );
  }, [state.applications]);

  useEffect(() => {
    const applications = localStorage.getItem("martijnvde-applications");
    if (applications) {
      JSON.parse(applications).sort((a: Application, b: Application) => a.active ? 1 : -1).forEach((application: Application) => {
        dispatch({
          type: ActionType.START_APP,
          appName: application.name,
          config: application,
        });
      });
    } else {
      dispatch({ type: ActionType.START_APP, appName: "About" });
    }
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
