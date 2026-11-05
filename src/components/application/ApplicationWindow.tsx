import interact from "interactjs";
import React, { useEffect, useRef, useState } from "react";
import { Application } from "../../applications/application";

import "./App.css";
import { AppActions } from "./AppActions";

import { Transition } from "@headlessui/react";
import { useAppContext } from "../../store";
import { toggleApp } from "../../store/actions/toggleApp";
import { updateAppWindow } from "../../store/actions/updateAppWindow";
import { useOsFormFactor } from "../../hooks/useOsFormFactor";
import { useShellGestureOptional } from "../shell/ShellGestureContext";
import { cn } from "@/lib/utils";

export const ApplicationWindow = (app: Application) => {
  const position = useRef({ x: app.x, y: app.y });
  const {
    state: { appSwitcher },
    dispatch,
  } = useAppContext();
  const { isIos, isIpados, isMobileShell } = useOsFormFactor();
  const gesture = useShellGestureOptional();

  // iPhone: edge-to-edge fullscreen, no traffic lights.
  // iPad: Mac-like windows with chrome / toolbars.
  const phoneFullscreen = isIos;
  const showChrome = !phoneFullscreen && !app.titleBar;
  const isFullscreen = phoneFullscreen || app.fullscreen;

  const [dragVisual, setDragVisual] = useState({
    scale: 1,
    x: 0,
    y: 0,
    radius: 0,
    opacity: 1,
    scrubbing: false,
  });

  useEffect(() => {
    if (!gesture || !isMobileShell || !app.active || app.minimized) {
      setDragVisual({
        scale: 1,
        x: 0,
        y: 0,
        radius: 0,
        opacity: 1,
        scrubbing: false,
      });
      return;
    }

    const apply = () => {
      const mode = gesture.mode.get();
      if (mode !== "home" && mode !== "switcher") {
        setDragVisual({
          scale: 1,
          x: 0,
          y: 0,
          radius: 0,
          opacity: 1,
          scrubbing: false,
        });
        return;
      }
      const p = gesture.progress.get();
      const dx = gesture.dragX.get();
      const dy = gesture.dragY.get();
      // Shrink toward a card; follow the finger.
      const scale = 1 - p * (mode === "switcher" ? 0.42 : 0.28);
      setDragVisual({
        scale,
        x: dx,
        y: dy,
        radius: 12 + p * 28,
        opacity: 1 - p * 0.08,
        scrubbing: p > 0.01 || Math.abs(dx) > 1 || Math.abs(dy) > 1,
      });
    };

    const unsubs = [
      gesture.progress.on("change", apply),
      gesture.dragX.on("change", apply),
      gesture.dragY.on("change", apply),
      gesture.mode.on("change", apply),
    ];
    apply();
    return () => unsubs.forEach((u) => u());
  }, [gesture, isMobileShell, app.active, app.minimized]);

  const handleWindowFocus = () => {
    if (!app.active) {
      toggleApp(app.id)(dispatch);
    }
  };

  function handleCanvas(div: HTMLElement) {
    if (phoneFullscreen) {
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
  }, [phoneFullscreen, app.id]);

  const menubarOffset = isIpados ? 36 : 28;
  const desktopTop = app.fullscreen ? menubarOffset : isIpados ? 48 : 50;

  const baseTransform = phoneFullscreen
    ? undefined
    : isFullscreen
      ? undefined
      : `translateX(${app.x}px) translateY(${app.y}px)`;

  // Avoid an idle `translate(0,0)` — transforms create a containing block that
  // can break nested touch scrolling on iOS WebKit.
  const scrubTransform = dragVisual.scrubbing
    ? `translate(${dragVisual.x}px, ${dragVisual.y}px) scale(${dragVisual.scale})`
    : baseTransform;

  // When switcher opens, cards take over — hide live windows.
  const hideForSwitcher = isMobileShell && appSwitcher;

  return (
    <Transition
      as="div"
      id={app.id}
      className={cn(
        "flex flex-col absolute origin-center",
        phoneFullscreen ? "overflow-hidden" : "overflow-hidden"
      )}
      style={{
        width: phoneFullscreen
          ? "100vw"
          : isFullscreen
            ? "100vw"
            : app.width,
        // iPhone: true edge-to-edge — status bar / Dynamic Island overlays the app.
        height: phoneFullscreen
          ? "100dvh"
          : isFullscreen
            ? `calc(100dvh - ${menubarOffset}px)`
            : app.height,
        top: phoneFullscreen
          ? 0
          : isFullscreen
            ? menubarOffset
            : desktopTop,
        left: phoneFullscreen || isFullscreen ? "0" : "50%",
        marginLeft:
          phoneFullscreen || isFullscreen ? "0" : `-${app.width / 2}px`,
        transform: scrubTransform,
        // Keep phone apps above the dock wrapper hit-testing layer while open.
        ...(phoneFullscreen ? { touchAction: "pan-y" as const } : {}),
        zIndex:
          (phoneFullscreen || isFullscreen ? 20 : 1) + (app.stackOrder ?? 0),
        borderRadius: phoneFullscreen
          ? `${dragVisual.radius}px`
          : isFullscreen
            ? dragVisual.scrubbing
              ? `${dragVisual.radius}px`
              : "0"
            : "var(--window-radius)",
        border:
          phoneFullscreen && !dragVisual.scrubbing
            ? "none"
            : "0.5px solid var(--window-border)",
        boxShadow:
          dragVisual.scrubbing || (!phoneFullscreen && !isFullscreen)
            ? "var(--shadow-app-window)"
            : "none",
        filter: app.active ? "none" : "saturate(0.9) brightness(0.98)",
        opacity: hideForSwitcher ? 0 : dragVisual.opacity,
        pointerEvents: hideForSwitcher ? "none" : undefined,
        background: "var(--window-body)",
        backdropFilter:
          "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
        WebkitBackdropFilter:
          "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
        transition: dragVisual.scrubbing
          ? "none"
          : "opacity 0.28s ease, border-radius 0.28s ease, box-shadow 0.28s ease",
      }}
      enter="origin-bottom duration-400"
      enterFrom="transition-all opacity-0 translate-y-[40vh] scale-[0.92]"
      enterTo="opacity-100 scale-100 translate-y-0"
      leave="transition-all duration-350"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 translate-y-[30vh] scale-[0.88]"
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
        className={cn(
          "@container/window flex-1 min-h-0 relative",
          // Phone: allow the window body to scroll (nested overflow often breaks on iOS).
          phoneFullscreen ? "overflow-y-auto overscroll-y-contain" : "overflow-y-hidden"
        )}
        style={{
          borderRadius: phoneFullscreen
            ? `${dragVisual.radius}px`
            : app.titleBar || isFullscreen
              ? isFullscreen && !dragVisual.scrubbing
                ? 0
                : "var(--window-radius)"
              : "0 0 var(--window-radius) var(--window-radius)",
          background: "var(--window-tint)",
          // Device status bar / notch — safe-area only (no mocked iPhone chrome).
          paddingTop: phoneFullscreen
            ? "max(12px, var(--safe-area-top))"
            : undefined,
          WebkitOverflowScrolling: phoneFullscreen ? "touch" : undefined,
        }}
      >
        {app.component && app.component()}
      </div>
    </Transition>
  );
};
