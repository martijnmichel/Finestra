import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { ApplicationWindow } from "../components/application/ApplicationWindow";
import BottomDock from "../components/BottomDock";
import Header from "../components/Header";
import { LaunchPad } from "../components/Launchpad";
import TopBar from "../components/TopBar";
import { useTheme } from "../hooks/useTheme";
import { useWindowManager } from "../services/WindowManager";
import { applications } from "../store/atoms/applications";

const Home = () => {
  const apps = useRecoilValue(applications);
  const { startApp } = useWindowManager();

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
        <ApplicationWindow key={`app-${index}`} {...app}></ApplicationWindow>
      ))}

      <LaunchPad />

      <BottomDock />
      <TopBar />
    </main>
  );
};

export default Home;
