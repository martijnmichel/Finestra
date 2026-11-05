import { find } from "lodash";
import { IAppState, initialState } from ".";
import { ActionType, AppActions } from "./actions";
import { getApplication } from "../applications";
import { Application } from "../applications/application";

const nextStackOrder = (apps: Application[]) =>
  Math.max(0, ...apps.map((app) => app.stackOrder ?? 0)) + 1;

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
        const opened = new App(action.config);
        opened.active = true;
        opened.stackOrder = nextStackOrder(state.applications);

        const newState = [
          ...state.applications.map((app) => ({
            ...app,
            active: false,
          })),
          opened,
        ];

        return {
          ...state,
          applications: newState,
          launchpad: false,
        };
      }

      if (App && activeAppWindow) {
        const order = nextStackOrder(state.applications);
        return {
          ...state,
          applications: state.applications.map((app) => ({
            ...app,
            active: app.name === action.appName,
            stackOrder:
              app.name === action.appName ? order : app.stackOrder,
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
      const order = nextStackOrder(state.applications);
      const newState = [
        ...state.applications.map((app) => ({
          ...app,
          active: app.id === action.appId,
          stackOrder: app.id === action.appId ? order : app.stackOrder,
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
        ...state.applications.map((app) => {
          if (app.id !== action.appId) return { ...app };
          return {
            ...app,
            width: action.config.width ?? app.width,
            height: action.config.height ?? app.height,
            x: action.config.x ?? app.x,
            y: action.config.y ?? app.y,
          };
        }),
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
