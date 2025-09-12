import { Dispatch } from "react";
import { ActionType } from ".";

export type ActionToggleOrOpenApp = {
  type: ActionType.TOGGLE_OR_OPEN_APP;
  appId: string;
};
export const toggleOrOpenApp =
  (appId: string) => (dispatch: Dispatch<ActionToggleOrOpenApp>) => {
    dispatch({
      type: ActionType.TOGGLE_OR_OPEN_APP,
      appId,
    });
  };
