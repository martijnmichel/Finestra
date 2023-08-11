import { ActionCloseApp } from "./closeApp";
import { ActionHideApp } from "./hideApp";
import { ActionStartApp } from "./startApp";
import { ActionToggleApp } from "./toggleApp";
import { ActionToggleLaunchpad } from "./toggleLaunchPad";
import { ActionUpdateAppWindow } from "./updateAppWindow";

export enum ActionType {
  TOGGLE_LAUNCHPAD = "TOGGLE_LAUNCHPAD",
  START_APP = "START_APP",
  CLOSE_APP = "CLOSE_APP",
  HIDE_APP = "HIDE_APP",
  TOGGLE_APP = "TOGGLE_APP",
  UPDATE_APP_WINDOW = "UPDATE_APP_WINDOW",
}

export type AppActions =
  | ActionToggleLaunchpad
  | ActionStartApp
  | ActionCloseApp
  | ActionToggleApp
  | ActionHideApp
  | ActionUpdateAppWindow;
