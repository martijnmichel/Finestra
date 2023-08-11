import React from "react";
import { Application } from "../../store/atoms/applications";
import Icon from "../../icons/wms.png";
import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";

export class WMS extends Application {
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
  return <ProjectTemplate {...projects().wms} />;
};
