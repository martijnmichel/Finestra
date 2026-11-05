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
import { cn } from "@/lib/utils";

export const ApplicationWindow = (app: Application) => {
  const position = useRef({ x: app.x, y: app.y });
  const {
    state: { appSwitcher },
    dispatch,
  } = useAppContext();
  const { isIos, isIpados, isMobileShell } = useOsFormFactor();

  const phoneFullscreen = isIos;
  const showChrome = !phoneFullscreen && !app.titleBar;
  const isFullscreen = phoneFullscreen || app.fullscreen;
  const hideForSwitcher = isMobileShell && appSwitcher;

  const handleWindowFocus = () => {
    if (!app.active) {
      toggleApp(app.id)(dispatch);
    }
  };

  // Desktop + iPad: interact.js (same path — custom iPad drag was ending on pointercancel).
  // iPhone: no window drag.
  useEffect(() => {
    const div = document.getElementById(app.id);
    if (!div) return;

    if (isIos || isFullscreen) {
      interact(div).unset();
      return;
    }

    position.current = { x: app.x, y: app.y };
    div.style.transform = `translate3d(${app.x}px, ${app.y}px, 0)`;

    interact(div)
      .draggable({
        allowFrom: `[data-handle="${app.id}"]`,
        ignoreFrom: "input, textarea, button, a, [data-no-window-drag]",
        listeners: {
          start(event) {
            const el = event.target as HTMLElement;
            el.classList.add("window-dragging");
            el.style.willChange = "transform";
            el.style.transition = "none";
            el.style.boxShadow = "none";
            el.style.backdropFilter = "none";
            (
              el.style as CSSStyleDeclaration & {
                webkitBackdropFilter?: string;
              }
            ).webkitBackdropFilter = "none";
          },
          move(event) {
            position.current.x += event.dx;
            position.current.y += event.dy;
            (event.target as HTMLElement).style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
          },
          end(event) {
            const el = event.target as HTMLElement;
            el.classList.remove("window-dragging");
            el.style.willChange = "";
            el.style.transition = "";
            el.style.boxShadow = "";
            if (!isIpados) {
              el.style.backdropFilter = "";
              (
                el.style as CSSStyleDeclaration & {
                  webkitBackdropFilter?: string;
                }
              ).webkitBackdropFilter = "";
            }
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
        // Hit area from the edge — 0 effectively disables resize on desktop.
        margin: isIpados ? 14 : 8,
        listeners: {
          move(event) {
            const target = event.target as HTMLElement;
            target.style.width = `${event.rect.width}px`;
            target.style.height = `${event.rect.height}px`;
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
          interact.modifiers.restrictEdges({ outer: "parent" }),
          interact.modifiers.restrictSize({
            min: {
              width: isIpados ? 320 : 400,
              height: isIpados ? 280 : 300,
            },
          }),
        ],
        inertia: true,
      });

    return () => {
      interact(div).unset();
    };
  }, [isIos, isIpados, isFullscreen, app.id, app.x, app.y, dispatch]);

  const menubarOffset = isIpados ? 36 : 28;
  const desktopTop = app.fullscreen ? menubarOffset : isIpados ? 48 : 50;

  return (
    <Transition
      as="div"
      id={app.id}
      className="app-window flex flex-col absolute origin-center overflow-hidden"
      style={{
        width: phoneFullscreen || isFullscreen ? "100vw" : app.width,
        height: phoneFullscreen
          ? "100dvh"
          : isFullscreen
            ? `calc(100dvh - ${menubarOffset}px)`
            : app.height,
        top: phoneFullscreen ? 0 : isFullscreen ? menubarOffset : desktopTop,
        left: phoneFullscreen || isFullscreen ? "0" : "50%",
        marginLeft:
          phoneFullscreen || isFullscreen ? "0" : `-${app.width / 2}px`,
        transform:
          phoneFullscreen || isFullscreen
            ? undefined
            : `translate3d(${position.current.x}px, ${position.current.y}px, 0)`,
        ...(phoneFullscreen ? { touchAction: "pan-y" as const } : {}),
        zIndex:
          (phoneFullscreen || isFullscreen || isMobileShell ? 25 : 10) +
          (app.stackOrder ?? 0),
        borderRadius: phoneFullscreen || isFullscreen ? 0 : "var(--window-radius)",
        border:
          phoneFullscreen
            ? "none"
            : "0.5px solid var(--window-border)",
        boxShadow:
          !phoneFullscreen && !isFullscreen
            ? "var(--shadow-app-window)"
            : "none",
        opacity: hideForSwitcher ? 0 : 1,
        pointerEvents: hideForSwitcher ? "none" : undefined,
        background: isIpados ? "var(--background)" : "var(--window-body)",
        backdropFilter: isIpados
          ? "none"
          : "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
        WebkitBackdropFilter: isIpados
          ? "none"
          : "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
      }}
      enter="origin-bottom duration-300"
      enterFrom="opacity-0 translate-y-[40vh] scale-[0.92]"
      enterTo="opacity-100 scale-100 translate-y-0"
      leave="duration-250"
      leaveFrom="opacity-100"
      leaveTo="opacity-0 translate-y-[30vh] scale-[0.88]"
      show={!app.minimized}
      onMouseDown={handleWindowFocus}
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
        className={cn(
          "@container/window flex-1 min-h-0 relative",
          isMobileShell
            ? "overflow-y-auto overscroll-y-contain"
            : "overflow-y-hidden"
        )}
        style={{
          borderRadius:
            phoneFullscreen || isFullscreen
              ? 0
              : app.titleBar
                ? "var(--window-radius)"
                : "0 0 var(--window-radius) var(--window-radius)",
          background: isIpados ? "var(--background)" : "var(--window-tint)",
          paddingTop: phoneFullscreen
            ? "max(12px, var(--safe-area-top))"
            : undefined,
          WebkitOverflowScrolling: isMobileShell ? "touch" : undefined,
          touchAction: isMobileShell ? "pan-y" : undefined,
        }}
      >
        {app.component && app.component()}
      </div>
    </Transition>
  );
};
