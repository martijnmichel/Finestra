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
import { useShellGestureOptional } from "../shell/ShellGestureContext";
import { cn } from "@/lib/utils";

/** Ease helpers for the genie curve (driven by gesture progress 0–1). */
const easeInCubic = (t: number) => t * t * t;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Map scrub progress → a macOS-ish genie suck toward the home indicator.
 * Early progress: cardify (uniform scale + radius). Late: neck + pour down.
 */
function genieFromProgress(
  p: number,
  mode: "home" | "switcher",
  dx: number,
  dy: number
) {
  if (mode === "switcher") {
    const scale = 1 - p * 0.42;
    return {
      transform: `translate3d(${dx}px, ${dy}px, 0) scale(${scale})`,
      origin: "50% 50%",
      radius: 12 + p * 28,
      opacity: 1,
      scrubbing: p > 0.01 || Math.abs(dx) > 1 || Math.abs(dy) > 1,
    };
  }

  // 0→~0.55 (scrub / cancelable): card follows finger + gentle shrink.
  // 0.55→1 (past commit): neck + pour into the home indicator.
  const card = Math.min(1, p / 0.55);
  const pour = Math.max(0, (p - 0.55) / 0.45);
  const pourE = easeInCubic(pour);
  const cardE = easeOutCubic(card);

  const scaleX = lerp(1, 0.72, cardE) * lerp(1, 0.14, pourE);
  const scaleY = lerp(1, 0.78, cardE) * lerp(1, 0.06, pourE);
  // Stay with the finger while cancelable; after commit, converge + suck down.
  const tx = dx * (1 - pourE * 0.92);
  const ty =
    dy * (1 - pourE * 0.25) + pourE * (window.innerHeight * 0.42);
  const radius = lerp(0, 28, cardE) + pourE * 16;
  const opacity = p > 0.82 ? 1 - (p - 0.82) / 0.18 : 1;

  return {
    transform: `translate3d(${tx}px, ${ty}px, 0) scale(${scaleX}, ${scaleY})`,
    origin: "50% 100%",
    radius,
    opacity: Math.max(0, opacity),
    scrubbing: p > 0.008 || Math.abs(dx) > 1 || Math.abs(dy) > 1,
  };
}

export const ApplicationWindow = (app: Application) => {
  const position = useRef({ x: app.x, y: app.y });
  const {
    state: { appSwitcher },
    dispatch,
  } = useAppContext();
  const { isIos, isIpados, isMobileShell } = useOsFormFactor();
  const gesture = useShellGestureOptional();
  const scrubbingRef = useRef(false);
  /** True when the window was already genie-poured — skip Transition leave flash. */
  const exitViaGenieRef = useRef(false);

  const phoneFullscreen = isIos;
  const showChrome = !phoneFullscreen && !app.titleBar;
  const isFullscreen = phoneFullscreen || app.fullscreen;
  const hideForSwitcher = isMobileShell && appSwitcher;

  const handleWindowFocus = () => {
    if (!app.active) {
      toggleApp(app.id)(dispatch);
    }
  };

  const clearScrubStyles = (el: HTMLElement) => {
    scrubbingRef.current = false;
    el.style.willChange = "";
    el.style.transition = "";
    el.style.transformOrigin = "";
    // Don't clear transform here — desktop/iPad interact owns it; phone idle has none.
    if (phoneFullscreen) {
      el.style.transform = "";
      el.style.borderRadius = "";
      el.style.opacity = hideForSwitcher ? "0" : "";
      el.style.backdropFilter = "";
      (
        el.style as CSSStyleDeclaration & { webkitBackdropFilter?: string }
      ).webkitBackdropFilter = "";
    }
  };

  // iPhone only: drive genie scrub via direct DOM (no React re-renders per frame).
  useEffect(() => {
    if (!gesture || !isIos || !app.active) return;

    // Keep the final genie frame painted while Transition unmounts.
    if (app.minimized) return;

    const apply = () => {
      const el = document.getElementById(app.id);
      if (!el) return;
      const mode = gesture.mode.get();
      const p = gesture.progress.get();

      if (mode === "home" && p > 0.55) exitViaGenieRef.current = true;
      else if (mode === "idle" || p < 0.15) exitViaGenieRef.current = false;

      if (mode !== "home" && mode !== "switcher") {
        if (scrubbingRef.current) clearScrubStyles(el);
        return;
      }

      const visual = genieFromProgress(
        p,
        mode,
        gesture.dragX.get(),
        gesture.dragY.get()
      );

      if (!visual.scrubbing) {
        if (scrubbingRef.current) clearScrubStyles(el);
        return;
      }

      scrubbingRef.current = true;
      el.style.willChange = "transform, opacity, border-radius";
      el.style.transition = "none";
      el.style.transformOrigin = visual.origin;
      el.style.transform = visual.transform;
      el.style.borderRadius = `${visual.radius}px`;
      el.style.opacity = hideForSwitcher ? "0" : String(visual.opacity);
      // Backdrop blur while warping is expensive and looks muddy.
      el.style.backdropFilter = "none";
      (
        el.style as CSSStyleDeclaration & { webkitBackdropFilter?: string }
      ).webkitBackdropFilter = "none";
    };

    const unsubs = [
      gesture.progress.on("change", apply),
      gesture.dragX.on("change", apply),
      gesture.dragY.on("change", apply),
      gesture.mode.on("change", apply),
    ];
    apply();
    return () => unsubs.forEach((u) => u());
  }, [gesture, isIos, app.active, app.minimized, app.id, hideForSwitcher]);

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
            // `.window-dragging` kills blur/shadow via CSS — don't touch inline
            // backdropFilter or React won't put the glass back after drag.
            el.classList.add("window-dragging");
            el.style.willChange = "transform";
            el.style.transition = "none";
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

  const genieExit = phoneFullscreen && exitViaGenieRef.current;
  const phoneLeave = genieExit
    ? "duration-0"
    : "duration-[480ms] ease-[cubic-bezier(0.32,0.72,0,1)]";
  const phoneLeaveTo = genieExit
    ? "opacity-0"
    : "opacity-0 origin-bottom translate-y-[42vh] scale-x-[0.1] scale-y-[0.05]";

  return (
    <Transition
      as="div"
      id={app.id}
      className="app-window flex flex-col absolute origin-center overflow-hidden"
      afterLeave={() => {
        exitViaGenieRef.current = false;
        scrubbingRef.current = false;
      }}
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
      enter={
        phoneFullscreen
          ? "duration-[420ms] ease-[cubic-bezier(0.32,0.72,0,1)] origin-bottom"
          : "origin-bottom duration-300"
      }
      enterFrom={
        phoneFullscreen
          ? "opacity-0 translate-y-[28vh] scale-x-[0.88] scale-y-[0.92]"
          : "opacity-0 translate-y-[40vh] scale-[0.92]"
      }
      enterTo="opacity-100 scale-100 translate-y-0"
      leave={phoneFullscreen ? phoneLeave : "duration-250"}
      leaveFrom="opacity-100 scale-100"
      leaveTo={
        phoneFullscreen
          ? phoneLeaveTo
          : "opacity-0 translate-y-[30vh] scale-[0.88]"
      }
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
