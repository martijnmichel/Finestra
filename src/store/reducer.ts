import { find } from "lodash";
import { IAppState, initialState } from ".";
import { ActionType, AppActions } from "./actions";
import { getApplication } from "../applications";

export const appReducer = (
  state: IAppState,
  action: AppActions
): typeof initialState => {
  console.log({ action, state });

  switch (action.type) {
    case ActionType.START_APP: {
      const App = getApplication(action.appName);

      const activeAppWindow = find(
        state.applications,
        (app) => app.name === action.appName
      );

      if (App && !activeAppWindow) {
        const newState = [
          ...state.applications.map((app) => ({
            ...app,
            active: false,
          })),
          new App(action.config),
        ];

        return {
          ...state,
          applications: newState,
          launchpad: false,
        };
      }

      if (App && activeAppWindow) {
        return {
          ...state,
          applications: state.applications.map((app) => ({
            ...app,
            active: app.name === action.appName,
            minimized:
              app.name === action.appName ? false : app.minimized,
            relatedProject:
              app.name === action.appName &&
              action.config?.relatedProject !== undefined
                ? action.config.relatedProject
                : app.relatedProject,
          })),
          launchpad: false,
        };
      }

      return {
        ...state,
      };
    }
    case ActionType.TOGGLE_FULLSCREEN: {
      const newState = [
        ...state.applications.map((app) => ({
          ...app,
          fullscreen: app.id === action.appId ? !app.fullscreen : app.fullscreen,
        })),
      ];
      return {
        ...state,
        applications: newState,
      };
    }
    case ActionType.CLOSE_APP: {
      const newState = [
        ...state.applications.filter((app, index) => app.id !== action.appId),
      ];

      return {
        ...state,
        applications: newState,
      };
    }

    case ActionType.TOGGLE_APP: {
      
      const newState = [
        ...state.applications.map((app) => ({
          ...app,
          active: app.id === action.appId,
          minimized: app.id === action.appId ? false : app.minimized,
        })),
      ];

      console.log({ newState })
      return {
        ...state,
        applications: newState,
        launchpad: false,
      };
    }

    case ActionType.HIDE_APP: {
      const newState = [
        ...state.applications.map((app) => ({
          ...app,
          minimized: app.id === action.appId ? true : app.minimized,
          fullscreen: app.id === action.appId ? false : app.fullscreen,
        })),
      ];

      return {
        ...state,
        applications: newState,
      };
    }
    case ActionType.SET_APPLICATIONS: {
      return {
        ...state,
        applications: action.applications,
      };
    }
    case ActionType.UPDATE_APP_WINDOW: {
      const newState = [
        ...state.applications.map((app) => ({
          ...app,
          width:
            app.id === action.appId && action.config.width
              ? action.config.width
              : app.width,
          height:
            app.id === action.appId && action.config.height
              ? action.config.height
              : app.height,
          x:
            app.id === action.appId && action.config.x
              ? action.config.x
              : app.x,
          y:
            app.id === action.appId && action.config.y
              ? action.config.y
              : app.y,
        })),
      ];

      return {
        ...state,
        applications: newState,
      };
    }
    case ActionType.TOGGLE_LAUNCHPAD: {
      return {
        ...state,
        launchpad: !state.launchpad,
      };
    }
    default:
      throw new Error();
  }
};
