import React from "react";
import { Application } from "../application";
import { AppIcon } from "../../components/application/AppIcon";

import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";
import Icon from "../../icons/expo-app.png";

export class ECBaseBestelExpo extends Application {
  static appName = "ECBaseBestelExpo";
  public name = "ECBaseBestelExpo";
  static icon = () => <AppIcon src={Icon} alt="ECBaseBestelExpo" />;
  static category = "project";

  component = () => ECBaseBestelApp();

  constructor() {
    super();
  }
}

export const ECBaseBestelApp = () => {
  return <ProjectTemplate {...projects().starterApp} projectKey="starterApp" />;
};
