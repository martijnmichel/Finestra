import { Dispatch } from "react";
import { ActionType } from ".";
import { AppConfig } from "../../applications/application";
import { trackAppPageview } from "../../lib/analytics";

export type ActionStartApp = {
  type: ActionType.START_APP;
  appName: string;
  config?: AppConfig;
};
export const startApp =
  (appName: string, config?: AppConfig) =>
  (dispatch: Dispatch<ActionStartApp>) => {
    trackAppPageview(appName);
    dispatch({
      type: ActionType.START_APP,
      appName,
      config,
    });
  };
