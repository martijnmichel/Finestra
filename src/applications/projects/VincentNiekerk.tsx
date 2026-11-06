import React from "react";
import { Application } from "../application";
import { AppIcon } from "../../components/application/AppIcon";
import Icon from "../../icons/vincentniekerk.png";
import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";

export class VincentNiekerk extends Application {
  static appName = "VincentNiekerk";
  public name = "Vincent Niekerk";
  static icon = () => <AppIcon src={Icon} alt="Vincent Niekerk" squircle />;
  static category = "project";

  component = () => VincentNiekerkApp();

  constructor() {
    super();
  }
}

export const VincentNiekerkApp = () => {
  return (
    <ProjectTemplate
      {...projects().vincentNiekerk}
      projectKey="vincentNiekerk"
    />
  );
};
