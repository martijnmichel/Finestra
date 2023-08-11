import { Dispatch } from "react";
import { ActionType } from ".";

export type ActionCloseApp = {
  type: ActionType.CLOSE_APP;
  appId: string;
};
export const closeApp =
  (appId: string) => (dispatch: Dispatch<ActionCloseApp>) => {
    dispatch({
      type: ActionType.CLOSE_APP,
      appId,
    });
  };
