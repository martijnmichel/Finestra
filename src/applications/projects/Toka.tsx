import React from "react";
import { Application } from "../application";
import Icon from "../../icons/toka.png";
import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";

export class Toka extends Application {
  public name = "Toka";
  static icon = () => (
    <div className="p-[7px]">
      <img src={Icon} className="rounded-[17%]" alt="Logo" />
    </div>
  );
  static category = "project";

  component = () => TokaApp();

  constructor() {
    super();
  }
}

export const TokaApp = () => {
  return <ProjectTemplate {...projects().toka} />;
};
