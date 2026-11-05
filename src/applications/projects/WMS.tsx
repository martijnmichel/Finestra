import React from "react";
import { Application } from "../application";
import Icon from "../../icons/wms.png";
import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";

export class WMS extends Application {
  static appName = "WMS";
  public name = "WMS";
  static icon = () => (
    <div className="p-[7px]">
      <img src={Icon} className="rounded-[17%]" alt="Logo" />
    </div>
  );
  static category = "project";

  component = () => WMSApp();

  constructor() {
    super();
  }
}

export const WMSApp = () => {
  return <ProjectTemplate {...projects().wms} projectKey="wms" />;
};
