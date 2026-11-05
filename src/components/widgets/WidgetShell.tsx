import React from "react";
import { cn } from "@/lib/utils";

export type WidgetSize = "sm" | "md" | "lg" | "fill";

const sizeClass: Record<WidgetSize, string> = {
  // Approximate Apple widget footprints (desktop / stacked)
  sm: "h-[150px] w-[150px]",
  md: "h-[150px] w-full max-w-[338px]",
  lg: "h-[354px] w-full max-w-[338px]",
  /** Home Screen CSS grid — cell defines size */
  fill: "h-full w-full max-w-none min-h-0 min-w-0",
};

/** Shared Liquid Glass shell matching iOS / macOS widgets. */
export function WidgetShell({
  size = "md",
  className,
  style,
  onClick,
  children,
  "aria-label": ariaLabel,
}: {
  size?: WidgetSize;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  const shared = {
    "aria-label": ariaLabel,
    className: cn(
      "pointer-events-auto relative overflow-hidden text-left",
      "rounded-[22px] border border-white/35 dark:border-white/15",
      "shadow-[0_8px_28px_rgba(0,0,0,0.22),inset_0_0.5px_0_rgba(255,255,255,0.55)]",
      onClick &&
        "cursor-pointer transition-[transform,filter] active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--macos-accent)]",
      sizeClass[size],
      className
    ),
    style: {
      background: "var(--dock-bg, rgba(245,245,247,0.72))",
      backdropFilter:
        "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
      WebkitBackdropFilter:
        "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
      ...style,
    } as React.CSSProperties,
  };

  if (onClick) {
    return (
      <button type="button" onClick={onClick} {...shared}>
        {children}
      </button>
    );
  }

  return <div {...shared}>{children}</div>;
}
