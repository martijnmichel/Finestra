import React from "react";
import { Application } from "../../store/atoms/applications";

import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";
import { Icon } from "@iconify/react";

export class ECBaseBestelNext extends Application {
  public name = "ECBaseBestelNext";
  static icon = () => (
    <div className="p-[7px]">
      <Icon className="rounded-[17%]" icon="logos:nextjs-icon" />
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
