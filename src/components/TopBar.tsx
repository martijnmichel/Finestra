import React, { ReactNode, useEffect, useState } from "react";
import { useWindowManager } from "../services/WindowManager";
import { Icon } from "@iconify/react";
import { AppMenu, AppMenuItem } from "./application/AppMenu";
import { NavMenuItem } from "../applications";
import dayjs from "dayjs";
import { Menu, Popover } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { map } from "lodash";
import { languages } from "../i18n";
import { useAppState } from "../store";
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

  const TopBarMenu = ({
    icon,
    items,
  }: {
    icon: ReactNode;
    items: ReactNode[];
  }) => {
    return (
      <Popover className="relative">
        <Popover.Button>{icon}</Popover.Button>

        <Popover.Panel className="absolute z-10">
          <div className="grid grid-cols-2">
            {items.map((item, index) => {
              <Menu.Item key={`item-topnav-${index}`}>{item}</Menu.Item>;
            })}
          </div>

          <img src="/solutions.jpg" alt="" />
        </Popover.Panel>
      </Popover>
    );
  };

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
          <Icon className="" icon="ant-design:apple-filled" />
        </div>

        <div className="flex-grow h-full flex gap-2">
          <div id="active-app-navigation--portal" />
        </div>

        <div className="flex-shrink flex px-2">
          <AppMenu
            button={
              <button className="topnav-button">
                <img
                      className="w-[20px] h-[20px] object-contain"
                  src={languages?.[i18n.language as keyof typeof languages]?.icon}
                />
              </button>
            }
          >
            {map(languages, (lang) => {
              return (
                <AppMenuItem
                  key={`lang-picker-${lang.label}`}
                  label={
                    <div className="flex items-center gap-2">
                      <img
                        className="w-[32px] h-[32px] object-contain"
                        src={lang.icon}
                      />
                      {lang.label}
                    </div>
                  }
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                  }}
                />
              );
            })}
          </AppMenu>

          <button className="topnav-button">
            <Icon icon="bi:battery-full" />
          </button>
          <button className="topnav-button">
            <Icon icon="akar-icons:bluetooth" />
          </button>
          <button className="topnav-button">
            <Icon icon="akar-icons:wifi" />
          </button>
          <button className="topnav-button">
            <Icon icon="akar-icons:search" />
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
