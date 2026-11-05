import React, { useState } from "react";
import { Icon } from "@iconify/react";
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackConsole,
  useSandpack,
  type SandpackTheme,
} from "@codesandbox/sandpack-react";
import { AppIcon } from "../components/application/AppIcon";
import { Application } from "./application";
import IconPng from "../icons/vscode.png";
import { modules } from "../modules";
import { AppActions } from "../components/application/AppActions";
import { AppNavigation } from "../components/application/AppNavigation";
import { closeApp } from "../store/actions/closeApp";
import { useAppContext } from "../store";
import type { NavMenu } from "./types";
import { cn } from "@/lib/utils";

const DEFAULT_ACTIVE_FILE = (() => {
  const paths = Object.keys(modules);
  if (paths.includes("/src/applications/VSCode.tsx")) {
    return "/src/applications/VSCode.tsx";
  }
  return (
    paths.find((p) => p.endsWith("/App.tsx")) ||
    paths.find((p) => p.endsWith("/main.tsx")) ||
    paths[0]
  );
})();

/** VS Code Dark+ workbench + syntax tokens mapped onto Sandpack. */
const vscodeDarkPlus: SandpackTheme = {
  colors: {
    surface1: "#1e1e1e",
    surface2: "#252526",
    surface3: "#2d2d2d",
    disabled: "#848484",
    base: "#cccccc",
    clickable: "#cccccc",
    hover: "#e7e7e7",
    accent: "#007acc",
    error: "#f14c4c",
    errorSurface: "#5a1d1d",
    warning: "#cca700",
    warningSurface: "#5a4d00",
  },
  syntax: {
    plain: "#d4d4d4",
    comment: { color: "#6a9955", fontStyle: "italic" },
    keyword: "#569cd6",
    tag: "#569cd6",
    punctuation: "#d4d4d4",
    definition: "#dcdcaa",
    property: "#9cdcfe",
    static: "#b5cea8",
    string: "#ce9178",
  },
  font: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    mono: 'Menlo, Monaco, Consolas, "Courier New", monospace',
    size: "13px",
    lineHeight: "20px",
  },
};

type ActivityId = "explorer" | "search" | "scm" | "debug" | "extensions";

const ACTIVITY_ITEMS: {
  id: ActivityId;
  icon: string;
  label: string;
}[] = [
  { id: "explorer", icon: "codicon:files", label: "Explorer" },
  { id: "search", icon: "codicon:search", label: "Search" },
  { id: "scm", icon: "codicon:source-control", label: "Source Control" },
  { id: "debug", icon: "codicon:debug-alt", label: "Run and Debug" },
  { id: "extensions", icon: "codicon:extensions", label: "Extensions" },
];

const languageFromPath = (path: string) => {
  const name = path.split("/").pop() ?? path;
  const ext = name.includes(".") ? name.split(".").pop()!.toLowerCase() : "";
  switch (ext) {
    case "tsx":
      return "TypeScript JSX";
    case "ts":
      return "TypeScript";
    case "jsx":
      return "JavaScript JSX";
    case "js":
      return "JavaScript";
    case "css":
      return "CSS";
    case "json":
      return "JSON";
    case "html":
      return "HTML";
    case "md":
      return "Markdown";
    case "scss":
      return "SCSS";
    default:
      return ext ? ext.toUpperCase() : "Plain Text";
  }
};

const fileNameFromPath = (path: string) => path.split("/").pop() ?? path;

/** Sandpack Directory `prefixedPath` values always end with `/`. */
const explorerCollapsedFolders = (() => {
  const folders = new Set<string>();
  for (const filePath of Object.keys(modules)) {
    const segments = filePath.split("/").filter(Boolean);
    let acc = "";
    for (let i = 0; i < segments.length - 1; i++) {
      acc += `/${segments[i]}`;
      folders.add(`${acc}/`);
    }
  }
  // Keep `/src/` open so top-level folders stay visible (but collapsed).
  folders.delete("/src/");
  return [...folders];
})();

export class VSCode extends Application {
  static appName = "VSCode";
  public name = "VSCode";
  component = () => VSCodeApp(this.id);

  static icon = () => <AppIcon src={IconPng} alt="VSCode" />;
  public category = "default";
  width = window.innerWidth > 1600 ? 1200 : window.innerWidth * 0.667;
  height = window.innerHeight - 200;
  titleBar = true;
}

