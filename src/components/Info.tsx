import React from "react";
export const Info = ({ title, text }: { title: string; text: string }) => {
  return (
    <div className="flex flex-col gap-1 mb-3">
      <h5 className="text-base font-semibold tracking-tight">{title}</h5>
      <p className="leading-relaxed text-[15px] text-zinc-800">{text}</p>
    </div>
  );
};
