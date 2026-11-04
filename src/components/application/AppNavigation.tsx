import { createPortal } from "react-dom";
import { NavMenu, NavMenuItem } from "../../applications";
import React from "react";
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

export const AppNavigation = ({
  items,
  id,
  appName,
}: {
  items: NavMenu[];
  id: string;
  appName?: string;
}) => {
  const el = document.querySelector(`#active-app-navigation--portal`);

  const { isActive } = useWindowManager();

  const active = isActive(id);

  if (el && active)
    return createPortal(
      <div id="app-nav--portal" className="os-chrome flex items-center h-full overflow-visible">
        <Menubar>
          {appName ? (
            <MenubarMenu>
              <MenubarTrigger className="os-chrome-em !font-bold">
                {appName}
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem disabled>About {appName}</MenubarItem>
                <MenubarSeparator />
                <MenubarItem disabled>Settings…</MenubarItem>
                <MenubarSeparator />
                <MenubarItem disabled>Quit {appName}</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          ) : null}
          {items.map((item) => (
            <MenubarMenu key={`menu-item-${item.label}`}>
              <MenubarTrigger>{item.label}</MenubarTrigger>
              <MenubarContent>
                {item.items.map((menuItem: NavMenuItem, i: number) => {
                  if (menuItem.label === "separator") {
                    return <MenubarSeparator key={`separator-${i}`} />;
                  }

                  if (menuItem.submenu) {
                    return (
                      <MenubarSub key={`submenu-${item.label}-${i}`}>
                        <MenubarSubTrigger>
                          {menuItem.label}
                          {menuItem.shortcut && (
                            <span className="os-chrome-shortcut ml-auto">
                              {menuItem.shortcut}
                            </span>
                          )}
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                          {menuItem.submenu.map(
                            (subItem: NavMenuItem, j: number) => {
                              if (subItem.label === "separator") {
                                return (
                                  <MenubarSeparator key={`sub-separator-${j}`} />
                                );
                              }
                              return (
                                <MenubarItem
                                  key={`submenu-item-${j}`}
                                  onClick={() =>
                                    subItem.function && subItem.function()
                                  }
                                  disabled={subItem.disabled}
                                >
                                  {subItem.label}
                                  {subItem.shortcut && (
                                    <span className="os-chrome-shortcut ml-auto pl-6">
                                      {subItem.shortcut}
                                    </span>
                                  )}
                                </MenubarItem>
                              );
                            }
                          )}
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
                      {menuItem.shortcut && (
                        <span className="os-chrome-shortcut ml-auto pl-6">
                          {menuItem.shortcut}
                        </span>
                      )}
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
