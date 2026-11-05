import { Dispatch } from "react";
import { ActionType } from ".";

export type ActionToggleAppSwitcher = {
  type: ActionType.TOGGLE_APP_SWITCHER;
  open?: boolean;
};

export const toggleAppSwitcher =
  (open?: boolean) => (dispatch: Dispatch<ActionToggleAppSwitcher>) => {
    dispatch({
      type: ActionType.TOGGLE_APP_SWITCHER,
      open,
    });
  };
