import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { map } from "lodash";
import { languages } from "../i18n";
import { useAppState } from "../store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  BatteryCharging,
  Bluetooth,
  Flag,
  Search,
  Settings2,
  Wifi,
} from "lucide-react";
import { Icon } from "@iconify/react";
import { Dialog, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";

const TopBar = () => {
  const { launchpad } = useAppState();
  const [dateTime, setDateTime] = useState<number>();

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const { i18n } = useTranslation();

  return (
    <nav
      className={`os-chrome fixed z-40 top-0 right-0 left-0 flex h-[25px] items-center transform transition-all ${
        launchpad ? "-translate-y-28" : ""
      }`}
      style={{ color: "var(--menubar-fg)" }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "var(--menubar-bg)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          borderBottom: "0.5px solid rgba(0,0,0,0.08)",
        }}
      />

      <div className="relative z-[1] flex w-full h-full items-center px-1.5">
        <div className="topnav-button">
          <Icon icon="ant-design:apple-filled" className="!size-[14px]" />
        </div>

        <div className="flex-grow h-full flex items-center min-w-0">
          <div
            id="active-app-navigation--portal"
            className="flex items-center h-full"
          />
        </div>

        <div className="flex-shrink-0 flex items-center gap-0.5 px-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="topnav-button focus:outline-none">
                <Flag />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {map(languages, (lang) => {
                return (
                  <DropdownMenuItem
                    key={`lang-picker-${lang.label}`}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                    }}
                    asChild
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className="w-[20px] h-[20px] object-contain"
                        src={lang.icon}
                      />
                      {lang.label}
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <button className="topnav-button">
            <BatteryCharging />
          </button>
          <button className="topnav-button">
            <Bluetooth />
          </button>
          <button className="topnav-button">
            <Wifi />
          </button>

          <Dialog modal={false}>
            <DialogTrigger asChild>
              <button className="topnav-button focus:outline-none">
                <Search />
              </button>
            </DialogTrigger>
            <DialogContent className="fixed top-[20vh] left-1/2 -translate-x-1/2 bg-popover backdrop-blur-xl w-[280px] md:w-[420px] rounded-2xl">
              <DialogHeader className="sr-only">
                <DialogTitle>Search</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-2 relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-5 text-[#86868b]" />
                <input
                  placeholder="Search"
                  className="os-chrome w-full pl-9 placeholder:text-[#86868b] font-[400] text-[15px] tracking-[-0.2px] h-[40px] rounded-xl bg-transparent outline-none"
                />
              </div>
            </DialogContent>
          </Dialog>
          <button className="topnav-button">
            <Settings2 />
          </button>
        </div>

        <div className="os-chrome px-2 tabular-nums text-[13px] tracking-[-0.08px]">
          {dayjs(dateTime).format("ddd D MMM HH:mm")}
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
