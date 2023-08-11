import React from "react";
import { Icon } from "@iconify/react";
export const AppMenu = ({
  icon = "ant-design:menu-outlined",
  title,
  button,
  children,
}: {
  icon?: string;
  button?: JSX.Element;
  title?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative group flex items-center">
      {title ? (
        <div className="px-1 pt-[2px] hover:bg-black/20 text-sm h-full">
          {title}
        </div>
      ) : button ? (
        button
      ) : (
        <Icon icon={icon} className="m-auto" />
      )}
      <div className="min-w-[150px] absolute bg-gradient-to-t from-[rgba(255,255,255,0.5)] to-[rgba(255,255,255,0.7)] backdrop-blur-sm rounded-md border-[1px] border-[rgba(0,0,0,0.1)] px-1 py-1 left-0 top-6 scale-y-0 origin-top group-hover:scale-y-100">
        {children}
      </div>
    </div>
  );
};

export const AppMenuItem = ({
  label,
  onClick,
}: {
  label: string | JSX.Element;
  onClick: () => void;
}) => {
  return (
    <div onClick={onClick} className="hover:bg-gray-500/20 cursor-pointer px-1">
      {label}
    </div>
  );
};
