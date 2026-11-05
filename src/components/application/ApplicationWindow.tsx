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
  const position = useRef({ x: app.x, y: app.y });
  const { state, dispatch } = useAppContext();

  // Focus on mousedown so in-window "open app" clicks (which fire on click)
  // don't bubble back and re-activate this window after the new one opens.
  const handleWindowFocus = () => {
    if (!app.active) {
      toggleApp(app.id)(dispatch);
    }
  };

  function handleCanvas(div: HTMLElement) {
    interact(div)
      .draggable({
        allowFrom: `[data-handle="${app.id}"]`,

        listeners: {
          move(event) {
            position.current.x += event.dx;
            position.current.y += event.dy;

            div.setAttribute("data-x", String(position.current.x));
            div.setAttribute("data-y", String(position.current.y));

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
    position.current = { x: app.x, y: app.y };
  }, [app.x, app.y]);

  useEffect(() => {
    var canvas = document.getElementById(app.id);
    if (canvas) {
      handleCanvas(canvas);
    }
  }, []);

  return (
    <Transition
      as="div"
      id={app.id}
      className="flex flex-col absolute origin-top-left shadow-app-window overflow-hidden"
      style={{
        width: app.fullscreen ? "100vw" : app.width,
        height: app.fullscreen ? "100vh" : app.height,
        top: app.fullscreen ? 28 : 50,
        left: app.fullscreen ? "0" : "50%",
        marginLeft: app.fullscreen ? "0" : `-${app.width / 2}px`,
        transform: app.fullscreen
          ? "translate(0, 0)"
          : `translateX(${app.x}px) translateY(${app.y}px)`,
        // Keep windows below dock (z-30) / menubar (z-40); fullscreen sits above others.
        zIndex: (app.fullscreen ? 20 : 1) + (app.stackOrder ?? 0),
        borderRadius: app.fullscreen ? "0" : "var(--window-radius)",
        border: app.fullscreen ? "none" : "0.5px solid var(--window-border)",
        filter: app.active ? "none" : "saturate(0.9) brightness(0.98)",
        background: "var(--window-body)",
        backdropFilter:
          "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
        WebkitBackdropFilter:
          "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
      }}
      enter=" origin-bottom duration-300"
      enterFrom=" transition-all opacity-0 translate-y-[80vh] scale-x-[0.2] scale-y-[0.6] skew-x-12"
      enterTo={`opacity-100 scale-x-100 scale-y-100 skew-x-0`}
      leave="transition-all duration-300"
      leaveFrom={`opacity-100 scale-100`}
      leaveTo={`opacity-0 translate-y-[80vh] scale-x-[0.2] scale-y-[0.6]`}
      show={!app.minimized}
      onMouseDown={handleWindowFocus}
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
        <div
          className={`window-titlebar ${app.active ? "" : "window-titlebar-inactive"}`}
          data-handle={app.id}
        >
          <AppActions id={app.id} />
          <span className="flex-1 text-center pr-[52px] truncate">
            {app.name}
          </span>
        </div>
      )}

      <div
        className={`@container/window flex-1 min-h-0 overflow-y-hidden relative ${
          app.titleBar ? "" : ""
        }`}
        style={{
          borderRadius: app.fullscreen
            ? 0
            : app.titleBar
              ? "var(--window-radius)"
              : "0 0 var(--window-radius) var(--window-radius)",
          background: "var(--window-tint)",
        }}
      >
        {app.component && app.component()}
      </div>
    </Transition>
  );
};
