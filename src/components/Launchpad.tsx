import React, { useEffect, useState } from "react";
import { Applications } from "../applications";
import { AppButton } from "./application/AppButton";
import { filter } from "lodash";
import { useMediaQuery, useWindowSize } from "usehooks-ts";
import { useAppDispatch, useAppState } from "../store";
import { toggleLaunchpad } from "../store/actions/toggleLaunchPad";
import { startApp } from "../store/actions/startApp";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export const LaunchPad = () => {
  const { launchpad } = useAppState();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
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
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 w-[300px] flex items-center justify-center -translate-y-full opacity-0 transition-all duration-500 delay-300",
          launchpad && "translate-y-0 opacity-100"
        )}
      >
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-white/30" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="os-chrome w-full pr-2 pl-8 py-[5px] rounded-[8px] border border-white/25 bg-white/10 focus:outline-none text-white/90 text-[13px] tracking-[-0.08px] focus:ring-1 focus:ring-white/35 placeholder:text-white/45"
        />
      </div>

      <div
        className={`container pointer-events-none p-14 lg:p-20 mx-auto relative transition-all origin-center duration-300 ${
          launchpad ? "scale-[1] opacity-100 delay-300" : " scale-[2] opacity-0"
        }`}
      >
        <div className="flex flex-col">
          <h2 className="os-chrome-em mb-5 text-[22px] tracking-[-0.3px] text-white/95">
            Apps
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-y-10 justify-center">
            {filter(
              Applications,
              (a) =>
                a.category === "default" &&
                a.appName.toLowerCase().includes(search.toLowerCase())
            )?.map((app, index) => {
              return (
                <AppButton
                  size={width > 768 ? "120px" : "80px"}
                  key={`app-button-${index}`}
                  appIcon={app.icon()}
                  appName={app.appName}
                  onClick={() => startApp(app.appName)(dispatch)}
                />
              );
            })}
          </div>

          <h2 className="os-chrome-em mb-5 mt-20 text-[22px] tracking-[-0.3px] text-white/95">
            Projects
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-y-10">
            {filter(
              Applications,
              (a) =>
                a.category === "project" &&
                a.appName.toLowerCase().includes(search.toLowerCase())
            )?.map((app, index) => {
              return (
                <AppButton
                  size={width > 768 ? "120px" : "80px"}
                  key={`app-button-${index}`}
                  appIcon={app.icon()}
                  appName={app.appName}
                  onClick={() => startApp(app.appName)(dispatch)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
