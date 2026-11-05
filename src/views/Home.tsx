import React from "react";
import { ApplicationWindow } from "../components/application/ApplicationWindow";
import BottomDock from "../components/BottomDock";
import { LaunchPad } from "../components/Launchpad";
import TopBar from "../components/TopBar";
import { useTheme } from "../hooks/useTheme";
import { Desktop } from "../components/Desktop";
import { HomeScreen } from "../components/HomeScreen";
import { AppSwitcher } from "../components/AppSwitcher";
import { StatusStrip } from "../components/StatusStrip";
import { useAppContext } from "../store";
import { useOsFormFactor } from "../hooks/useOsFormFactor";

const Home = () => {
  const {
    state: { applications },
  } = useAppContext();
  const { theme } = useTheme();
  const { isMobileShell, isMacos } = useOsFormFactor();

  return (
    <main
      className="flex-grow"
      style={{
        background: `url(${theme.background}) no-repeat center center`,
        backgroundSize: "100% 100%",
      }}
    >
      {applications.map((app) => (
        <ApplicationWindow key={app.id} {...app} />
      ))}

      {isMobileShell ? <HomeScreen /> : <Desktop />}

      {isMacos ? <LaunchPad /> : <AppSwitcher />}

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[35]"
        style={{
          background:
            "rgba(0,0,0, calc((1 - var(--display-brightness, 1)) * 0.9))",
        }}
      />

      <BottomDock />
      {isMacos ? <TopBar /> : <StatusStrip />}
    </main>
  );
};

export default Home;
