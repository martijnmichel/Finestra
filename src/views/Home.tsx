import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ApplicationWindow } from "../components/application/ApplicationWindow";
import BottomDock from "../components/BottomDock";
import Header from "../components/Header";
import { LaunchPad } from "../components/Launchpad";
import TopBar from "../components/TopBar";
import { useTheme } from "../hooks/useTheme";
import { useWindowManager } from "../services/WindowManager";
import { applications } from "../store/atoms/applications";
import { Desktop } from "../components/Desktop";

const Home = () => {
  const [apps] = useRecoilState(applications);
  const { startApp } = useWindowManager();

  //useEffect(() => console.log(apps), [apps]);

  useEffect(() => {
    startApp("About");
  }, []);

  const { background } = useTheme();

  return (
    <main
      className="flex-grow"
      style={{
        background: `url(${background()}) no-repeat center center`,
        backgroundSize: "100% 100%",
      }}
    >
      {apps.map((app, index) => (
        <ApplicationWindow
          key={`app-window-${index}${app.name}`}
          {...app}
        ></ApplicationWindow>
      ))}

      <Desktop />

      <LaunchPad />

      <BottomDock />
      <TopBar />
    </main>
  );
};

export default Home;
