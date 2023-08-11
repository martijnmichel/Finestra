import { Dispatch } from "react";
import { ActionType } from ".";

type Position = {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
};
export type ActionUpdateAppWindow = {
  type: ActionType.UPDATE_APP_WINDOW;
  appId: string;
  config: Position;
};
export const updateAppWindow =
  (appId: string, config: Position) =>
  (dispatch: Dispatch<ActionUpdateAppWindow>) => {
    dispatch({
      type: ActionType.UPDATE_APP_WINDOW,
      appId,
      config,
    });
  };
