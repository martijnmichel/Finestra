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
          label: "New",
          submenu: [
            {
              label: "New Text File",
              shortcut: "⌘N"
            },
            {
              label: "New Window",
              shortcut: "⇧⌘N"
            },
            {
              label: "New Folder"
            },
            {
              label: "separator"
            },
            {
              label: "New File..."
            }
          ]
        },
        {
          label: "separator"
        },
        {
          label: "Open...",
          shortcut: "⌘O"
        },
        {
          label: "Open Folder..."
        },
        {
          label: "Open Workspace from File..."
        },
        {
          label: "separator"
        },
        {
          label: "Save",
          shortcut: "⌘S"
        },
        {
          label: "Save As...",
          shortcut: "⇧⌘S"
        },
        {
          label: "Save All",
          shortcut: "⌥⌘S",
          disabled: true
        },
        {
          label: "separator"
        },
        {
          label: "Workspace",
          submenu: [
            {
              label: "Add Folder to Workspace..."
            },
            {
              label: "Save Workspace As..."
            },
            {
              label: "Duplicate Workspace"
            },
            {
              label: "separator"
            },
            {
              label: "Share"
            }
          ]
        },
        {
          label: "separator"
        },
        {
          label: "Auto Save",
          type: "checkbox",
          checked: false
        },
        {
          label: "Revert File"
        },
        {
          label: "separator"
        },
        {
          label: "Close Editor",
          shortcut: "⌘W"
        },
        {
          label: "Close Folder",
          shortcut: "⇧⌘F"
        },
        {
          label: "Close Window",
          shortcut: "⇧⌘W",
          function: () => {
            closeApp(id)(dispatch);
          },
        },
      ],
    },
    {
      label: "Edit",
      items: [
        {
          label: "Undo",
          shortcut: "⌘Z"
        },
        {
          label: "Redo",
          shortcut: "⇧⌘Z"
        },
        {
          label: "separator"
        },
        {
          label: "Cut",
          shortcut: "⌘X"
        },
        {
          label: "Copy",
          shortcut: "⌘C"
        },
        {
          label: "Paste",
          shortcut: "⌘V"
        },
        {
          label: "separator"
        },
        {
          label: "Find",
          shortcut: "⌘F"
        },
        {
          label: "Replace",
          shortcut: "⌥⌘F"
        },
        {
          label: "separator"
        },
        {
          label: "Find",
          submenu: [
            {
              label: "Find in Files",
              shortcut: "⇧⌘F"
            },
            {
              label: "Replace in Files",
              shortcut: "⇧⌥⌘H"
            },
            {
              label: "separator"
            },
            {
              label: "Find in Selection"
            },
            {
              label: "Replace in Selection"
            }
          ]
        }
      ],
    },
    {
      label: "Selection",
      items: [
        {
          label: "Select All",
          shortcut: "⌘A"
        },
        {
          label: "Expand Selection",
          shortcut: "⌘⇧⌘→"
        },
        {
          label: "Shrink Selection",
          shortcut: "⌘⇧⌘←"
        },
        {
          label: "separator"
        },
        {
          label: "Copy Line Up",
          shortcut: "⇧⌥↑"
        },
        {
          label: "Copy Line Down",
          shortcut: "⇧⌥↓"
        },
        {
          label: "Move Line Up",
          shortcut: "⌥↑"
        },
        {
          label: "Move Line Down",
          shortcut: "⌥↓"
        }
      ],
    },
    {
      label: "View",
      items: [
        {
          label: "Command Palette...",
          shortcut: "⌘⇧P"
        },
        {
          label: "separator"
        },
        {
          label: "Explorer",
          shortcut: "⌘⇧E"
        },
        {
          label: "Search",
          shortcut: "⌘⇧F"
        },
        {
          label: "Source Control",
          shortcut: "⌃⇧G"
        },
        {
          label: "Run and Debug",
          shortcut: "⌘⇧D"
        },
        {
          label: "Extensions",
          shortcut: "⌘⇧X"
        },
        {
          label: "separator"
        },
        {
          label: "Toggle Terminal",
          shortcut: "⌃`"
        },
        {
          label: "Toggle Output",
          shortcut: "⌘⇧U"
        },
        {
          label: "Toggle Problems",
          shortcut: "⌘⇧M"
        }
      ],
    },
    {
      label: "Go",
      items: [
        {
          label: "Back",
          shortcut: "⌃-"
        },
        {
          label: "Forward",
          shortcut: "⌃⇧-"
        },
        {
          label: "separator"
        },
        {
          label: "Go to File...",
          shortcut: "⌘P"
        },
        {
          label: "Go to Symbol...",
          shortcut: "⌘⇧O"
        },
        {
          label: "Go to Definition",
          shortcut: "F12"
        },
        {
          label: "Go to Declaration",
          shortcut: "⌘F12"
        },
        {
          label: "Go to Type Definition",
          shortcut: "⌘⇧F12"
        },
        {
          label: "Go to Implementations",
          shortcut: "⌘F12"
        },
        {
          label: "separator"
        },
        {
          label: "Go to Line/Column...",
          shortcut: "⌃G"
        },
        {
          label: "Go to Bracket",
          shortcut: "⌃⇧\\"
        }
      ],
    },
    {
      label: "Run",
      items: [
        {
          label: "Start Debugging",
          shortcut: "F5"
        },
        {
          label: "Run Without Debugging",
          shortcut: "⌃F5"
        },
        {
          label: "Stop Debugging",
          shortcut: "⇧F5"
        },
        {
          label: "Restart Debugging",
          shortcut: "⌃⇧F5"
        },
        {
          label: "separator"
        },
        {
          label: "Toggle Breakpoint",
          shortcut: "F9"
        },
        {
          label: "New Breakpoint"
        },
        {
          label: "Enable All Breakpoints"
        },
        {
          label: "Disable All Breakpoints"
        }
      ],
    },
    {
      label: "Terminal",
      items: [
        {
          label: "New Terminal",
          shortcut: "⌃⇧`"
        },
        {
          label: "Split Terminal",
          shortcut: "⌃⇧5"
        },
        {
          label: "separator"
        },
        {
          label: "Run Active File"
        },
        {
          label: "Run Selected Text"
        },
        {
          label: "separator"
        },
        {
          label: "Terminal 1",
          shortcut: "⌃1"
        },
        {
          label: "Terminal 2",
          shortcut: "⌃2"
        }
      ],
    },
    {
      label: "Help",
      items: [
        {
          label: "Welcome"
        },
        {
          label: "Show All Commands"
        },
        {
          label: "Documentation"
        },
        {
          label: "separator"
        },
        {
          label: "Keyboard Shortcuts Reference"
        },
        {
          label: "Video Tutorials"
        },
        {
          label: "separator"
        },
        {
          label: "About"
        }
      ],
    },
  ];

  return (
    <div
      className="h-full rounded-lg overflow-hidden"
      
    >
      <AppNavigation items={navigation} id={id} />
      <div className="icon-container px-2 py-3" data-handle={id}>
        <AppActions id={id} />
      </div>
      <SandpackProvider
        style={{ width: "100%", height: "100%" }}
        
        files={modules}
        template="vite"
      >
        <SandpackLayout
          className="rounded-lg"
          style={{ width: "100%", height: "100%" }}
        >
          <SandpackFileExplorer
            initialCollapsedFolder={["/src"]}
            className="!min-w-70"
            style={{ height: "100%" }}
          />
          <SandpackCodeEditor showLineNumbers showTabs={false} style={{ height: "100%" }} />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};
