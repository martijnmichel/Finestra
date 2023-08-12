import React, { useEffect } from "react";
import { Applications } from "../applications";
import { AppButton } from "./application/AppButton";
import { filter } from "lodash";
import { useMediaQuery, useWindowSize } from "usehooks-ts";
import { useAppDispatch, useAppState } from "../store";
import { toggleLaunchpad } from "../store/actions/toggleLaunchPad";
import { startApp } from "../store/actions/startApp";

export const LaunchPad = () => {
  const { launchpad } = useAppState();
  const dispatch = useAppDispatch();

  const { width, height } = useWindowSize();

  useEffect(() => {
    const lp = document.querySelector<HTMLDivElement>("#launchpad");
    if (launchpad && lp) {
      lp.style.zIndex = "50";
    } else if (!launchpad && lp) {
      setTimeout(() => {
        lp.style.zIndex = "-10";
      }, 500);
    }
  }, [launchpad]);

  return (
    <div
      id="launchpad"
      className="fixed inset-0 w-screen h-screen overflow-y-auto overflow-x-visible"
    >
      <div
        onClick={() => toggleLaunchpad()(dispatch)}
        className={`fixed inset-0 bg-black/70 transition-all duration-500 backdrop-blur-2xl ${
          launchpad ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      <div
        className={`container max-w-80 pointer-events-none p-10 lg:p-20 mx-auto relative transition-all origin-center duration-300 ${
          launchpad ? "scale-[1] opacity-100 delay-300" : " scale-[2] opacity-0"
        }`}
      >
        <div className="flex flex-col">
          <h2 className="text-h2 text-zinc-50 blur-xs mb-5">Apps</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 justify-center">
            {filter(Applications, (a) => a.category === "default")?.map(
              (app, index) => {
                return (
                  <AppButton
                    size={width > 768 ? "120px" : "80px"}
                    key={`app-button-${index}`}
                    appIcon={app.icon()}
                    appName={app.name}
                    onClick={() => startApp(app.name)(dispatch)}
                  />
                );
              }
            )}
          </div>

          <h2 className="text-h2 text-zinc-50 blur-xs mb-5 mt-20">Projects</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
            {filter(Applications, (a) => a.category === "project")?.map(
              (app, index) => {
                return (
                  <AppButton
                    size={width > 768 ? "120px" : "80px"}
                    key={`app-button-${index}`}
                    appIcon={app.icon()}
                    appName={app.name}
                    onClick={() => startApp(app.name)(dispatch)}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
