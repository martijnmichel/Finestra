import React, { useEffect, useState } from "react";
import { useWindowManager } from "../services/WindowManager";
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
  Apple,
  BatteryCharging,
  Bluetooth,
  Flag,
  Search,
  Settings2,
  Wifi,
} from "lucide-react";
import { Dialog, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
const TopBar = () => {
  const { activeApp } = useWindowManager();
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
      className={`fixed z-40 top-0 right-0 left-0 flex transform transition-all ${
        launchpad ? "-translate-y-28" : ""
      }`}
    >
      <div className="absolute inset-0 mx-auto bg-white/70 w-screen blur-50 z-0"></div>

      <div className="flex w-full z-1 relative items-center">
        <div className="topnav-button">
          <Apple className="size-4" />
        </div>

        <div className="flex-grow h-full flex gap-2">
          <div id="active-app-navigation--portal" />
        </div>

        <div className="flex-shrink flex px-2">
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
                        className="w-[32px] h-[32px] object-contain"
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
            <DialogTrigger>
              <button className="topnav-button focus:outline-none">
                <Search />
              </button>
            </DialogTrigger>
            <DialogContent className="fixed top-[20vh] left-1/2 -translate-x-1/2 bg-popover backdrop-blur-xl w-[280px] md:w-[420px] rounded-2xl">
              <DialogHeader className="sr-only">
                <DialogTitle>Search</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-2 relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-6" />
                <input
                  placeholder="Search"
                  className="w-full pl-10 placeholder:text-muted-foreground placeholder:font-medium text-xl h-[48px] rounded-2xl"
                />
              </div>
            </DialogContent>
          </Dialog>
          <button className="topnav-button">
            <Settings2 />
          </button>
        </div>

        <div className="text-sm px-2">
          {dayjs(dateTime).format("ddd D MMM HH:mm")}
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
