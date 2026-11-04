import React from "react";
import { Application } from "../application";
import Icon from "../../icons/classroom.png";
import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";

export class Classroom extends Application {
  public name = "Classroom";
  static icon = () => (
    <div className="p-[7px]">
      <img src={Icon} className="rounded-[17%]" alt="Logo" />
    </div>
  );
  static category = "project";

  component = () => ClassroomApp();

  constructor() {
    super();
  }
}

export const ClassroomApp = () => {
  return <ProjectTemplate {...projects().classroom} />;
};
