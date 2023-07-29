import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Applications } from "../applications";
import { useWindowManager } from "../services/WindowManager";
import { launchpad } from "../store/atoms/launchpad";
import { AppButton } from "./application/AppButton";
import { filter } from "lodash";

export const LaunchPad = () => {
  const [state, setState] = useRecoilState(launchpad);

  const { startApp } = useWindowManager();

  useEffect(() => {
    const lp = document.querySelector<HTMLDivElement>("#launchpad");
    if (state && lp) {
      lp.style.zIndex = "50";
    } else if (!state && lp) {
      setTimeout(() => {
        lp.style.zIndex = "-10";
      }, 500);
    }
  }, [state]);

  return (
    <div id="launchpad" className="fixed inset-0 w-screen h-screen">
      <div
        onClick={() => setState(false)}
        className={`absolute inset-0 bg-black/70 transition-all duration-500 backdrop-blur-2xl ${
          state ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      <div
        className={`container max-w-80 p-20 mx-auto relative transition-all origin-center duration-300 ${
          state ? "scale-[1] opacity-100 delay-300" : " scale-[2] opacity-0"
        }`}
      >
        <div className="flex flex-col">
          <h2 className="text-h2 text-zinc-50 blur-xs mb-5">Apps</h2>

          <div className="grid grid-cols-6">
            {filter(Applications, (a) => a.category === "default")?.map(
              (app, index) => {
                return (
                  <AppButton
                    size="120px"
                    key={`app-button-${index}`}
                    appIcon={app.icon()}
                    appName={app.name}
                    onClick={() => startApp(app.name)}
                  />
                );
              }
            )}
          </div>

          <h2 className="text-h2 text-zinc-50 blur-xs mb-5 mt-20">Projects</h2>

          <div className="grid grid-cols-6">
            {filter(Applications, (a) => a.category === "project")?.map(
              (app, index) => {
                return (
                  <AppButton
                    size="120px"
                    key={`app-button-${index}`}
                    appIcon={app.icon()}
                    appName={app.name}
                    onClick={() => startApp(app.name)}
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
