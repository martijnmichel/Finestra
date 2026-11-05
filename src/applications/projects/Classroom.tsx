import React from "react";
import { Application } from "../application";
import { AppIcon } from "../../components/application/AppIcon";
import Icon from "../../icons/classroom.png";
import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";

export class Classroom extends Application {
  static appName = "Classroom";
  public name = "Classroom";
  static icon = () => <AppIcon src={Icon} alt="Classroom" squircle />;
  static category = "project";

  component = () => ClassroomApp();

  constructor() {
    super();
  }
}

export const ClassroomApp = () => {
  return <ProjectTemplate {...projects().classroom} projectKey="classroom" />;
};
