import React from "react";
import { Application } from "../application";
import { AppIcon } from "../../components/application/AppIcon";

import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";
import Icon from "../../icons/demo-agf.webp";

export class ECBaseBestelNext extends Application {
  static appName = "ECBaseBestelNext";
  public name = "ECBaseBestelNext";
  static icon = () => <AppIcon src={Icon} alt="ECBaseBestelNext" squircle />;
  static category = "project";

  component = () => ECBaseBestelApp();

  constructor() {
    super();
  }
}

export const ECBaseBestelApp = () => {
  return <ProjectTemplate {...projects().starterTemplateNext} projectKey="starterTemplateNext" />;
};
