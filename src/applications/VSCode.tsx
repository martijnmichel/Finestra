import React, { useEffect, useRef, useState } from "react";
import { Application } from "../store/atoms/applications";
import Icon from "../icons/vscode.png";
import { Icon as IIcon } from "@iconify/react";
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
import { AppActions } from "../components/application/AppActions";

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
];

export class VSCode extends Application {
  public name = "VSCode";
  component = () => VSCodeApp(this.id);
  navigation = () => navigation(this.id);
  static icon = () => <img src={Icon} alt="Logo" />;
  public category = "default";
  width = window.innerWidth - 100;
  height = window.innerHeight - 300;
  titleBar = true;
}

export const VSCodeApp = (id: string) => {
  console.log(files);
  return (
    <div
      className="h-full rounded-lg overflow-hidden"
      style={{ backgroundColor: "#061526" }}
    >
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
