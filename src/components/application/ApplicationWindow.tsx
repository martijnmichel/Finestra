import interact from "interactjs";
import React, { useEffect, useRef } from "react";
import { Application } from "../../applications/application";

import "./App.css";
import { AppActions } from "./AppActions";

import { Transition } from "@headlessui/react";
import { useAppContext } from "../../store";
import { toggleApp } from "../../store/actions/toggleApp";
import { updateAppWindow } from "../../store/actions/updateAppWindow";
import { useOsFormFactor } from "../../hooks/useOsFormFactor";

export const ApplicationWindow = (app: Application) => {
  const position = useRef({ x: app.x, y: app.y });
  const { dispatch } = useAppContext();
  const { isMobileShell } = useOsFormFactor();
  const mobileFullscreen = isMobileShell;
  const showChrome = !mobileFullscreen && !app.titleBar;
  const isFullscreen = mobileFullscreen || app.fullscreen;

  const handleWindowFocus = () => {
    if (!app.active) {
      toggleApp(app.id)(dispatch);
    }
  };

  function handleCanvas(div: HTMLElement) {
    if (mobileFullscreen) {
      interact(div).unset();
      return;
    }

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
        edges: { left: false, right: true, bottom: true, top: false },

        listeners: {
          move(event) {
            var target = event.target;

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
          interact.modifiers.restrictEdges({
            outer: "parent",
          }),

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
    return () => {
      var el = document.getElementById(app.id);
      if (el) interact(el).unset();
    };
  }, [mobileFullscreen, app.id]);

  const desktopTop = app.fullscreen ? 28 : 50;

  return (
    <Transition
      as="div"
      id={app.id}
      className="flex flex-col absolute origin-top-left overflow-hidden"
      style={{
        width: isFullscreen || mobileFullscreen ? "100vw" : app.width,
        height: mobileFullscreen
          ? "calc(100dvh - var(--status-strip-height) - var(--mobile-dock-offset))"
          : app.fullscreen
            ? "100vh"
            : app.height,
        top: mobileFullscreen ? "var(--status-strip-height)" : desktopTop,
        left: isFullscreen || mobileFullscreen ? "0" : "50%",
        marginLeft:
          isFullscreen || mobileFullscreen ? "0" : `-${app.width / 2}px`,
        transform: isFullscreen || mobileFullscreen
          ? "translate(0, 0)"
          : `translateX(${app.x}px) translateY(${app.y}px)`,
        zIndex: (isFullscreen || mobileFullscreen ? 20 : 1) + (app.stackOrder ?? 0),
        borderRadius: isFullscreen || mobileFullscreen ? "0" : "var(--window-radius)",
        border:
          isFullscreen || mobileFullscreen
            ? "none"
            : "0.5px solid var(--window-border)",
        boxShadow:
          isFullscreen || mobileFullscreen ? "none" : "var(--shadow-app-window)",
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
        if (canvas) interact(canvas).unset();
      }}
      afterEnter={() => {
        var canvas = document.getElementById(app.id);
        if (canvas) handleCanvas(canvas);
      }}
    >
      {showChrome && (
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
        className="@container/window flex-1 min-h-0 overflow-y-hidden relative"
        style={{
          borderRadius:
            isFullscreen || mobileFullscreen
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
