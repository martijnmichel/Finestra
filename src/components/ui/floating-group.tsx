import * as React from "react";
import { cn } from "@/lib/utils";

/** Floating macOS toolbar island (pill / rounded square) for grouped controls. */
export const FloatingGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    /** Tighter square island vs elongated capsule */
    shape?: "pill" | "rounded";
  }
>(({ className, shape = "pill", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "macos-floating-group inline-flex items-center gap-0.5 shrink-0 p-0.5",
      shape === "pill" ? "rounded-full" : "rounded-[10px]",
      className
    )}
    {...props}
  />
));
FloatingGroup.displayName = "FloatingGroup";

export const FloatingGroupButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    active?: boolean;
  }
>(({ className, active, type = "button", ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    data-active={active ? "true" : undefined}
    className={cn(
      "macos-floating-btn inline-flex size-7 items-center justify-center rounded-full",
      "hover:bg-black/[0.08] dark:hover:bg-white/[0.16] cursor-default disabled:pointer-events-none",
      "data-[active=true]:bg-black/[0.1] dark:data-[active=true]:bg-white/[0.2]",
      "[&_svg]:size-[15px] [&_svg]:shrink-0 [&_svg]:stroke-[2px]",
      className
    )}
    {...props}
  />
));
FloatingGroupButton.displayName = "FloatingGroupButton";