const TitleBarLabel = () => {
  const { sandpack } = useSandpack();
  const file = fileNameFromPath(sandpack.activeFile || "Welcome");
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center px-24 text-[12px] text-[#cccccc]">
      <span className="truncate">
        {file} — Finestra — Visual Studio Code
      </span>
    </span>
  );
};

const StatusBar = () => {
  const { sandpack } = useSandpack();
  const lang = languageFromPath(sandpack.activeFile || "");
  return (
    <div className="vscode-statusbar flex h-[22px] shrink-0 items-center justify-between gap-3 overflow-hidden px-0 text-[12px] leading-none text-white select-none">
      <div className="flex h-full min-w-0 items-center">
        <button
          type="button"
          className="flex h-full items-center gap-1.5 px-2.5 hover:bg-white/10"
          title="Finestra (Git)"
        >
          <Icon icon="codicon:source-control" className="size-3.5" />
          <span>main*</span>
        </button>
        <button
          type="button"
          className="flex h-full items-center gap-1.5 px-2 hover:bg-white/10"
          title="Problems"
        >
          <Icon icon="codicon:error" className="size-3.5" />
          <span>0</span>
          <Icon icon="codicon:warning" className="size-3.5" />
          <span>0</span>
        </button>
      </div>
      <div className="flex h-full min-w-0 items-center">
        <span className="hidden h-full items-center px-2 hover:bg-white/10 sm:flex">
          Ln 1, Col 1
        </span>
        <span className="hidden h-full items-center px-2 hover:bg-white/10 md:flex">
          Spaces: 2
        </span>
        <span className="hidden h-full items-center px-2 hover:bg-white/10 md:flex">
          UTF-8
        </span>
        <span className="flex h-full items-center px-2 hover:bg-white/10">
          {lang}
        </span>
        <span className="flex h-full items-center gap-1 px-2 hover:bg-white/10">
          <Icon icon="codicon:bell" className="size-3.5" />
        </span>
      </div>
    </div>
  );
};

