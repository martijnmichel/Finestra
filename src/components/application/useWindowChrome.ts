import { useEffect, useRef, type RefObject } from "react";
import type { Dispatch } from "react";
import { updateAppWindow } from "../../store/actions/updateAppWindow";
import type { ActionUpdateAppWindow } from "../../store/actions/updateAppWindow";

type Bounds = { x: number; y: number; width: number; height: number };

type Options = {
  enabled: boolean;
  appId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  dispatch: Dispatch<ActionUpdateAppWindow>;
  onDragClass?: string;
};

type Mode = "drag" | "resize-e" | "resize-s" | "resize-se";

/**
 * Pointer-based window drag + resize. No interact.js —
 * dedicated edge handles + titlebar [data-handle], commit on pointerup only.
 */
export function useWindowChrome(
  windowRef: RefObject<HTMLElement | null>,
  options: Options
) {
  const bounds = useRef<Bounds>({
    x: options.x,
    y: options.y,
    width: options.width,
    height: options.height,
  });
  const optsRef = useRef(options);
  optsRef.current = options;

  // Keep DOM + ref in sync when store updates (not mid-gesture).
  useEffect(() => {
    bounds.current = {
      x: options.x,
      y: options.y,
      width: options.width,
      height: options.height,
    };
    const el = windowRef.current;
    if (!el || !options.enabled) return;
    el.style.transform = `translate3d(${options.x}px, ${options.y}px, 0)`;
    el.style.width = `${options.width}px`;
    el.style.height = `${options.height}px`;
  }, [
    options.x,
    options.y,
    options.width,
    options.height,
    options.enabled,
    windowRef,
  ]);

  useEffect(() => {
    const el = windowRef.current;
    if (!el || !options.enabled) return;

    const minW = () => optsRef.current.minWidth ?? 400;
    const minH = () => optsRef.current.minHeight ?? 300;

    let mode: Mode | null = null;
    let startX = 0;
    let startY = 0;
    let origin: Bounds = { x: 0, y: 0, width: 0, height: 0 };
    let moved = false;
    let pointerId: number | null = null;

    const apply = (next: Bounds) => {
      bounds.current = next;
      el.style.transform = `translate3d(${next.x}px, ${next.y}px, 0)`;
      el.style.width = `${next.width}px`;
      el.style.height = `${next.height}px`;
    };

    const beginChrome = () => {
      const cls = optsRef.current.onDragClass;
      if (cls) el.classList.add(cls);
      el.style.willChange = "transform, width, height";
      el.style.transition = "none";
      el.style.boxShadow = "none";
      el.style.backdropFilter = "none";
      (
        el.style as CSSStyleDeclaration & { webkitBackdropFilter?: string }
      ).webkitBackdropFilter = "none";
    };

    const endChrome = () => {
      const cls = optsRef.current.onDragClass;
      if (cls) el.classList.remove(cls);
      el.style.willChange = "";
      el.style.transition = "";
      el.style.boxShadow = "";
      el.style.backdropFilter = "";
      (
        el.style as CSSStyleDeclaration & { webkitBackdropFilter?: string }
      ).webkitBackdropFilter = "";
    };

    const onMove = (e: PointerEvent) => {
      if (mode == null || e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!moved && dx * dx + dy * dy < 4) return;
      moved = true;

      if (mode === "drag") {
        apply({
          ...origin,
          x: origin.x + dx,
          y: origin.y + dy,
        });
        return;
      }

      let width = origin.width;
      let height = origin.height;
      if (mode === "resize-e" || mode === "resize-se") {
        width = Math.max(minW(), origin.width + dx);
      }
      if (mode === "resize-s" || mode === "resize-se") {
        height = Math.max(minH(), origin.height + dy);
      }
      apply({ ...origin, width, height });
    };

    const onUp = (e: PointerEvent) => {
      if (pointerId != null && e.pointerId !== pointerId) return;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);

      const was = mode;
      const didMove = moved;
      mode = null;
      pointerId = null;
      endChrome();

      if (!was || !didMove) return;
      const b = bounds.current;
      updateAppWindow(optsRef.current.appId, {
        x: b.x,
        y: b.y,
        width: b.width,
        height: b.height,
      })(optsRef.current.dispatch);
    };

    const start = (e: PointerEvent, next: Mode) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      // Don't start drag from interactive chrome inside the handle.
      const t = e.target as HTMLElement | null;
      if (
        next === "drag" &&
        t?.closest("button, a, input, textarea, [data-no-window-drag]")
      ) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      mode = next;
      moved = false;
      pointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      origin = { ...bounds.current };
      beginChrome();
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const resize = target.closest(
        "[data-window-resize]"
      ) as HTMLElement | null;
      if (resize && el.contains(resize)) {
        const edge = resize.dataset.windowResize as
          | "e"
          | "s"
          | "se"
          | undefined;
        if (edge === "e") start(e, "resize-e");
        else if (edge === "s") start(e, "resize-s");
        else if (edge === "se") start(e, "resize-se");
        return;
      }

      const handle = target.closest(
        `[data-handle="${optsRef.current.appId}"]`
      ) as HTMLElement | null;
      if (handle && el.contains(handle)) {
        start(e, "drag");
      }
    };

    el.addEventListener("pointerdown", onPointerDown);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      endChrome();
    };
  }, [options.enabled, options.appId, windowRef]);
}
