import React from "react";
import { cn } from "@/lib/utils";

/**
 * Dock / desktop / launchpad icon.
 *
 * Native macOS PNGs already include transparent margin around the squircle.
 * Flat project assets fill the canvas, so `squircle` scales them down (~82%)
 * and clips to continuous-corner radius so they match native optical size.
 */
export function AppIcon({
  src,
  alt = "",
  className,
  squircle = false,
}: {
  src: string;
  alt?: string;
  className?: string;
  /** Match native icon padding + corner radius for full-bleed square assets. */
  squircle?: boolean;
}) {
  return (
    <span className={cn("relative block size-full", className)}>
      <img
        src={src}
        alt={alt}
        draggable={false}
        className={cn(
          "pointer-events-none absolute select-none object-cover",
          squircle
            ? "left-1/2 top-1/2 h-[76%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-[22%] shadow-sm"
            : "inset-0 size-full"
        )}
      />
    </span>
  );
}
