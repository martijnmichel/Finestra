import React, { useEffect, useRef, useState } from "react";
import { Application } from "./application";
import Icon from "../icons/vscode.png";
import { last, map, reduce, tail } from "lodash";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { monokaiPro, nightOwl } from "@codesandbox/sandpack-themes";
import { modules } from "../modules";
import { AppActions } from "../components/application/AppActions";
import { useAppContext } from "../store";
import { startApp } from "../store/actions/startApp";
import { closeApp } from "../store/actions/closeApp";
import { AppNavigation } from "../components/application/AppNavigation";
import { Applications, NavMenu } from ".";

type File = {
  ext: string;
  language: string;
  code: string;
  filename: string;
  path: string;
};

const files = map(modules, (code, m) => {
  const ext = last(m.split("."));
  const filename = last(m.split("/"));

  return {
    ext,
    filename,
    path: m,
    code,
  } as File;
});

export class VSCode extends Application {
  public name = "VSCode";
  component = () => VSCodeApp(this.id);

  static icon = () => <img src={Icon} alt="Logo" />;
  public category = "default";
  width = window.innerWidth > 1600 ? 1200 : window.innerWidth * 0.667;
  height = window.innerHeight - 200;
  titleBar = true;
}

export const VSCodeApp = (id: string) => {
  const { dispatch } = useAppContext();

  const navigation: NavMenu[] = [
    {
      label: "File",
      items: [
        {
          label: "New Window",
          function: () => {
            startApp("VSCode")(dispatch);
          },
        },
        {
          label: "separator",
        },
        {
          label: "Close",
          function: () => {
            closeApp(id)(dispatch);
          },
        },
      ],
    },
  ];

  return (
    <div
      className="h-full rounded-lg overflow-hidden"
      style={{ backgroundColor: "#061526" }}
    >
      <AppNavigation items={navigation} id={id} />
      <div className="icon-container px-2 py-3" data-handle={id}>
        <AppActions id={id} />
      </div>
      <SandpackProvider
        style={{ width: "100%", height: "100%" }}
        theme={nightOwl}
        files={modules}
        template="vite"
      >
        <SandpackLayout
          className="rounded-lg"
          style={{ width: "100%", height: "100%" }}
        >
          <SandpackFileExplorer
            initialCollapsedFolder={["!/src/applications"]}
            style={{ height: "100%", width: 300 }}
          />
          <SandpackCodeEditor showLineNumbers style={{ height: "100%" }} />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};
