import { Icon } from "@iconify/react";
import React from "react";
import { useWindowManager } from "../../services/WindowManager";
export const AppActions = ({ id }: { id: string }) => {
  const { closeApp, hideApp } = useWindowManager();
  return (
    <div className="application-button-container">
      <div
        onClick={() => closeApp(id)}
        className="application-button close group"
      >
        <Icon className="hidden group-hover:block" icon="ep:close" />
      </div>
      <div
        onClick={() => hideApp(id)}
        className="application-button minimize group"
      >
        <Icon
          className="hidden group-hover:block"
          icon="codicon:chrome-minimize"
        />
      </div>
      <div className="application-button maximize group">
        <Icon
          className="hidden group-hover:block"
          icon="fluent:arrow-maximize-16-filled"
        />
      </div>
    </div>
  );
};
