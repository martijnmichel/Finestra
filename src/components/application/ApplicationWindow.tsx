import React from "react";
import { useWindowManager } from "../../services/WindowManager";
import { Application } from "../../store/atoms/applications";
import { Menu } from "../display/Menu";

export const ApplicationWindow = (app: Application) => {
  const { closeApp } = useWindowManager();

  const InfoMenu = () => {
    return <Menu />;
  };

  return (
    <div
      className="flex flex-col absolute left-10 top-10 border-1 border-gray-50 bg-white shadow-lg rounded-sm"
      style={{ width: "400px", height: "300px", zIndex: app.active ? 1 : 0 }}
    >
      <div className="bg-blue-500 p-1 flex" onClick={() => closeApp(app.id)}>
        <InfoMenu />
        <div className="flex-shrink">{app.id}</div>

        <div>{app.name}</div>

        {app.active ? "open" : "closed"}
      </div>

      <div className="flex-grow">{app.component && app.component()}</div>
    </div>
  );
};
