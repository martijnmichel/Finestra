import { createPortal } from "react-dom";
import { AppMenu, AppMenuItem } from "./AppMenu";
import { NavMenu, NavMenuItem } from "../../applications";
import React, { useEffect } from "react";
export const AppNavigation = ({ items }: { items: NavMenu[] }) => {
  const el = document.querySelector(`#active-app-navigation--portal`);

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
