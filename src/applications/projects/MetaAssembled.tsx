import React from "react";
import { Application } from "../application";
import Icon from "../../icons/meta.jpg";
import { ProjectTemplate } from "./ProjectTemplate";
import { projects } from "./projects";

export class MetaAssembled extends Application {
  public name = "MetaAssembled";
  static icon = () => (
    <div className="p-[7px]">
      <img src={Icon} className="rounded-[17%]" alt="Logo" />
    </div>
  );
  static category = "project";

  component = () => MetaAssembledApp();

  constructor() {
    super();
  }
}

export const MetaAssembledApp = () => {
  return <ProjectTemplate {...projects().metaAssembled} />;
};
