import React from "react";
import { Application } from "../application";
import Icon from "../../icons/directusmobile.png";
import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";

export class DirectusMobile extends Application {
  public name = "DirectusMobile";
  static icon = () => (
    <div className="p-[7px]">
      <img src={Icon} className="rounded-[17%]" alt="Logo" />
    </div>
  );
  static category = "project";

  component = () => DirectusMobileApp();

  constructor() {
    super();
  }
}

export const DirectusMobileApp = () => {
  return <ProjectTemplate {...projects().directusMobile} />;
};
