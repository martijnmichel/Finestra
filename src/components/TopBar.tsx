import React, { useEffect, useState } from "react";
import { useWindowManager } from "../services/WindowManager";
import { useRecoilState } from "recoil";
import { launchpad } from "../store/atoms/launchpad";
import { applications } from "../store/atoms/applications";
import { Icon } from "@iconify/react";
import { AppMenu, AppMenuItem } from "./application/AppMenu";
import { NavMenuItem } from "../applications";
const TopBar = () => {
  const { activeApp } = useWindowManager();
  const [launchPadState, setLaunchPadState] = useRecoilState(launchpad);
  const [applicationState, setApplicationState] = useRecoilState(applications);

  return (
    <nav
      className={`fixed z-40 top-0 right-0 left-0 flex transform transition-all ${
        launchPadState ? "-translate-y-28" : ""
      }`}
    >
      <div className="absolute inset-0 mx-auto bg-white/70 w-screen blur-50 z-0"></div>

      <div className="flex w-full z-1 relative items-center">
        <div>
          <Icon className="topnav-button" icon="ant-design:apple-filled" />
        </div>

        <div className="flex-grow h-full flex gap-2">
          {activeApp()
            ?.navigation()
            .map((item) => (
              <AppMenu key={`menu-item-${item.label}`} title={item.label}>
                {item.items.map((menuItem: NavMenuItem, i: number) => (
                  <AppMenuItem
                    key={`menu-item-item-${item.label}${i}`}
                    label={menuItem.label}
                    onClick={menuItem.function}
                  />
                ))}
              </AppMenu>
            ))}
        </div>

        <div className="flex-shrink flex gap-2 px-2">
          <Icon className="topnav-button" icon="bi:battery-full" />
          <Icon className="topnav-button" icon="akar-icons:bluetooth" />
          <Icon className="topnav-button" icon="akar-icons:wifi" />
          <Icon className="topnav-button" icon="akar-icons:search" />
        </div>

        <div className="text-sm px-2">Fri 31 Dec 07:44</div>
      </div>
    </nav>
  );
};

export default TopBar;
