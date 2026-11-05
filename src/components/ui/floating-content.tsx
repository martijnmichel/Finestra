import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Inset floating content pane (Finder-style).
 * Sidebar/toolbar stay flush in the window chrome; only this surface floats.
 */
export const FloatingContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "macos-floating-content relative flex flex-1 min-h-0 min-w-0 flex-col overflow-hidden rounded-[10px]",
      className
    )}
    {...props}
  />
));
FloatingContent.displayName = "FloatingContent";
