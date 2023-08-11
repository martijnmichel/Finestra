import { Dispatch } from "react";
import { ActionType } from ".";

export type ActionToggleLaunchpad = {
  type: ActionType.TOGGLE_LAUNCHPAD;
};
export const toggleLaunchpad =
  () => (dispatch: Dispatch<ActionToggleLaunchpad>) => {
    dispatch({
      type: ActionType.TOGGLE_LAUNCHPAD,
    });
  };
