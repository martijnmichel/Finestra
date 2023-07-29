import React from "react";
import { Project } from "./projects";

export const ProjectTemplate = ({ title, desc }: Project) => {
  return (
    <section className="p-5">
      <h1 className="text-h2">{title}</h1>
      <p className="subtitle">{desc}</p>
    </section>
  );
};
