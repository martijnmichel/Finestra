import { createPortal } from "react-dom";
import { AppMenu, AppMenuItem } from "./AppMenu";
import { NavMenu, NavMenuItem } from "../../applications";
import React, { useEffect } from "react";
import { useWindowManager } from "../../services/WindowManager";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../ui/menubar";
import { Button } from "../ui/button";
export const AppNavigation = ({
  items,
  id,
}: {
  items: NavMenu[];
  id: string;
}) => {
  const el = document.querySelector(`#active-app-navigation--portal`);

  const { isActive } = useWindowManager();

  const active = isActive(id);

  if (el && active)
    return createPortal(
      <div id="app-nav--portal" className="flex items-center gap-2">
        <Menubar>
          {items.map((item) => (
            <MenubarMenu key={`menu-item-${item.label}`}>
              <MenubarTrigger>
                {item.label}
              </MenubarTrigger>
              <MenubarContent className="backdrop-blur-xl">
                {item.items.map((menuItem: NavMenuItem, i: number) => {
                  if (menuItem.label === "separator") {
                    return <MenubarSeparator key={`separator-${i}`} />;
                  }
                  
                  if (menuItem.submenu) {
                    return (
                      <MenubarSub key={`submenu-${item.label}-${i}`}>
                        <MenubarSubTrigger>
                          {menuItem.label}
                          {menuItem.shortcut && <span className="ml-auto text-xs text-gray-500">{menuItem.shortcut}</span>}
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                          {menuItem.submenu.map((subItem: NavMenuItem, j: number) => {
                            if (subItem.label === "separator") {
                              return <MenubarSeparator key={`sub-separator-${j}`} />;
                            }
                            return (
                              <MenubarItem
                                key={`submenu-item-${j}`}
                                onClick={() => subItem.function && subItem.function()}
                                disabled={subItem.disabled}
                              >
                                {subItem.label}
                                {subItem.shortcut && <span className="ml-auto text-xs text-gray-500">{subItem.shortcut}</span>}
                              </MenubarItem>
                            );
                          })}
                        </MenubarSubContent>
                      </MenubarSub>
                    );
                  }
                  
                  return (
                    <MenubarItem
                      key={`menu-item-item-${item.label}${i}`}
                      onClick={() => menuItem.function && menuItem.function()}
                      disabled={menuItem.disabled}
                    >
                      {menuItem.label}
                      {menuItem.shortcut && <span className="ml-auto text-xs text-gray-500">{menuItem.shortcut}</span>}
                    </MenubarItem>
                  );
                })}
              </MenubarContent>
            </MenubarMenu>
          ))}
        </Menubar>
      </div>,
      el
    );

  return null;
};
