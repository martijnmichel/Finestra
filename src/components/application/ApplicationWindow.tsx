import React from "react";
import { useDrag } from "react-dnd";
import { useWindowManager } from "../../services/WindowManager";
import { Application } from "../../store/atoms/applications";
import { Menu } from "./AppMenu";
import "./App.css";

export const ApplicationWindow = (app: Application) => {
  const { closeApp } = useWindowManager();

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
      style={{ width: "400px", height: "300px", zIndex: app.active ? 1 : 0 }}
    >
      <div className="p-1 flex" onClick={() => closeApp(app.id)}>
        <div className="application-button-container">
          <div className="application-button close"></div>
          <div className="application-button minimize"></div>
          <div className="application-button maximize"></div>
        </div>

        <div>{app.name}</div>
      </div>

      <div className="bg-neutral-50 flex-grow rounded-b-lg">
        {app.component && app.component()}
      </div>
    </div>
  );
};
