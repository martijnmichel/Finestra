import { Dispatch } from "react";
import { ActionType } from ".";

export type ActionToggleFullscreen = {
  type: ActionType.TOGGLE_FULLSCREEN;
  appId: string;
};
export const toggleFullscreen =
  (appId: string) => (dispatch: Dispatch<ActionToggleFullscreen>) => {
    dispatch({
      type: ActionType.TOGGLE_FULLSCREEN,
      appId,
    });
  };