const SidebarPanel = ({
  activity,
}: {
  activity: ActivityId;
}) => {
  const [explorerKey, setExplorerKey] = useState(0);

  if (activity === "explorer") {
    return (
      <>
        <div className="flex h-[35px] shrink-0 items-center justify-between px-4">
          <span className="text-[11px] font-semibold tracking-[0.04em] text-[#bbbbbb]">
            EXPLORER
          </span>
          <div className="flex items-center gap-1 text-[#cccccc]">
            <Icon icon="codicon:new-file" className="size-4 opacity-70" />
            <Icon icon="codicon:new-folder" className="size-4 opacity-70" />
            <Icon icon="codicon:refresh" className="size-4 opacity-70" />
            <button
              type="button"
              title="Collapse Folders in Explorer"
              aria-label="Collapse Folders in Explorer"
              className="flex items-center justify-center rounded-sm p-0.5 hover:bg-white/10"
              onClick={() => setExplorerKey((k) => k + 1)}
            >
              <Icon icon="codicon:collapse-all" className="size-4 opacity-70" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 pb-1 text-[11px] font-semibold tracking-wide text-[#cccccc]">
          <Icon icon="codicon:chevron-down" className="size-3.5 shrink-0" />
          <span className="truncate">FINESTRA</span>
        </div>
        <SandpackFileExplorer
          key={explorerKey}
          className="vscode-explorer min-h-0 flex-1 !w-full"
          style={{ height: "100%" }}
          initialCollapsedFolder={explorerCollapsedFolders}
        />
      </>
    );
  }

  const copy: Record<Exclude<ActivityId, "explorer">, { title: string; body: string }> = {
    search: {
      title: "SEARCH",
      body: "Search across the workspace. Open a file from Explorer to edit.",
    },
    scm: {
      title: "SOURCE CONTROL",
      body: "main* · 0 staged · 0 unstaged changes",
    },
    debug: {
      title: "RUN AND DEBUG",
      body: "To customize Run and Debug, create a launch.json file.",
    },
    extensions: {
      title: "EXTENSIONS",
      body: "Installed: Dark+ (default), Prettier, ESLint",
    },
  };

  const panel = copy[activity];
  return (
    <>
      <div className="flex h-[35px] shrink-0 items-center px-4">
        <span className="text-[11px] font-semibold tracking-[0.04em] text-[#bbbbbb]">
          {panel.title}
        </span>
      </div>
      <div className="px-4 py-2 text-[12px] leading-relaxed text-[#cccccc]/opacity-80">
        {panel.body}
      </div>
      {activity === "search" && (
        <div className="px-3">
          <input
            className="vscode-input w-full rounded-sm border-0 px-2 py-1 text-[12px] text-[#cccccc] outline-none"
            placeholder="Search"
            defaultValue=""
          />
        </div>
      )}
    </>
  );
};

export const VSCodeApp = (id: string) => {
  const { dispatch } = useAppContext();
  const [activity, setActivity] = useState<ActivityId>("explorer");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);

  const showSidebar = (next: ActivityId) => {
    if (activity === next && sidebarOpen) {
      setSidebarOpen(false);
      return;
    }
    setActivity(next);
    setSidebarOpen(true);
  };

  const navigation: NavMenu[] = [
    {
      label: "File",
      items: [
        {
          label: "New",
          submenu: [
            { label: "New Text File", shortcut: "⌘N" },
            { label: "New Window", shortcut: "⇧⌘N" },
            { label: "New Folder" },
            { label: "separator" },
            { label: "New File..." },
          ],
        },
        { label: "separator" },
        { label: "Open...", shortcut: "⌘O" },
        { label: "Open Folder..." },
        { label: "Open Workspace from File..." },
        { label: "separator" },
        { label: "Save", shortcut: "⌘S" },
        { label: "Save As...", shortcut: "⇧⌘S" },
        { label: "Save All", shortcut: "⌥⌘S", disabled: true },
        { label: "separator" },
        { label: "Close Editor", shortcut: "⌘W" },
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
        { label: "Undo", shortcut: "⌘Z" },
        { label: "Redo", shortcut: "⇧⌘Z" },
        { label: "separator" },
        { label: "Cut", shortcut: "⌘X" },
        { label: "Copy", shortcut: "⌘C" },
        { label: "Paste", shortcut: "⌘V" },
        { label: "separator" },
        { label: "Find", shortcut: "⌘F" },
        { label: "Replace", shortcut: "⌥⌘F" },
      ],
    },
    {
      label: "Selection",
      items: [
        { label: "Select All", shortcut: "⌘A" },
        { label: "Expand Selection", shortcut: "⌃⇧⌘→" },
        { label: "Shrink Selection", shortcut: "⌃⇧⌘←" },
        { label: "separator" },
        { label: "Copy Line Up", shortcut: "⇧⌥↑" },
        { label: "Copy Line Down", shortcut: "⇧⌥↓" },
        { label: "Move Line Up", shortcut: "⌥↑" },
        { label: "Move Line Down", shortcut: "⌥↓" },
      ],
    },
    {
      label: "View",
      items: [
        { label: "Command Palette...", shortcut: "⇧⌘P" },
        { label: "separator" },
        {
          label: "Explorer",
          shortcut: "⇧⌘E",
          function: () => showSidebar("explorer"),
        },
        {
          label: "Search",
          shortcut: "⇧⌘F",
          function: () => showSidebar("search"),
        },
        {
          label: "Source Control",
          shortcut: "⌃⇧G",
          function: () => showSidebar("scm"),
        },
        {
          label: "Run and Debug",
          shortcut: "⇧⌘D",
          function: () => showSidebar("debug"),
        },
        {
          label: "Extensions",
          shortcut: "⇧⌘X",
          function: () => showSidebar("extensions"),
        },
        { label: "separator" },
        {
          label: "Toggle Terminal",
          shortcut: "⌃`",
          function: () => setPanelOpen((v) => !v),
        },
        { label: "Toggle Output", shortcut: "⇧⌘U" },
        { label: "Toggle Problems", shortcut: "⇧⌘M" },
      ],
    },
    {
      label: "Go",
      items: [
        { label: "Back", shortcut: "⌃-" },
        { label: "Forward", shortcut: "⌃⇧-" },
        { label: "separator" },
        { label: "Go to File...", shortcut: "⌘P" },
        { label: "Go to Symbol...", shortcut: "⇧⌘O" },
        { label: "Go to Definition", shortcut: "F12" },
        { label: "Go to Line/Column...", shortcut: "⌃G" },
      ],
    },
    {
      label: "Run",
      items: [
        { label: "Start Debugging", shortcut: "F5" },
        { label: "Run Without Debugging", shortcut: "⌃F5" },
        { label: "Stop Debugging", shortcut: "⇧F5" },
        { label: "separator" },
        { label: "Toggle Breakpoint", shortcut: "F9" },
      ],
    },
    {
      label: "Terminal",
      items: [
        {
          label: "New Terminal",
          shortcut: "⌃⇧`",
          function: () => setPanelOpen(true),
        },
        {
          label: "Toggle Terminal",
          shortcut: "⌃`",
          function: () => setPanelOpen((v) => !v),
        },
      ],
    },
    {
      label: "Help",
      items: [
        { label: "Welcome" },
        { label: "Show All Commands" },
        { label: "Documentation" },
        { label: "separator" },
        { label: "About" },
      ],
    },
  ];

  return (
    <div className="vscode-window flex h-full flex-col overflow-hidden rounded-[inherit]">
      <AppNavigation items={navigation} id={id} appName="Code" />

      <SandpackProvider
        theme={vscodeDarkPlus}
        files={modules}
        template="vite"
        options={{
          recompileMode: "delayed",
          recompileDelay: 500,
          autorun: false,
          autoReload: false,
          initMode: "user-visible",
          activeFile: DEFAULT_ACTIVE_FILE,
          visibleFiles: DEFAULT_ACTIVE_FILE ? [DEFAULT_ACTIVE_FILE] : undefined,
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
          width: "100%",
          height: "100%",
        }}
        className="vscode-sandpack min-h-0 flex-1"
      >
        <div
          className="vscode-titlebar relative flex h-[38px] shrink-0 items-center px-3"
          data-handle={id}
        >
          <AppActions id={id} />
          <TitleBarLabel />
        </div>

        <div className="flex min-h-0 flex-1">
          {/* Activity bar */}
          <div className="vscode-activitybar flex w-12 shrink-0 flex-col items-center justify-between py-1">
            <div className="flex w-full flex-col items-center">
              {ACTIVITY_ITEMS.map((item) => {
                const active = sidebarOpen && activity === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    title={item.label}
                    aria-label={item.label}
                    aria-pressed={active}
                    onClick={() => showSidebar(item.id)}
                    className={cn(
                      "vscode-activity-btn relative flex h-12 w-full items-center justify-center text-[#858585] transition-colors hover:text-[#ffffff]",
                      active && "text-[#ffffff]"
                    )}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 bg-white" />
                    )}
                    <Icon icon={item.icon} className="size-6" />
                  </button>
                );
              })}
            </div>
            <div className="flex w-full flex-col items-center pb-1">
              <button
                type="button"
                title="Accounts"
                className="flex h-12 w-full items-center justify-center text-[#858585] hover:text-white"
              >
                <Icon icon="codicon:account" className="size-6" />
              </button>
              <button
                type="button"
                title="Manage"
                className="flex h-12 w-full items-center justify-center text-[#858585] hover:text-white"
              >
                <Icon icon="codicon:settings-gear" className="size-6" />
              </button>
            </div>
          </div>

          {/* Side bar */}
          {sidebarOpen && (
            <div className="vscode-sidebar flex w-[260px] shrink-0 flex-col border-r border-[#1e1e1e]">
              <SidebarPanel activity={activity} />
            </div>
          )}

          {/* Editor + panel */}
          <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#1e1e1e]">
            <SandpackCodeEditor
              showLineNumbers
              showTabs
              closableTabs
              showRunButton={false}
              className="vscode-editor min-h-0 flex-1"
              style={{ height: "100%", flex: 1 }}
            />

            {panelOpen && (
              <div className="vscode-panel flex h-[180px] shrink-0 flex-col border-t border-[#3c3c3c]">
                <div className="flex h-9 shrink-0 items-end gap-4 px-4 text-[11px]">
                  <button
                    type="button"
                    className="border-b border-white pb-1.5 font-medium tracking-wide text-[#e7e7e7]"
                  >
                    TERMINAL
                  </button>
                  <button
                    type="button"
                    className="pb-1.5 tracking-wide text-[#969696] hover:text-[#e7e7e7]"
                  >
                    PROBLEMS
                  </button>
                  <button
                    type="button"
                    className="pb-1.5 tracking-wide text-[#969696] hover:text-[#e7e7e7]"
                  >
                    OUTPUT
                  </button>
                  <div className="ml-auto pb-1.5">
                    <button
                      type="button"
                      aria-label="Close Panel"
                      className="text-[#cccccc] hover:text-white"
                      onClick={() => setPanelOpen(false)}
                    >
                      <Icon icon="codicon:close" className="size-4" />
                    </button>
                  </div>
                </div>
                <SandpackConsole
                  className="min-h-0 flex-1 !rounded-none"
                  style={{ height: "100%" }}
                  showHeader={false}
                />
              </div>
            )}
          </div>
        </div>

        <StatusBar />
      </SandpackProvider>
    </div>
  );
};
