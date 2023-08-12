import interact from "interactjs";
import React, { useEffect, useRef } from "react";
import { Application } from "../../applications/application";

import "./App.css";
import { AppActions } from "./AppActions";

import { useWindowManager } from "../../services/WindowManager";
import { Transition } from "@headlessui/react";
import { useAppContext } from "../../store";
import { toggleApp } from "../../store/actions/toggleApp";
import { updateAppWindow } from "../../store/actions/updateAppWindow";

export const ApplicationWindow = (app: Application) => {
  const position = useRef({ x: 0, y: 0 });
  const { state, dispatch } = useAppContext();

  const handleWindowClick = () => {
    toggleApp(app.id)(dispatch);
  };

  function handleCanvas(div: HTMLElement) {
    console.log(div);
    interact(div)
      .draggable({
        allowFrom: `[data-handle="${app.id}"]`,

        listeners: {
          move(event) {
            position.current.x += event.dx;
            position.current.y += event.dy;

            div.setAttribute("data-x", event.dx);
            div.setAttribute("data-y", event.dy);

            event.target.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
          },
          end(event) {
            updateAppWindow(app.id, {
              x: position.current.x,
              y: position.current.y,
              width: event.rect.width,
              height: event.rect.height,
            })(dispatch);
          },
        },
      })
      .resizable({
        // resize from all edges and corners
        edges: { left: false, right: true, bottom: true, top: false },

        listeners: {
          move(event) {
            var target = event.target;

            // update the element's style
            target.style.width = event.rect.width + "px";
            target.style.height = event.rect.height + "px";
          },
          end(event) {
            updateAppWindow(app.id, {
              x: position.current.x,
              y: position.current.y,
              width: event.rect.width,
              height: event.rect.height,
            })(dispatch);
          },
        },
        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: "parent",
          }),

          // minimum size
          interact.modifiers.restrictSize({
            min: { width: 400, height: 300 },
          }),
        ],

        inertia: true,
      });
  }

  useEffect(() => {
    var canvas = document.getElementById(app.id);
    if (canvas) {
      handleCanvas(canvas);
    }
  }, []);

  useEffect(() => console.log(app), [app]);

  return (
    <Transition
      as="div"
      id={app.id}
      className="flex flex-col absolute border-1 origin-top-left border-gray-50 bg-gradient-to-t from-neutral-300 to-neutral-200 shadow-lg rounded-lg"
      style={{
        width: app.width,
        height: app.height,
        top: 50,
        left: "50%",
        marginLeft: `-${app.width / 2}px`,
        transform: `translateX(${app.x}px) translateY(${app.y}px)`,
        opacity: !app.active ? 0.9 : 1,
        zIndex: app.active ? 1 : 0,
      }}
      enter=" origin-bottom duration-300"
      enterFrom=" transition-all opacity-0 translate-y-[80vh] scale-x-[0.2] scale-y-[0.6] skew-x-12"
      enterTo={`opacity-100 scale-x-100 scale-y-100 skew-x-0`}
      leave="transition-all duration-300"
      leaveFrom={`opacity-100 scale-100`}
      leaveTo={`opacity-0 translate-y-[80vh] scale-x-[0.2] scale-y-[0.6]`}
      show={!app.minimized}
      afterLeave={() => {
        var canvas = document.getElementById(app.id);
        if (canvas) interact(canvas).off(["drag", "resize"]);
      }}
      afterEnter={() => {
        var canvas = document.getElementById(app.id);
        if (canvas) handleCanvas(canvas);
      }}
    >
      {!app.titleBar && (
        <>
          <div className="p-1 flex" data-handle={app.id}>
            <AppActions id={app.id} />
            {app.name}
          </div>
          <div className="h-[1px] w-full bg-gray-200"></div>
        </>
      )}

      <div
        onClick={handleWindowClick}
        className={`bg-white @container/window h-full flex-grow rounded-b-lg ${
          app.titleBar ? "rounded-t-lg" : ""
        }`}
      >
        {app.component && app.component()}
      </div>
    </Transition>
  );
};
