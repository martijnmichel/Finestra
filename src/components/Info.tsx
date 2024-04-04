import React from "react";
export const Info = ({ title, text }: { title: string; text: string }) => {
  return (
    <div className="flex flex-col">
      <h5 className="text-sm font-semibold">{title}</h5>
      <p>{text}</p>
    </div>
  );
};
