import React from "react";
type Project = {
  title: string;
};
export const ProjectTemplate = ({ title }: Project) => {
  return (
    <section>
      <h1>{title}</h1>
    </section>
  );
};
