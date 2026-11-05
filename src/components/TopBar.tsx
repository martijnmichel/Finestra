import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { useAppContext, useAppState } from "../store";
import { Dialog, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { AppleMenu } from "./topbar/AppleMenu";
import { ControlCenter } from "./topbar/ControlCenter";
import {
  BatteryMenu,
  BluetoothMenu,
  ClockMenu,
  LanguageMenu,
  WifiMenu,
} from "./topbar/StatusMenus";
import { useLocalStorage } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { storageKey } from "@/lib/os";
import { startApp } from "@/store/actions/startApp";
import SiriIcon from "../icons/siri.png";

const TopBar = () => {
  const { launchpad } = useAppState();
  const { dispatch } = useAppContext();
  const [dateTime, setDateTime] = useState<number>(Date.now());
  const [focus] = useLocalStorage(storageKey("focus"), false);
  const [brightness] = useLocalStorage(storageKey("brightness"), 85);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => setDateTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--display-brightness",
      String(Math.max(0.35, brightness / 100))
    );
  }, [brightness]);

  return (
    <nav
      className={cn(
        "os-chrome fixed z-40 top-0 right-0 left-0 flex h-[25px] items-center transform transition-all",
        launchpad && "-translate-y-28"
      )}
      style={{ color: "var(--menubar-fg)" }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "var(--menubar-bg)",
          backdropFilter:
            "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
          WebkitBackdropFilter:
            "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
          borderBottom: "0.5px solid rgba(0,0,0,0.08)",
        }}
      />

      <div className="relative z-[1] flex w-full h-full items-center px-1.5">
        <AppleMenu />

        <div className="flex-grow h-full flex items-center min-w-0">
          <div
            id="active-app-navigation--portal"
            className="flex items-center h-full"
          />
        </div>

        <div className="flex-shrink-0 flex items-center gap-0.5 px-1">
          {focus ? (
            <span
              className="topnav-button pointer-events-none opacity-90"
              title={t("common:menuBar.focusDoNotDisturb")}
              aria-hidden
            >
              <span className="os-chrome-xs">☾</span>
            </span>
          ) : null}

          <LanguageMenu />
          <BatteryMenu />
          <BluetoothMenu />
          <WifiMenu />

          <Dialog modal={false}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="topnav-button focus:outline-none"
                aria-label={t("common:menuBar.spotlight")}
              >
                <Search />
              </button>
            </DialogTrigger>
            <DialogContent className="fixed top-[20vh] left-1/2 -translate-x-1/2 bg-popover backdrop-blur-xl w-[280px] md:w-[420px] rounded-2xl border border-black/10 shadow-2xl p-2 z-[80]">
              <DialogHeader className="sr-only">
                <DialogTitle>{t("common:menuBar.spotlight")}</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-2 relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-5 text-[#86868b]" />
                <input
                  placeholder={t("common:menuBar.spotlight")}
                  className="os-chrome w-full pl-10 placeholder:text-[#86868b] font-[400] text-[15px] tracking-[-0.2px] h-[40px] rounded-xl bg-transparent outline-none"
                />
              </div>
            </DialogContent>
          </Dialog>

          <button
            type="button"
            className="topnav-button focus:outline-none"
            aria-label={t("common:menuBar.siri")}
            title={t("common:menuBar.siri")}
            onClick={() => startApp("Siri")(dispatch)}
          >
            <img
              src={SiriIcon}
              alt=""
              className="size-3.5 object-contain"
              draggable={false}
            />
          </button>

          <ControlCenter />
        </div>

        <ClockMenu dateTime={dateTime} />
      </div>
    </nav>
  );
};

export default TopBar;
