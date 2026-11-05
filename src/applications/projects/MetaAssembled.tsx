import React from "react";
import { Application } from "../application";
import { AppIcon } from "../../components/application/AppIcon";
import Icon from "../../icons/meta.jpg";
import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";

export class MetaAssembled extends Application {
  static appName = "MetaAssembled";
  public name = "MetaAssembled";
  static icon = () => <AppIcon src={Icon} alt="MetaAssembled" squircle />;
  static category = "project";

  component = () => MetaAssembledApp();

  constructor() {
    super();
  }
}

export const MetaAssembledApp = () => {
  return <ProjectTemplate {...projects().metaAssembled} projectKey="metaAssembled" />;
};
