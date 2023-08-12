import { Icon } from "@iconify/react";
import React from "react";

interface Props {
  appIcon: React.ReactNode;
  appName?: string;
  size?: string;
  onClick: () => void;
  id?: string;
}
export const AppButton = ({
  appIcon,
  onClick,
  size = "48px",
  appName,
  id,
}: Props) => {
  return (
    <button
      id={id}
      onClick={onClick}
      style={{ width: size }}
      className={`bg-none pointer-events-auto border-none flex flex-col justify-center items-center gap-1 h-full hover:scale-[1.2] hover:-translate-y-3 transition-all cursor-pointer`}
    >
      {appIcon}

      <p className="text-white">{appName}</p>
    </button>
  );
};
