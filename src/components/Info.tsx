import React from "react";
export const Info = ({ title, text }: { title: string; text: string }) => {
  return (
    <div className="flex flex-col gap-1 mb-3">
      <h5 className="text-base font-semibold tracking-tight text-foreground">
        {title}
      </h5>
      <p className="os-chrome leading-relaxed text-[15px] text-foreground/85">
        {text}
      </p>
    </div>
  );
};
