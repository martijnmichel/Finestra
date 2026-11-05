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
  type ValueAnimationTransition,
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
  settleProgress: (
    to: number,
    transition?: ValueAnimationTransition<number>
  ) => Promise<void>;
  settleDrag: (
    transition?: ValueAnimationTransition<number>
  ) => Promise<void>;
  reset: () => void;
};

const ShellGestureContext = createContext<ShellGestureApi | null>(null);

const SPRING_PROGRESS: ValueAnimationTransition<number> = {
  type: "spring",
  stiffness: 380,
  damping: 36,
  mass: 0.85,
};

const SPRING_DRAG: ValueAnimationTransition<number> = {
  type: "spring",
  stiffness: 420,
  damping: 34,
};

/** Ease used for the home-dismiss “genie suck”. */
export const GENIE_SETTLE: ValueAnimationTransition<number> = {
  type: "tween",
  duration: 0.48,
  ease: [0.32, 0.72, 0, 1],
};

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
      settleProgress: (to, transition = SPRING_PROGRESS) =>
        new Promise((resolve) => {
          animate(progress, to, {
            ...transition,
            onComplete: () => resolve(),
          });
        }),
      settleDrag: (transition = SPRING_DRAG) =>
        Promise.all([
          new Promise<void>((resolve) => {
            animate(dragX, 0, {
              ...transition,
              onComplete: () => resolve(),
            });
          }),
          new Promise<void>((resolve) => {
            animate(dragY, 0, {
              ...transition,
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
