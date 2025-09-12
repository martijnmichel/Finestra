import { ActionCloseApp } from "./closeApp";
import { ActionHideApp } from "./hideApp";
import { ActionStartApp } from "./startApp";
import { ActionToggleApp } from "./toggleApp";
import { ActionToggleOrOpenApp } from "./toggleOrOpenApp";
import { ActionToggleLaunchpad } from "./toggleLaunchPad";
import { ActionUpdateAppWindow } from "./updateAppWindow";
import { ActionSetApplications } from "./setApplications";
import { ActionToggleFullscreen } from "./toggleFullscreen";

export enum ActionType {
  TOGGLE_LAUNCHPAD = "TOGGLE_LAUNCHPAD",
  START_APP = "START_APP",
  CLOSE_APP = "CLOSE_APP",
  HIDE_APP = "HIDE_APP",
  TOGGLE_APP = "TOGGLE_APP",
  TOGGLE_OR_OPEN_APP = "TOGGLE_OR_OPEN_APP",
  TOGGLE_FULLSCREEN = "TOGGLE_FULLSCREEN",
  UPDATE_APP_WINDOW = "UPDATE_APP_WINDOW",
  SET_APPLICATIONS = "SET_APPLICATIONS",
}

export type AppActions =
  | ActionToggleLaunchpad
  | ActionStartApp
  | ActionCloseApp
  | ActionToggleApp
  | ActionHideApp
  | ActionUpdateAppWindow
  | ActionToggleOrOpenApp
  | ActionSetApplications
  | ActionToggleFullscreen;
