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
      className="bg-none pointer-events-auto border-none flex flex-col justify-center items-center gap-1 h-full cursor-pointer"
    >
      <div
        className="shrink-0 overflow-hidden"
        style={{ width: size, height: size }}
      >
        {appIcon}
      </div>

      {appName ? (
        <p className="os-chrome-sm text-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
          {appName}
        </p>
      ) : null}
    </button>
  );
};
