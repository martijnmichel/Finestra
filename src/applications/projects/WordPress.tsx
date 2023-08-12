import React from "react";
import { Application } from "../application";

import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";
import Icon from "../../icons/wordpress.png";

export class WordPress extends Application {
  public name = "WordPress";
  static icon = () => (
    <div className="p-[7px]">
      <div className="p-[5px] rounded-[17%] bg-white aspect-square">
        <img src={Icon} className="" alt="Logo" />
      </div>
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
