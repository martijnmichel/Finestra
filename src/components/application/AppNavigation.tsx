import { createPortal } from "react-dom";
import { AppMenu, AppMenuItem } from "./AppMenu";
import { NavMenu, NavMenuItem } from "../../applications";
import React, { useEffect } from "react";
import { useWindowManager } from "../../services/WindowManager";
export const AppNavigation = ({
  items,
  id,
}: {
  items: NavMenu[];
  id: string;
}) => {
  const el = document.querySelector(`#active-app-navigation--portal`);

  const { activeApp } = useWindowManager();

  useEffect(() => {
    return () => {
      const $el = document.querySelector(`#app-nav--portal`);
      if ($el) $el.remove();
    };
  }, []);

  if (el)
    return createPortal(
      <div id="app-nav--portal" className="flex items-center gap-2">
        {items.map((item) => (
          <AppMenu key={`menu-item-${item.label}`} title={item.label}>
            {item.items.map((menuItem: NavMenuItem, i: number) => {
              return menuItem.label === "separator" ? (
                <hr />
              ) : (
                <AppMenuItem
                  key={`menu-item-item-${item.label}${i}`}
                  label={menuItem.label}
                  onClick={() => menuItem.function && menuItem.function()}
                />
              );
            })}
          </AppMenu>
        ))}
      </div>,
      el
    );

  return null;
};
