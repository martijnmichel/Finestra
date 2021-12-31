import React from "react";
import { Icon } from "@iconify/react";
export const Menu = ({
  icon = "ant-design:menu-outlined",
}: {
  icon?: string;
}) => {
  return (
    <div className="relative group">
      <Icon icon={icon} className="m-auto" />
      <div className="absolute left-0 top-0 hidden group-focus:block">test</div>
    </div>
  );
};
