import { Dispatch } from "react";
import { ActionType } from ".";

export type ActionHideApp = {
  type: ActionType.HIDE_APP;
  appId: string;
};
export const hideApp =
  (appId: string) => (dispatch: Dispatch<ActionHideApp>) => {
    dispatch({
      type: ActionType.HIDE_APP,
      appId,
    });
  };
