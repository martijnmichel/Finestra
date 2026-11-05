import React from "react";
import { Application } from "../application";
import { AppIcon } from "../../components/application/AppIcon";
import Icon from "../../icons/capo.png";
import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";

export class Capo extends Application {
  static appName = "Capo";
  public name = "Capo";
  static icon = () => <AppIcon src={Icon} alt="Capo" />;
  static category = "project";

  component = () => CapoApp();

  constructor() {
    super();
  }
}

export const CapoApp = () => {
  return <ProjectTemplate {...projects().capo} projectKey="capo" />;
};
