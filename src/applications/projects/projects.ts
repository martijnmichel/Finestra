export type Project = {
  title: string;
  desc: string;
};

export const projects: { [x: string]: Project } = {
  sonid: {
    title: "Learn music theory with Sonid",
    desc: "an app to learn and practice music theory in a fun and structured manner!",
  },
};
