import React from "react";
import { Maximize2, Minus, X } from "lucide-react";
import { useAppContext } from "../../store";
import { closeApp } from "../../store/actions/closeApp";
import { hideApp } from "../../store/actions/hideApp";
import { toggleFullscreen } from "@/store/actions/toggleFullscreen";

export const AppActions = ({ id }: { id: string }) => {
  const { dispatch } = useAppContext();
  return (
    <div className="application-button-container">
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          closeApp(id)(dispatch);
        }}
        className="application-button close group"
      >
        <X className="hidden size-3 group-hover:block" />
      </div>
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          hideApp(id)(dispatch);
        }}
        className="application-button minimize group"
      >
        <Minus className="hidden size-3 group-hover:block" />
      </div>
      <div
        className="application-button maximize group"
        onClick={() => {
          toggleFullscreen(id)(dispatch);
        }}
      >
        <Maximize2 className="hidden size-3 group-hover:block" />
      </div>
    </div>
  );
};
