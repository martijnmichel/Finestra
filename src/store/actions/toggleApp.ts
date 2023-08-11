import { Dispatch } from "react";
import { ActionType } from ".";

export type ActionToggleApp = {
  type: ActionType.TOGGLE_APP;
  appId: string;
};
export const toggleApp =
  (appId: string) => (dispatch: Dispatch<ActionToggleApp>) => {
    dispatch({
      type: ActionType.TOGGLE_APP,
      appId,
    });
  };
