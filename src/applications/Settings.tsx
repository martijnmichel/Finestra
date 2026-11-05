import React from "react";
import { AppIcon } from "../components/application/AppIcon";
import { Application } from "./application";
import Icon from "../icons/settings.png";
import { SettingsApp } from "./settings/SettingsApp";

export { SettingsApp };

export class Settings extends Application {
  static appName = "Settings";
  public name = "Settings";
  static icon = () => <AppIcon src={Icon} alt="Settings" />;
  public category = "default";

  titleBar = true;
  width = 780;
  height = 620;

  component = () => SettingsApp(this.id);

  constructor() {
    super();
  }
}
