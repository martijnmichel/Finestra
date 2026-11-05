import { find } from "lodash";
import { IAppState, initialState } from ".";
import { ActionType, AppActions } from "./actions";
import { getApplication } from "../applications";
import { Application } from "../applications/application";
import {
  getOsFormFactor,
  isIosPhone,
  isMobileShell,
} from "../hooks/useOsFormFactor";

const nextStackOrder = (apps: Application[]) =>
  Math.max(0, ...apps.map((app) => app.stackOrder ?? 0)) + 1;

/** iPhone only: one foreground app; others stay minimized for the switcher. */
const applyIosForeground = (
  apps: Application[],
  foregroundId: string | null
): Application[] => {
  if (!isIosPhone()) return apps;

  return apps.map((app) => {
    const isForeground = foregroundId !== null && app.id === foregroundId;
    return {
      ...app,
      active: isForeground,
      minimized: !isForeground,
      fullscreen: isForeground ? true : app.fullscreen,
    };
  });
};

const ipadDefaultSize = () => {
  const w = typeof window !== "undefined" ? window.innerWidth : 1024;
  const h = typeof window !== "undefined" ? window.innerHeight : 768;
  return {
    width: Math.min(920, Math.max(640, w - 100)),
    height: Math.min(680, Math.max(480, h - 140)),
  };
};

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

        const form = getOsFormFactor();
        if (form === "ios") {
          opened.fullscreen = true;
          opened.minimized = false;
        } else if (form === "ipados") {
          const size = ipadDefaultSize();
          opened.fullscreen = false;
          opened.width = action.config?.width ?? size.width;
          opened.height = action.config?.height ?? size.height;
          opened.x = action.config?.x ?? 0;
          opened.y = action.config?.y ?? 0;
        }

        const backgrounded = state.applications.map((app) => ({
          ...app,
          active: false,
          ...(form === "ios" ? { minimized: true } : {}),
        }));

        return {
          ...state,
          applications: [...backgrounded, opened],
          launchpad: false,
          appSwitcher: false,
        };
      }

      if (App && activeAppWindow) {
        const order = nextStackOrder(state.applications);
        const apps = state.applications.map((app) => ({
          ...app,
          active: app.name === action.appName,
          stackOrder: app.name === action.appName ? order : app.stackOrder,
          minimized: app.name === action.appName ? false : app.minimized,
          relatedProject:
            app.name === action.appName &&
            action.config?.relatedProject !== undefined
              ? action.config.relatedProject
              : app.relatedProject,
        }));

        return {
          ...state,
          applications: applyIosForeground(
            apps,
            apps.find((a) => a.name === action.appName)?.id ?? null
          ),
          launchpad: false,
          appSwitcher: false,
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
        ...state.applications.filter((app) => app.id !== action.appId),
      ];

      return {
        ...state,
        applications: newState,
      };
    }

    case ActionType.TOGGLE_APP: {
      const order = nextStackOrder(state.applications);
      const apps = state.applications.map((app) => ({
        ...app,
        active: app.id === action.appId,
        stackOrder: app.id === action.appId ? order : app.stackOrder,
        minimized: app.id === action.appId ? false : app.minimized,
      }));

      return {
        ...state,
        applications: applyIosForeground(apps, action.appId),
        launchpad: false,
        appSwitcher: false,
      };
    }

    case ActionType.HIDE_APP: {
      const newState = [
        ...state.applications.map((app) => ({
          ...app,
          minimized: app.id === action.appId ? true : app.minimized,
          fullscreen: app.id === action.appId ? false : app.fullscreen,
          active: app.id === action.appId ? false : app.active,
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
        appSwitcher: false,
      };
    }
    case ActionType.TOGGLE_APP_SWITCHER: {
      const open =
        typeof action.open === "boolean" ? action.open : !state.appSwitcher;
      return {
        ...state,
        appSwitcher: open,
        launchpad: open ? false : state.launchpad,
      };
    }
    case ActionType.GO_HOME: {
      return {
        ...state,
        appSwitcher: false,
        launchpad: false,
        applications: state.applications.map((app) => ({
          ...app,
          minimized: true,
          active: false,
          fullscreen: isMobileShell() ? false : app.fullscreen,
        })),
      };
    }
    default:
      throw new Error();
  }
};
