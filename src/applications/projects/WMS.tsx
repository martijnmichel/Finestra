import React from "react";
import { Application } from "../application";
import { AppIcon } from "../../components/application/AppIcon";
import Icon from "../../icons/wms.png";
import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";

export class WMS extends Application {
  static appName = "WMS";
  public name = "WMS";
  static icon = () => <AppIcon src={Icon} alt="WMS" />;
  static category = "project";

  component = () => WMSApp();

  constructor() {
    super();
  }
}

export const WMSApp = () => {
  return <ProjectTemplate {...projects().wms} projectKey="wms" />;
};
