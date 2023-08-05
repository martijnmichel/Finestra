import React from "react";
import { atom } from "recoil";
import { Applications } from "../../applications";
import { v4 } from "uuid";
import { Icon } from "@iconify/react";
import { each } from "lodash";

export type AppConfig = {
  minimized?: boolean;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
};

export class Application {
  active = true; // the activated/focused app window
  minimized = false; // minimized/unminimized
  public name = "Default App";
  id = v4();

  multiple = false;

  width = window.innerWidth > 900 ? 800 : window.innerWidth - 100;
  height = window.innerHeight > 800 ? 600 : window.innerHeight - 100;

  x = 0;
  y = 0;

  static category = "default";

  titleBar = false;

  static icon: (() => React.ReactNode) | undefined = () => (
    <Icon icon="fxemoji:redapple" />
  );

  navigation = (): any[] => [];

  component: (() => React.ReactNode) | undefined;

  constructor(config?: AppConfig) {
    if (config?.minimized) this.minimized = config?.minimized;
    if (config?.width) this.width = config?.width;
    if (config?.height) this.height = config?.height;
    if (config?.x) this.x = config?.x;
    if (config?.y) this.y = config?.y;
  }
}

export const applications = atom<Application[]>({
  key: "applicationState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
