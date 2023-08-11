import React from "react";
import { Application } from "../../store/atoms/applications";

import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";
import { Icon } from "@iconify/react";

export class WordPress extends Application {
  public name = "WordPress";
  static icon = () => (
    <div className="p-[7px]">
      <Icon className="rounded-[17%]" icon="logos:wordpress-icon" />
    </div>
  );
  static category = "project";

  component = () => WordPressApp();

  constructor() {
    super();
  }
}

export const WordPressApp = () => {
  return <ProjectTemplate {...projects().sites} />;
};
