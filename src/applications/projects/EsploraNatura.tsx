import React from "react";
import { Application } from "../application";
import { AppIcon } from "../../components/application/AppIcon";
import Icon from "../../icons/esploranatura.png";
import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";

export class EsploraNatura extends Application {
  static appName = "EsploraNatura";
  public name = "Esplora Natura";
  static icon = () => <AppIcon src={Icon} alt="Esplora Natura" squircle />;
  static category = "project";

  component = () => EsploraNaturaApp();

  constructor() {
    super();
  }
}

export const EsploraNaturaApp = () => {
  return (
    <ProjectTemplate
      {...projects().esploraNatura}
      projectKey="esploraNatura"
    />
  );
};
