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

  useEffect(() => {
    startApp("About")(dispatch);
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
      {applications.map((app, index) => (
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
