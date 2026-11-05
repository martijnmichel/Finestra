import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

const XTooltip = ({
  children,
  label,
}: {
  children: React.ReactElement;
  label: string;
}) => {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="TooltipContent os-chrome"
            sideOffset={6}
          >
            {label}
            <Tooltip.Arrow className="TooltipArrow" width={10} height={5} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default XTooltip;
