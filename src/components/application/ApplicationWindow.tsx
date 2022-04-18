import interact from "interactjs";
import React from "react";
import { Application } from "../../store/atoms/applications";

import "./App.css";
import { AppActions } from "./AppActions";

import { useWindowManager } from "../../services/WindowManager";
import { Transition } from "@headlessui/react";

export const ApplicationWindow = (app: Application) => {
  const position = { x: 0, y: 0 };
  const { toggleApp, updateWindow } = useWindowManager();

  const handleWindowClick = () => {
    toggleApp(app.id);
  };

  function handleCanvas(div: HTMLElement) {
    interact(div)
      .draggable({
        allowFrom: `[data-handle="${app.id}"]`,
        listeners: {
          start(event) {
            console.log(event.type, event.target);
          },
          move(event) {
            position.x += event.dx;
            position.y += event.dy;

            div.setAttribute("data-x", event.dx);
            div.setAttribute("data-y", event.dy);

            event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;

            updateWindow(app.id, {
              x: position.x,
              y: position.y,
            });
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

            updateWindow(app.id, {
              width: event.rect.width,
              height: event.rect.height,
            });
          },
        },
        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: "parent",
          }),

          // minimum size
          interact.modifiers.restrictSize({
            min: { width: 100, height: 50 },
          }),
        ],

        inertia: true,
      });
  }

  // set up the mutation observer
  var observer = new MutationObserver(function (mutations, me) {
    // `mutations` is an array of mutations that occurred
    // `me` is the MutationObserver instance
    var canvas = document.getElementById(app.id);
    if (canvas) {
      handleCanvas(canvas);
      me.disconnect(); // stop observing
      return;
    }
  });

  // start observing
  observer.observe(document, {
    childList: true,
    subtree: true,
  });

  return (
    <Transition
      as="div"
      id={app.id}
      className="flex flex-col absolute left-10 top-10 border-1 border-gray-50 bg-gradient-to-t from-neutral-300 to-neutral-200 shadow-lg rounded-lg"
      style={{
        width: app.width,
        height: app.height,
        transform: `translateX(${app.x}) translateY(${app.y})`,
        zIndex: app.active ? 1 : 0,
      }}
      enter="transition-all origin-bottom duration-300"
      enterFrom="opacity-0 translate-y-[80vh] scale-x-[0.2] scale-y-[0.6]"
      enterTo={`opacity-100 scale-x-100 scale-y-100`}
      leave="transition-all duration-300"
      leaveFrom={`opacity-100 scale-100`}
      leaveTo={`opacity-0 translate-y-[80vh] scale-x-[0.2] scale-y-[0.6]`}
      show={app.visible}
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
        className={`bg-white h-full flex-grow rounded-b-lg ${
          app.titleBar ? "rounded-t-lg" : ""
        }`}
      >
        {app.component && app.component()}
      </div>
    </Transition>
  );
};
