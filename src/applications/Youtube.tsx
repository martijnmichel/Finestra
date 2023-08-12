import React from "react";
import { Application } from "./application";
import Icon from "../icons/youtube.png";

export class Youtube extends Application {
  public name = "Youtube";
  static icon = () => <img src={Icon} alt="Logo" />;
  public category = "default";

  width = 1280;
  height = 720;

  component = () => YoutubeApp();

  constructor() {
    super();
  }
}

export const YoutubeApp = () => {
  return (
    <iframe
      width="1280"
      height="720"
      src="https://www.youtube.com/embed/iNu_KnfXVxk"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ></iframe>
  );
};
