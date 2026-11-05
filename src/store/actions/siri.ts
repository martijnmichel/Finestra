import { Dispatch } from "react";
import { ActionType } from ".";

export type ActionOpenSiri = { type: ActionType.OPEN_SIRI };
export type ActionCloseSiri = { type: ActionType.CLOSE_SIRI };
export type ActionSetSiriOpen = {
  type: ActionType.SET_SIRI_OPEN;
  open: boolean;
};

export const openSiri = () => (dispatch: Dispatch<ActionOpenSiri>) => {
  dispatch({ type: ActionType.OPEN_SIRI });
};

export const closeSiri = () => (dispatch: Dispatch<ActionCloseSiri>) => {
  dispatch({ type: ActionType.CLOSE_SIRI });
};

export const setSiriOpen =
  (open: boolean) => (dispatch: Dispatch<ActionSetSiriOpen>) => {
    dispatch({ type: ActionType.SET_SIRI_OPEN, open });
  };
