import React from "react";
import { Application } from "../store/atoms/applications";
import Icon from "../icons/settings.png";

export class ExampleApp extends Application {
  public name = "Settings";
  static icon = () => <img src={Icon} alt="Logo" />;
  public category = "default";

  component = () => SettingsApp();

  constructor() {
    super();
  }
}

export const SettingsApp = () => {
  return <h1>Settings</h1>;
};
