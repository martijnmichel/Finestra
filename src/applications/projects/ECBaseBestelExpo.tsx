import React from "react";
import { Application } from "../../store/atoms/applications";

import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";
import { Icon } from "@iconify/react";

export class ECBaseBestelExpo extends Application {
  public name = "ECBaseBestelExpo";
  static icon = () => (
    <div className="p-[7px]">
      <Icon className="rounded-[17%]" icon="logos:expo-icon" />
    </div>
  );
  static category = "project";

  component = () => ECBaseBestelApp();

  constructor() {
    super();
  }
}

export const ECBaseBestelApp = () => {
  return <ProjectTemplate {...projects().starterApp} />;
};
