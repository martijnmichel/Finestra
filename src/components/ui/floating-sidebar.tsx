import * as React from "react";
import { cn } from "@/lib/utils";

type FloatingSidebarShellProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Background behind the floating sidebar (usually settings/window content token). */
  shellStyle?: React.CSSProperties;
};

/**
 * Window chrome shell with inset padding so both sidebar and content can float.
 */
export const FloatingSidebarShell = React.forwardRef<
  HTMLDivElement,
  FloatingSidebarShellProps
>(({ className, style, shellStyle, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "macos-floating-shell flex h-full min-h-0 w-full gap-2.5 p-2.5",
      className
    )}
    style={{ ...shellStyle, ...style }}
    {...props}
  />
));
FloatingSidebarShell.displayName = "FloatingSidebarShell";

type FloatingSidebarProps = React.HTMLAttributes<HTMLElement> & {
  width?: number | string;
  /** Hide below a container query breakpoint (e.g. Finder). */
  collapseBelow?: "@xl" | "never";
};

/** Inset Liquid Glass sidebar — floats with full rounding. */
export const FloatingSidebar = React.forwardRef<
  HTMLElement,
  FloatingSidebarProps
>(
  (
    {
      className,
      width = 220,
      collapseBelow = "never",
      style,
      children,
      ...props
    },
    ref
  ) => (
    <aside
      ref={ref}
      className={cn(
        "macos-floating-sidebar flex flex-col shrink-0 min-h-0 overflow-hidden",
        collapseBelow === "@xl" && "hidden @xl/window:flex",
        className
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        ...style,
      }}
      {...props}
    >
      {children}
    </aside>
  )
);
FloatingSidebar.displayName = "FloatingSidebar";

/**
 * Floating main pane next to FloatingSidebar — full 16px rounding on all corners.
 */
export const FloatingSidebarContent = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, style, ...props }, ref) => (
  <main
    ref={ref}
    className={cn(
      "macos-floating-pane relative flex flex-1 min-w-0 min-h-0 flex-col overflow-hidden rounded-[16px]",
      className
    )}
    style={style}
    {...props}
  />
));
FloatingSidebarContent.displayName = "FloatingSidebarContent";
