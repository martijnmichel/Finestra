import React from "react";
import { Application } from "../application";
import { AppIcon } from "../../components/application/AppIcon";
import Icon from "../../icons/toka.png";
import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";

export class Toka extends Application {
  static appName = "Toka";
  public name = "Toka";
  static icon = () => <AppIcon src={Icon} alt="Toka" squircle />;
  static category = "project";

  component = () => TokaApp();

  constructor() {
    super();
  }
}

export const TokaApp = () => {
  return <ProjectTemplate {...projects().toka} projectKey="toka" />;
};
