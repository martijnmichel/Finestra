import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-[13px] font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-[color-mix(in_srgb,var(--macos-accent)_35%,transparent)] cursor-default",
  {
    variants: {
      variant: {
        default: "macos-button-primary rounded-[6px]",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 rounded-[6px] h-[28px] px-3",
        outline:
          "macos-button border border-black/10 dark:border-white/15",
        secondary: "macos-button",
        ghost:
          "hover:bg-black/[0.06] dark:hover:bg-white/[0.08] rounded-[6px] text-foreground",
        link: "text-[var(--macos-accent)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[28px] px-3 has-[>svg]:px-2.5",
        sm: "h-[24px] rounded-[5px] gap-1.5 px-2.5 has-[>svg]:px-2",
        lg: "h-[32px] rounded-[7px] px-4 has-[>svg]:px-3",
        icon: "size-7 rounded-[6px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
