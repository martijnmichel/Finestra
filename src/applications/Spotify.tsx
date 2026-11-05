import React from "react";
import { AppIcon } from "../components/application/AppIcon";
import { Application } from "./application";
import Icon from "../icons/spotify.png";

export class Spotify extends Application {
  static appName = "Spotify";
  public name = "Spotify";
  static icon = () => <AppIcon src={Icon} alt="Spotify" />;
  public category = "default";

  component = () => SpotifyApp();

  constructor() {
    super();
  }
}

export const SpotifyApp = () => {
  return (
    <iframe
      style={{ borderRadius: 0 }}
      src="https://open.spotify.com/embed/artist/7guDJrEfX3qb6FEbdPA5qi?utm_source=generator"
      width="100%"
      height="652"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
};
