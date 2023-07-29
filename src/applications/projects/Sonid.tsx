import React from "react";
import { Application } from "../../store/atoms/applications";
import Icon from "../../icons/settings.png";

export class Sonid extends Application {
  public name = "Sonid";
  static icon = () => <img src={Icon} alt="Logo" />;
  public static category = "project";

  component = () => SonidApp();

  constructor() {
    super();
  }
}

export const SonidApp = () => {
  return <h1>Sonid</h1>;
};
