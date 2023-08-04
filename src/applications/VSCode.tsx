import React, { useEffect, useRef, useState } from "react";
import { Application } from "../store/atoms/applications";
import Icon from "../icons/vscode.png";
import { useWindowManager } from "../services/WindowManager";
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

  const language = (ext: string) => {
    switch (ext) {
      case "tsx":
        return "javascript";
      case "json":
        return "json";
      case "css":
        return "css";
      default:
        return "javascript";
    }
  };
  return {
    ext,
    language: language(ext!),
    filename,
    path: m,
    code,
  } as File;
});

export class VSCode extends Application {
  public name = "VSCode";
  component = () => VSCodeApp();
  static icon = () => <img src={Icon} alt="Logo" />;
  public category = "default";
  width = window.innerWidth - 100;
  height = window.innerHeight - 300;
}

export const VSCodeApp = () => {
  console.log(files);
  return (
    <SandpackProvider
      style={{ width: "100%", height: "100%" }}
      theme={nightOwl}
      files={modules}
      template="vite"
    >
      <SandpackLayout style={{ width: "100%", height: "100%" }}>
        <SandpackFileExplorer
          initialCollapsedFolder={["/src/applications"]}
          style={{ height: "100%", width: 200 }}
        />
        <SandpackCodeEditor style={{ height: "100%" }} />
      </SandpackLayout>
    </SandpackProvider>
  );
};

export const navigation = (id: string) => [
  {
    label: "File",
    items: [
      {
        label: "New File",
        function: () => {
          const { startApp } = useWindowManager();
          startApp("Text Editor");
        },
      },
      {
        label: "New Window",
        function: () => {
          const { startApp } = useWindowManager();
          startApp("Text Editor");
        },
      },
      {
        label: "separator",
      },
      {
        label: "Close",
        function: () => {
          const { closeApp } = useWindowManager();
          closeApp(id);
        },
      },
    ],
  },
  {
    label: "Window",
    items: [
      {
        label: "New File",
        function: () => {
          const { startApp } = useWindowManager();
          startApp("Text Editor");
        },
      },
      {
        label: "New Window",
        function: () => {
          const { startApp } = useWindowManager();
          startApp("Text Editor");
        },
      },
      {
        label: "separator",
      },
      {
        label: "Close",
        function: () => {
          const { closeApp } = useWindowManager();
          closeApp(id);
        },
      },
    ],
  },
];
