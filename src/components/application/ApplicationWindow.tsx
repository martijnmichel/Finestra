import { Icon } from "@iconify/react";
import React from "react";
import { useDrag } from "react-dnd";
import { useWindowManager } from "../../services/WindowManager";
import { Application } from "../../store/atoms/applications";

import "./App.css";
import { AppActions } from "./AppActions";

export const ApplicationWindow = (app: Application) => {
  const { closeApp, hideApp } = useWindowManager();

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "card",
      item: "div",
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.9 : 1,
      }),
    }),
    []
  );

  return (
    <div
      ref={dragRef}
      className="flex flex-col absolute left-10 top-10 border-1 border-gray-50 bg-gradient-to-t from-neutral-300 to-neutral-200 shadow-lg rounded-lg"
      style={{
        width: app.width,
        height: app.height,
        zIndex: app.active ? 1 : 0,
      }}
    >
      {!app.titleBar && (
        <div className="p-1 flex" onClick={() => closeApp(app.id)}>
          <AppActions id={app.id} />

          {app.name}
        </div>
      )}

      <div className={`bg-neutral-50 flex-grow rounded-b-lg ${app.titleBar ? 'rounded-t-lg' : ''}`}>
        {app.component && app.component()}
      </div>
    </div>
  );
};
