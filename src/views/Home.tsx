import React, { useEffect, useRef } from "react";
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
import { startApp } from "@/store/actions/startApp";

const SIRI_SEEN_KEY = storageKey("siri-seen");

const Home = () => {
  const {
    state: { applications },
    dispatch,
  } = useAppContext();
  const { theme } = useTheme();
  const { isMobileShell, isMacos, isIpados, isIos } = useOsFormFactor();
  const [brightness] = useLocalStorage(storageKey("brightness"), 85);
  const siriIntroScheduled = useRef(false);

  // iPhone has no menubar/StatusStrip — still apply display brightness.
  useEffect(() => {
    if (!isIos) return;
    document.documentElement.style.setProperty(
      "--display-brightness",
      String(Math.max(0.35, brightness / 100))
    );
  }, [isIos, brightness]);

  // First visit: open Siri after a short delay (once per browser).
  useEffect(() => {
    if (siriIntroScheduled.current) return;
    if (typeof window === "undefined") return;
    if (localStorage.getItem(SIRI_SEEN_KEY) === "1") return;

    siriIntroScheduled.current = true;
    const timer = window.setTimeout(() => {
      localStorage.setItem(SIRI_SEEN_KEY, "1");
      startApp("Siri")(dispatch);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [dispatch]);

  // iPhone: no mocked status bar — the device draws it; we only respect safe-area.
  const topChrome = isMacos ? (
    <TopBar />
  ) : isIpados ? (
    <IpadMenuBar />
  ) : null;

  const shell = (
    <>
      {/* Wallpaper icons behind windows */}
      {isMobileShell ? <HomeScreen /> : <Desktop />}

      {applications.map((app) => (
        <ApplicationWindow key={app.id} {...app} />
      ))}

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
