import React from "react";
import { Application } from "../store/atoms/applications";
import Icon from "../icons/spotify.png";

export class Spotify extends Application {
  public name = "Spotify";
  static icon = () => <img src={Icon} alt="Logo" />;
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
