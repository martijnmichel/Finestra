import React from "react";
import { Application } from "../application";
import Icon from "../../icons/capo.png";
import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";

export class Capo extends Application {
  public name = "Capo";
  static icon = () => (
    <div className="p-[7px]">
      <img src={Icon} className="rounded-[17%]" alt="Logo" />
    </div>
  );
  static category = "project";

  component = () => CapoApp();

  constructor() {
    super();
  }
}

export const CapoApp = () => {
  return <ProjectTemplate {...projects().capo} />;
};
