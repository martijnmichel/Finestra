import React from "react";
import { cn } from "@/lib/utils";

/** Consistent dock / desktop / launchpad app icon sizing. */
export function AppIcon({
  src,
  alt = "",
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      className={cn(
        "block size-full max-w-none object-contain select-none pointer-events-none",
        className
      )}
    />
  );
}
