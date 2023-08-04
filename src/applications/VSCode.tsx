import React, { useEffect, useRef, useState } from "react";
import { Application } from "../store/atoms/applications";
import Icon from "../icons/vscode.png";
import { useWindowManager } from "../services/WindowManager";
import { Editor, EditorProps } from "@monaco-editor/react";
import { last, map, reduce, tail } from "lodash";

const modules = import.meta.glob("../../**/*.{tsx,ts,css,json}", {
  as: "raw",
  eager: true,
});

type File = {
  ext: string;
  language: string;
  code: string;
  filename: string;
  path: string
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
  width = 800;
  height = 600;
}

export const VSCodeApp = () => {
  const [file, setFile] = useState<File>();
  const [tree, setTree] = useState<any>()

const ref = useRef<EditorProps>(null)

  console.log(files);
  return (
    <div className="h-full flex items-stretch">
      <div className="w-[250px] text-xs h-full overflow-auto bg-black text-zinc-300 flex flex-col items-start p-2">
      

        {map(files, (f, k) => {
          return (
            <button key={`file${f.path}`} onClick={() => setFile(f)}>
              {f.filename}
            </button>
          );
        })}
      </div>
      <Editor
        theme="vs-dark"
        height="100%"
        language={file?.language}
        value={file?.code || "Selecteer een bestand..."}
      />
      ;
    </div>
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
