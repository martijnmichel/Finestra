import React from "react";
import { Application } from "../application";
import { AppIcon } from "../../components/application/AppIcon";
import Icon from "../../icons/directusmobile.png";
import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";

export class DirectusMobile extends Application {
  static appName = "DirectusMobile";
  public name = "DirectusMobile";
  static icon = () => <AppIcon src={Icon} alt="DirectusMobile" />;
  static category = "project";

  component = () => DirectusMobileApp();

  constructor() {
    super();
  }
}

export const DirectusMobileApp = () => {
  return <ProjectTemplate {...projects().directusMobile} projectKey="directusMobile" />;
};
