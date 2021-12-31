import React from "react";
import { Icon } from "@iconify/react";
export const AppMenu = ({
  icon = "ant-design:menu-outlined",
  title,
  children
}: {
  icon?: string;
  title?: string;
  children: React.ReactNode
}) => {
  return (
    <div className="relative group">
      {title ? title : <Icon icon={icon} className="m-auto" />}
      <div className="absolute left-0 top-0 hidden group-focus:block">
        {children}
      </div>
    </div>
  );
};


export const AppMenuItem = ({ label, onClick }: { label: string, onClick: () => void }) => {
  return (
    <div onClick={onClick} className="">
      {label}
    </div>
  )
}