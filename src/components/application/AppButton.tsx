import { Icon } from "@iconify/react";
import React from "react";

interface Props {
  appIcon: React.ReactNode;
  appName?: string;
  size?: string;
  onClick: () => void;
}
export const AppButton = ({ appIcon, onClick, size = '48px', appName }: Props) => {
  return (
    <button
      onClick={onClick}
      style={{ width: size }}
      className={`bg-none border-none h-full hover:scale-[1.3] hover:-translate-y-4 transition-all]`}
    >
      {appIcon}

      <p className="text-white">{appName}</p>
    </button>
  );
};
