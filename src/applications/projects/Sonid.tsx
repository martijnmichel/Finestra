import React from "react";
import { Application } from "../application";
import { AppIcon } from "../../components/application/AppIcon";
import Icon from "../../icons/sonid.png";
import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";

export class Sonid extends Application {
  static appName = "Sonid";
  public name = "Sonid";
  static icon = () => <AppIcon src={Icon} alt="Sonid" squircle />;
  static category = "project";

  component = () => SonidApp();

  constructor() {
    super();
  }
}

export const SonidApp = () => {
  return <ProjectTemplate {...projects().sonid} projectKey="sonid" />;
};
