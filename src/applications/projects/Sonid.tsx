import React from "react";
import { Application } from "../../store/atoms/applications";
import Icon from "../../icons/sonid.png";
import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";

export class Sonid extends Application {
  public name = "Sonid";
  static icon = () => (
    <div className="p-3">
      <img src={Icon} className="rounded-[17%]" alt="Logo" />
    </div>
  );
  static category = "project";

  component = () => SonidApp();

  constructor() {
    super();
  }
}

export const SonidApp = () => {
  return <ProjectTemplate {...projects.sonid} />;
};
