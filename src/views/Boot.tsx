import React from "react";
import { Icon } from "@iconify/react";
import { Loader2 } from "lucide-react";

export const Boot = () => {
  return (
    <div className="w-screen h-screen bg-gray-900 flex flex-col gap-10 justify-center items-center">
      <Icon className="text-[7em] text-white" icon="ant-design:apple-filled" />

      <Loader2 className="text-white size-8 animate-spin" />

      <div className="w-40 h-[5px] rounded-lg relative bg-white/50">
        <div className="bg-white/90 w-1/2 h-full absolute inset-0"></div>
      </div>
    </div>
  );
};
