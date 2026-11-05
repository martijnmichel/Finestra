import { Dispatch } from "react";
import { ActionType } from ".";

export type ActionGoHome = {
  type: ActionType.GO_HOME;
};

export const goHome = () => (dispatch: Dispatch<ActionGoHome>) => {
  dispatch({ type: ActionType.GO_HOME });
};
