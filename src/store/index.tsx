import { createContext, useReducer } from "react";
import { Application } from "./atoms/applications";
import React, { useContext } from "react";
import { AppActions } from "./actions";
import { appReducer } from "./reducer";
export interface IAppState {
  applications: Application[];
  launchpad: boolean;
}

export const initialState: IAppState = {
  applications: [],
  launchpad: false,
};
export interface IAppContext {
  state: IAppState;
  dispatch: React.Dispatch<AppActions>;
}

const AppContext = createContext<IAppContext>({
  state: initialState,
  dispatch: () => {},
});

const AppContextProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(appReducer, initialState as IAppState);
  const value = { state, dispatch };
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
