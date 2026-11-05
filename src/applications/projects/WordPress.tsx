import React from "react";
import { Application } from "../application";
import { AppIcon } from "../../components/application/AppIcon";

import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";
import Icon from "../../icons/wordpress.png";

export class WordPress extends Application {
  static appName = "WordPress";
  public name = "WordPress";
  static icon = () => <AppIcon src={Icon} alt="WordPress" squircle />;
  static category = "project";

  component = () => WordPressApp();

  constructor() {
    super();
  }
}

export const WordPressApp = () => {
  return <ProjectTemplate {...projects().sites} projectKey="sites" />;
};
