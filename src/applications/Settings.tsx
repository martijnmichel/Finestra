import React from "react";
import { Application } from "../store/atoms/applications";
import Icon from "../icons/settings.png";
import Screenshot from "../icons/screenshot.png";

export class Settings extends Application {
  public name = "Settings";
  static icon = () => <img src={Icon} alt="Logo" />;
  public category = "default";

  width = 650;

  component = () => SettingsApp();

  constructor() {
    super();
  }
}

export const SettingsApp = () => {
  return (
    <div className="w-full h-full overflow-y-auto rounded-b-lg">
      <img className="w-full h-auto" src={Screenshot} alt="Logo" />
    </div>
  );
};
