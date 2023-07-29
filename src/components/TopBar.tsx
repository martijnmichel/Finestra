import React, { ReactNode, useEffect, useState } from "react";
import { useWindowManager } from "../services/WindowManager";
import { useRecoilState } from "recoil";
import { launchpad } from "../store/atoms/launchpad";
import { applications } from "../store/atoms/applications";
import { Icon } from "@iconify/react";
import { AppMenu, AppMenuItem } from "./application/AppMenu";
import { NavMenuItem } from "../applications";
import dayjs from "dayjs";
import { Menu, Popover } from "@headlessui/react";
const TopBar = () => {
  const { activeApp } = useWindowManager();
  const [launchPadState, setLaunchPadState] = useRecoilState(launchpad);
  const [applicationState, setApplicationState] = useRecoilState(applications);
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

  return (
    <nav
      className={`fixed z-40 top-0 right-0 p-1 left-0 flex transform transition-all ${
        launchPadState ? "-translate-y-28" : ""
      }`}
    >
      <div className="absolute inset-0 mx-auto bg-white/70 w-screen blur-50 z-0"></div>

      <div className="flex w-full z-1 relative items-center">
        <div className="">
          <Icon className="topnav-button" icon="ant-design:apple-filled" />
        </div>

        <div className="flex-grow h-full flex gap-2">
          {activeApp?.navigation().map((item) => (
            <AppMenu key={`menu-item-${item.label}`} title={item.label}>
              {item.items.map((menuItem: NavMenuItem, i: number) => {
                return menuItem.label === "separator" ? (
                  <hr />
                ) : (
                  <AppMenuItem
                    key={`menu-item-item-${item.label}${i}`}
                    label={menuItem.label}
                    onClick={menuItem.function}
                  />
                );
              })}
            </AppMenu>
          ))}
        </div>

        <div className="flex-shrink flex gap-2 px-2">
          <Icon className="topnav-button" icon="bi:battery-full" />
          <Icon className="topnav-button" icon="akar-icons:bluetooth" />
          <Icon className="topnav-button" icon="akar-icons:wifi" />
          <Icon className="topnav-button" icon="akar-icons:search" />
        </div>

        <div className="text-sm px-2">
          {dayjs(dateTime).format("ddd D MMM HH:mm")}
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
