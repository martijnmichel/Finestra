import React from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/** iPhone in-app top bar — Done / Back over fullscreen apps. */
export function PhoneAppChrome({
  title,
  onDone,
  onBack,
  backLabel = "Back",
  doneLabel = "Done",
  className,
  children,
}: {
  title?: string;
  onDone?: () => void;
  onBack?: () => void;
  backLabel?: string;
  doneLabel?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <header
      className={cn(
        "relative z-[5] flex h-11 shrink-0 items-center gap-2 px-3",
        "border-b border-black/[0.08] dark:border-white/[0.1]",
        className
      )}
      style={{
        background: "var(--window-toolbar, var(--dock-bg))",
        backdropFilter:
          "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
        WebkitBackdropFilter:
          "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
      }}
    >
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="os-chrome inline-flex min-w-[64px] items-center gap-0.5 text-[17px] tracking-[-0.4px] text-[var(--macos-accent)]"
        >
          <ChevronLeft className="size-5 -ml-1" strokeWidth={2.5} />
          <span className="truncate">{backLabel}</span>
        </button>
      ) : (
        <span className="min-w-[64px]" />
      )}

      <div className="min-w-0 flex-1 text-center">
        {title ? (
          <p className="os-chrome-em truncate text-[17px] tracking-[-0.4px]">
            {title}
          </p>
        ) : (
          children
        )}
      </div>

      {onDone ? (
        <button
          type="button"
          onClick={onDone}
          className="os-chrome-em min-w-[64px] text-right text-[17px] tracking-[-0.4px] text-[var(--macos-accent)]"
        >
          {doneLabel}
        </button>
      ) : (
        <span className="min-w-[64px]" />
      )}
    </header>
  );
}
