import React from "react";
import { Application } from "../application";

import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";
import Icon from "../../icons/demo-agf.webp";

export class ECBaseBestelNext extends Application {
  public name = "ECBaseBestelNext";
  static icon = () => (
    <div className="p-[9px]">
      <div className="p-[5px] rounded-[17%] bg-white aspect-square">
        <img src={Icon} alt="Logo" />
      </div>
    </div>
  );
  static category = "project";

  component = () => ECBaseBestelApp();

  constructor() {
    super();
  }
}

export const ECBaseBestelApp = () => {
  return <ProjectTemplate {...projects().starterTemplateNext} />;
};
