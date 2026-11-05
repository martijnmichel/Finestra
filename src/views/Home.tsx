import React, { useEffect } from "react";
import { ApplicationWindow } from "../components/application/ApplicationWindow";
import BottomDock from "../components/BottomDock";
import { LaunchPad } from "../components/Launchpad";
import TopBar from "../components/TopBar";
import { useTheme } from "../hooks/useTheme";
import { Desktop } from "../components/Desktop";
import { HomeScreen } from "../components/HomeScreen";
import { AppSwitcher } from "../components/AppSwitcher";
import { AppLibrary } from "../components/AppLibrary";
import { IpadMenuBar } from "../components/IpadMenuBar";
import { useAppContext } from "../store";
import { useOsFormFactor } from "../hooks/useOsFormFactor";
import { ShellGestureProvider } from "../components/shell/ShellGestureContext";
import { useLocalStorage } from "usehooks-ts";
import { storageKey } from "@/lib/os";

const Home = () => {
  const {
    state: { applications },
  } = useAppContext();
  const { theme } = useTheme();
  const { isMobileShell, isMacos, isIpados, isIos } = useOsFormFactor();
  const [brightness] = useLocalStorage(storageKey("brightness"), 85);

  // iPhone has no menubar/StatusStrip — still apply display brightness.
  useEffect(() => {
    if (!isIos) return;
    document.documentElement.style.setProperty(
      "--display-brightness",
      String(Math.max(0.35, brightness / 100))
    );
  }, [isIos, brightness]);

  // iPhone: no mocked status bar — the device draws it; we only respect safe-area.
  const topChrome = isMacos ? (
    <TopBar />
  ) : isIpados ? (
    <IpadMenuBar />
  ) : null;

  const shell = (
    <>
      {applications.map((app) => (
        <ApplicationWindow key={app.id} {...app} />
      ))}

      {isMobileShell ? <HomeScreen /> : <Desktop />}

      {isMacos ? <LaunchPad /> : null}
      {isMobileShell ? (
        <>
          <AppLibrary />
          <AppSwitcher />
        </>
      ) : null}

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[35]"
        style={{
          background:
            "rgba(0,0,0, calc((1 - var(--display-brightness, 1)) * 0.9))",
        }}
      />

      <BottomDock />
      {topChrome}
    </>
  );

  return (
    <main
      className="flex-grow"
      style={{
        background: `url(${theme.background}) no-repeat center center`,
        backgroundSize: "100% 100%",
      }}
    >
      {isMobileShell ? (
        <ShellGestureProvider>{shell}</ShellGestureProvider>
      ) : (
        shell
      )}
    </main>
  );
};

export default Home;
