import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ApplicationWindow } from "../components/application/ApplicationWindow";
import BottomDock from "../components/BottomDock";
import { LaunchPad } from "../components/Launchpad";
import TopBar from "../components/TopBar";
import { useTheme } from "../hooks/useTheme";
import { Desktop } from "../components/Desktop";
import { useAppContext } from "../store";
import { startApp } from "../store/actions/startApp";

const Home = () => {
  const {
    state: { applications },
    dispatch,
  } = useAppContext();

  useEffect(() => console.log(applications), [applications]);

 

  const { theme } = useTheme();

  return (
    <main
      className="flex-grow"
      style={{
        background: `url(${theme.background}) no-repeat center center`,
        backgroundSize: "100% 100%",
      }}
    >
      {applications.map((app) => (
        <ApplicationWindow
          key={app.id}
          {...app}
        ></ApplicationWindow>
      ))}

      <Desktop />

      <LaunchPad />

      {/* Display brightness veil — below menu bar, above desktop/windows */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[35]"
        style={{
          background:
            "rgba(0,0,0, calc((1 - var(--display-brightness, 1)) * 0.9))",
        }}
      />

      <BottomDock />
      <TopBar />
    </main>
  );
};

export default Home;
