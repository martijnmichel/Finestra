import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { useAppContext, useAppState } from "../store";
import { Dialog, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
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
import { openSiri } from "@/store/actions/siri";
import SiriIcon from "../icons/siri.png";

/**
 * iPadOS menu bar (iPadOS 26+ style): glass strip with active app menus +
 * clickable status items — closer to macOS than the iPhone status metrics bar.
 */
export const IpadMenuBar = () => {
  const { applications, launchpad, appSwitcher } = useAppState();
  const { dispatch } = useAppContext();
  const [dateTime, setDateTime] = useState(Date.now());
  const [focus] = useLocalStorage(storageKey("focus"), false);
  const [brightness] = useLocalStorage(storageKey("brightness"), 85);
  const { t } = useTranslation();

  const activeApp = applications.find((a) => a.active && !a.minimized);

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

  const hidden = launchpad || appSwitcher;

  return (
    <nav
      className={cn(
        "os-chrome fixed z-40 top-0 inset-x-0 flex items-center transition-transform duration-300",
        hidden && "-translate-y-full"
      )}
      style={{
        height: "var(--status-strip-height)",
        paddingTop: "var(--safe-area-top)",
        color: "var(--menubar-fg)",
      }}
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

      <div className="relative z-[1] flex w-full h-full items-center px-2 gap-1 min-h-[28px]">
        <div className="flex items-center gap-1 min-w-0 flex-1 overflow-hidden">
          {activeApp ? (
            <span className="os-chrome-em shrink-0 px-1.5 truncate max-w-[140px]">
              {activeApp.name}
            </span>
          ) : (
            <span className="os-chrome-em shrink-0 px-1.5 opacity-80">Home</span>
          )}
          <div
            id="active-app-navigation--portal"
            className="flex items-center h-full min-w-0 overflow-x-auto"
          />
        </div>

        <div className="flex-shrink-0 flex items-center gap-0.5">
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
          <WifiMenu />
          <BluetoothMenu />
          <BatteryMenu />

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
            <DialogContent className="fixed top-[18vh] left-1/2 -translate-x-1/2 bg-popover backdrop-blur-xl w-[min(420px,90vw)] rounded-2xl border border-black/10 shadow-2xl p-2 z-[80]">
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
            onClick={() => openSiri()(dispatch)}
          >
            <img
              src={SiriIcon}
              alt=""
              className="size-3.5 object-contain"
              draggable={false}
            />
          </button>

          <ControlCenter />
          <ClockMenu dateTime={dateTime} />
        </div>
      </div>
    </nav>
  );
};
