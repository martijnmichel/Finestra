import React from "react";
import { AppIcon } from "../components/application/AppIcon";
import { Application } from "./application";
import Icon from "../icons/spotify.png";
import { useOsFormFactor } from "@/hooks/useOsFormFactor";
import { PhoneAppChrome } from "@/components/application/PhoneAppChrome";
import { useAppDispatch } from "@/store";
import { goHome } from "@/store/actions/goHome";

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
  const { isIos } = useOsFormFactor();
  const dispatch = useAppDispatch();

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-black">
      {isIos ? (
        <PhoneAppChrome
          title="Spotify"
          onDone={() => goHome()(dispatch)}
          className="border-b-white/10 bg-black/80 text-white"
        />
      ) : null}
      <div className="relative min-h-0 flex-1">
        <iframe
          title="Spotify"
          className="absolute inset-x-0 top-0 w-full border-0"
          style={{
            height: isIos
              ? "calc(100% - max(32px, env(safe-area-inset-bottom, 0px)))"
              : "100%",
          }}
          src="https://open.spotify.com/embed/artist/7guDJrEfX3qb6FEbdPA5qi?utm_source=generator"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </div>
  );
};
