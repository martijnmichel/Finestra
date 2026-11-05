import React from "react";
import { AppIcon } from "../components/application/AppIcon";
import { Application } from "./application";
import Icon from "../icons/youtube.png";
import { useOsFormFactor } from "@/hooks/useOsFormFactor";
import { PhoneAppChrome } from "@/components/application/PhoneAppChrome";
import { useAppDispatch } from "@/store";
import { goHome } from "@/store/actions/goHome";

export class Youtube extends Application {
  static appName = "Youtube";
  public name = "Youtube";
  static icon = () => <AppIcon src={Icon} alt="YouTube" />;
  public category = "default";

  width = Math.min(1280, window.innerWidth - 80);
  height = Math.min(720, window.innerHeight - 120);

  component = () => YoutubeApp();

  constructor() {
    super();
  }
}

export const YoutubeApp = () => {
  const { isIos } = useOsFormFactor();
  const dispatch = useAppDispatch();

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-black">
      {isIos ? (
        <PhoneAppChrome
          title="YouTube"
          onDone={() => goHome()(dispatch)}
          className="border-b-white/10 bg-black/80 text-white"
        />
      ) : null}
      <div className="relative min-h-0 flex-1 bg-black">
        <iframe
          title="YouTube video player"
          className="absolute inset-0 h-full w-full border-0"
          src="https://www.youtube.com/embed/iNu_KnfXVxk"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
};
