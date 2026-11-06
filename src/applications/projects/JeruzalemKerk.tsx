import React from "react";
import { Application } from "../application";
import { AppIcon } from "../../components/application/AppIcon";
import Icon from "../../icons/jeruzalemkerk.png";
import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";

export class JeruzalemKerk extends Application {
  static appName = "JeruzalemKerk";
  public name = "Jeruzalem Kerk";
  static icon = () => <AppIcon src={Icon} alt="Jeruzalem Kerk" squircle />;
  static category = "project";

  component = () => JeruzalemKerkApp();

  constructor() {
    super();
  }
}

export const JeruzalemKerkApp = () => {
  return (
    <ProjectTemplate {...projects().jeruzalemKerk} projectKey="jeruzalemKerk" />
  );
};
