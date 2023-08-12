import { Dispatch } from "react";
import { ActionType } from ".";
import { AppConfig } from "../../applications/application";

export type ActionStartApp = {
  type: ActionType.START_APP;
  appName: string;
  config?: AppConfig;
};
export const startApp =
  (appName: string, config?: AppConfig) =>
  (dispatch: Dispatch<ActionStartApp>) => {
    dispatch({
      type: ActionType.START_APP,
      appName,
      config,
    });
  };
