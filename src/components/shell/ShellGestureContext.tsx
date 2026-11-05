import React, {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import {
  animate,
  useMotionValue,
  type MotionValue,
} from "motion/react";

export type ShellGestureMode = "idle" | "library" | "home" | "switcher";

type ShellGestureApi = {
  progress: MotionValue<number>;
  dragX: MotionValue<number>;
  dragY: MotionValue<number>;
  mode: MotionValue<ShellGestureMode>;
  setProgress: (value: number) => void;
  setDragOffset: (x: number, y: number) => void;
  setMode: (mode: ShellGestureMode) => void;
  settleProgress: (to: number) => Promise<void>;
  settleDrag: () => Promise<void>;
  reset: () => void;
};

const ShellGestureContext = createContext<ShellGestureApi | null>(null);

export const ShellGestureProvider = ({ children }: { children: ReactNode }) => {
  const progress = useMotionValue(0);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const mode = useMotionValue<ShellGestureMode>("idle");

  const api = useMemo<ShellGestureApi>(
    () => ({
      progress,
      dragX,
      dragY,
      mode,
      setProgress: (value: number) => {
        progress.set(Math.min(1, Math.max(0, value)));
      },
      setDragOffset: (x: number, y: number) => {
        dragX.set(x);
        dragY.set(y);
      },
      setMode: (next) => mode.set(next),
      settleProgress: (to: number) =>
        new Promise((resolve) => {
          animate(progress, to, {
            type: "spring",
            stiffness: 380,
            damping: 36,
            mass: 0.85,
            onComplete: () => resolve(),
          });
        }),
      settleDrag: () =>
        Promise.all([
          new Promise<void>((resolve) => {
            animate(dragX, 0, {
              type: "spring",
              stiffness: 420,
              damping: 34,
              onComplete: () => resolve(),
            });
          }),
          new Promise<void>((resolve) => {
            animate(dragY, 0, {
              type: "spring",
              stiffness: 420,
              damping: 34,
              onComplete: () => resolve(),
            });
          }),
        ]).then(() => undefined),
      reset: () => {
        progress.set(0);
        dragX.set(0);
        dragY.set(0);
        mode.set("idle");
      },
    }),
    [progress, dragX, dragY, mode]
  );

  return (
    <ShellGestureContext.Provider value={api}>
      {children}
    </ShellGestureContext.Provider>
  );
};

export const useShellGesture = () => {
  const ctx = useContext(ShellGestureContext);
  if (!ctx) {
    throw new Error("useShellGesture must be used within ShellGestureProvider");
  }
  return ctx;
};

export const useShellGestureOptional = () => useContext(ShellGestureContext);
