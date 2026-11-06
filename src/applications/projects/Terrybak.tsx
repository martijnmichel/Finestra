import React from "react";
import { Application } from "../application";
import { AppIcon } from "../../components/application/AppIcon";
import Icon from "../../icons/terrybak.png";
import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";

export class Terrybak extends Application {
  static appName = "Terrybak";
  public name = "Terrybak";
  static icon = () => <AppIcon src={Icon} alt="Terrybak" squircle />;
  static category = "project";

  component = () => TerrybakApp();

  constructor() {
    super();
  }
}

export const TerrybakApp = () => {
  return <ProjectTemplate {...projects().terrybak} projectKey="terrybak" />;
};
