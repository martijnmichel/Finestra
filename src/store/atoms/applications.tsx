import React from "react";
import { atom } from "recoil";
import { Apps } from "../../applications";
import { v4 } from "uuid";
import { Icon } from "@iconify/react";

export class Application {
  active = true;
  visible = true;
  public name = "Default App";
  id = v4();

  width = 800;
  height = 600;

  x = 0;
  y = 0;

  public static category = "default";

  titleBar = false;

  static icon: (() => React.ReactNode) | undefined = () => (
    <Icon icon="fxemoji:redapple" />
  );

  navigation = (): any[] => [];

  component: (() => React.ReactNode) | undefined;
}

export const applications = atom<Application[]>({
  key: "applicationState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
