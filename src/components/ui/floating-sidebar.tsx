import * as React from "react";
import { cn } from "@/lib/utils";

type FloatingSidebarShellProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Background behind the floating sidebar (usually settings/window content token). */
  shellStyle?: React.CSSProperties;
};

/**
 * Window chrome shell: left padding so the sidebar can float; content stays flush.
 * Put `<FloatingSidebar>` then your main pane as children.
 */
export const FloatingSidebarShell = React.forwardRef<
  HTMLDivElement,
  FloatingSidebarShellProps
>(({ className, style, shellStyle, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full min-h-0 w-full gap-2.5 pl-2.5 py-2.5 pr-0",
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

/** Inset Liquid Glass sidebar — floats; content beside it should stay flush. */
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

/** Flush main pane next to FloatingSidebar (not a second floating card). */
export const FloatingSidebarContent = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, style, ...props }, ref) => (
  <main
    ref={ref}
    className={cn(
      "relative flex flex-1 min-w-0 min-h-0 flex-col overflow-hidden",
      className
    )}
    style={style}
    {...props}
  />
));
FloatingSidebarContent.displayName = "FloatingSidebarContent";
