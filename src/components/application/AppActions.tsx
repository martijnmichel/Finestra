import { Icon } from "@iconify/react";
import React from "react";
import { useAppContext } from "../../store";
import { closeApp } from "../../store/actions/closeApp";
import { hideApp } from "../../store/actions/hideApp";
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
        <Icon className="hidden group-hover:block" icon="ep:close" />
      </div>
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          hideApp(id)(dispatch);
        }}
        className="application-button minimize group"
      >
        <Icon
          className="hidden group-hover:block"
          icon="codicon:chrome-minimize"
        />
      </div>
      <div className="application-button maximize group">
        <Icon
          className="hidden group-hover:block"
          icon="fluent:arrow-maximize-16-filled"
        />
      </div>
    </div>
  );
};
