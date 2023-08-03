import { Menu, Popover } from '@headlessui/react';
import React, { ReactNode } from 'react'
export const TopBarMenu = ({
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