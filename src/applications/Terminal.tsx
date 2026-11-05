import React, { useEffect, useRef } from "react";
import { AppIcon } from "../components/application/AppIcon";
import { Application } from "./application";
import Icon from "../icons/Terminal.png";
import { startApp } from "@/store/actions/startApp";
import type { AssistantActionDef } from "@/lib/assistant/types";
import { Terminal as XTerm } from "@xterm/xterm";
import { AppActions } from "../components/application/AppActions";
import "@xterm/xterm/css/xterm.css";
import { FitAddon } from "@xterm/addon-fit";

const MACOS_PRO_THEME = {
  background: "#00000000",
  foreground: "#f5f5f7",
  cursor: "#f5f5f7",
  cursorAccent: "#1c1c1e",
  selectionBackground: "rgba(10, 132, 255, 0.35)",
  selectionInactiveBackground: "rgba(255, 255, 255, 0.18)",
  black: "#1c1c1e",
  red: "#ff453a",
  green: "#32d74b",
  yellow: "#ffd60a",
  blue: "#0a84ff",
  magenta: "#bf5af2",
  cyan: "#64d2ff",
  white: "#f5f5f7",
  brightBlack: "#8e8e93",
  brightRed: "#ff6961",
  brightGreen: "#30db5b",
  brightYellow: "#ffd426",
  brightBlue: "#409cff",
  brightMagenta: "#da8fff",
  brightCyan: "#70d7ff",
  brightWhite: "#ffffff",
};

const HOME_FILES = [
  { name: "Applications", color: "\x1b[34;1m" },
  { name: "Desktop", color: "\x1b[34;1m" },
  { name: "Documents", color: "\x1b[34;1m" },
  { name: "Downloads", color: "\x1b[34;1m" },
  { name: "README.md", color: "\x1b[0m" },
  { name: "contact.txt", color: "\x1b[0m" },
];

const COMMANDS: { name: string; usage: string; summary: string }[] = [
  { name: "help", usage: "help", summary: "Show available commands" },
  { name: "clear", usage: "clear", summary: "Clear the terminal" },
  { name: "whoami", usage: "whoami", summary: "Print current user" },
  { name: "pwd", usage: "pwd", summary: "Print working directory" },
  { name: "ls", usage: "ls", summary: "List home directory" },
  { name: "date", usage: "date", summary: "Show current date and time" },
  { name: "echo", usage: "echo [text]", summary: "Print text" },
  { name: "uname", usage: "uname [-a]", summary: "Print system information" },
  { name: "neofetch", usage: "neofetch", summary: "Show MartijnOS info" },
  { name: "open", usage: "open <github|linkedin>", summary: "Open a link" },
  { name: "about", usage: "about", summary: "About Martijn" },
  { name: "history", usage: "history", summary: "Show command history" },
];

const writePrompt = (term: XTerm) => {
  term.write(
    "\x1b[32mmartijn\x1b[0m@\x1b[32mMartijnOS\x1b[0m \x1b[36m~\x1b[0m % "
  );
};

const writeHelp = (term: XTerm) => {
  term.writeln("Available commands:");
  for (const cmd of COMMANDS) {
    term.writeln(
      `  \x1b[33m${cmd.usage.padEnd(22)}\x1b[0m ${cmd.summary}`
    );
  }
};

const writeNeofetch = (term: XTerm) => {
  const lines = [
    "\x1b[36m          .:'\x1b[0m                   \x1b[32mmartijn\x1b[0m@\x1b[32mMartijnOS\x1b[0m",
    "\x1b[36m      __ :'__\x1b[0m                  ----------------------",
    "\x1b[36m   .'`__`-'__``.\x1b[0m               \x1b[33mOS\x1b[0m: MartijnOS 15.0",
    "\x1b[36m  :==========:- \x1b[0m              \x1b[33mHost\x1b[0m: Finestra",
    "\x1b[36m  :.-\"\"\"\"\"-.  :\x1b[0m               \x1b[33mKernel\x1b[0m: WebKit",
    "\x1b[36m  :         : :\x1b[0m               \x1b[33mShell\x1b[0m: zsh",
    "\x1b[36m  :         : :\x1b[0m               \x1b[33mResolution\x1b[0m: " +
      `${window.innerWidth}x${window.innerHeight}`,
    "\x1b[36m  :         : :\x1b[0m               \x1b[33mTheme\x1b[0m: Liquid Glass",
    "\x1b[36m  :         : :\x1b[0m               \x1b[33mTerminal\x1b[0m: xterm.js",
    "\x1b[36m  `-..____..-' \x1b[0m              \x1b[33mCPU\x1b[0m: JavaScript V8",
  ];
  for (const line of lines) term.writeln(line);
};

const runCommand = (
  term: XTerm,
  input: string,
  history: string[]
): void => {
  const trimmed = input.trim();
  if (!trimmed) return;

  const [rawName, ...args] = trimmed.split(/\s+/);
  const name = rawName.toLowerCase();

  switch (name) {
    case "help":
    case "?":
      writeHelp(term);
      break;
    case "clear":
    case "cls":
      term.clear();
      break;
    case "whoami":
      term.writeln("martijn");
      break;
    case "pwd":
      term.writeln("/Users/martijn");
      break;
    case "ls": {
      const listing = HOME_FILES.map(
        (f) => `${f.color}${f.name}\x1b[0m`
      ).join("  ");
      term.writeln(listing);
      break;
    }
    case "date":
      term.writeln(new Date().toString());
      break;
    case "echo":
      term.writeln(args.join(" "));
      break;
    case "uname":
      if (args.includes("-a")) {
        term.writeln(
          "MartijnOS Finestra 15.0 WebKit arm64"
        );
      } else {
        term.writeln("MartijnOS");
      }
      break;
    case "neofetch":
    case "fetch":
      writeNeofetch(term);
      break;
    case "open": {
      const target = (args[0] || "").toLowerCase();
      if (target === "github") {
        term.writeln(
          "Opening \x1b[34mhttps://github.com/martijnmichel\x1b[0m"
        );
        window.open("https://github.com/martijnmichel", "_blank");
      } else if (target === "linkedin") {
        term.writeln(
          "Opening \x1b[34mhttps://www.linkedin.com/in/martijn-van-der-eijk-159582207/\x1b[0m"
        );
        window.open(
          "https://www.linkedin.com/in/martijn-van-der-eijk-159582207/",
          "_blank"
        );
      } else {
        term.writeln("usage: open <github|linkedin>");
      }
      break;
    }
    case "about":
    case "contact":
      term.writeln("Martijn — designer & developer");
      term.writeln(
        "GitHub:   \x1b[34mhttps://github.com/martijnmichel\x1b[0m"
      );
      term.writeln(
        "LinkedIn: \x1b[34mhttps://www.linkedin.com/in/martijn-van-der-eijk-159582207/\x1b[0m"
      );
      term.writeln('Tip: try \x1b[33mopen github\x1b[0m');
      break;
    case "history":
      history.forEach((cmd, i) => {
        term.writeln(`  ${(i + 1).toString().padStart(4)}  ${cmd}`);
      });
      break;
    default:
      term.writeln(`zsh: command not found: ${rawName}`);
      term.writeln("Type \x1b[33mhelp\x1b[0m to see available commands.");
  }
};

export class Terminal extends Application {
  static appName = "Terminal";
  public name = "Terminal";
  component = () => TerminalApp(this.id);
  static icon = () => <AppIcon src={Icon} alt="Terminal" />;
  public category = "default";
  width = 720;
  height = 440;
  titleBar = true;
  multiple = true;

  static assistantActions: AssistantActionDef[] = [
    {
      id: "terminal:open",
      labelKey: "apps:siri.actions.openTerminal",
      keywords: ["terminal", "shell", "cli", "command"],
      run: ({ dispatch }) => startApp("Terminal")(dispatch),
    },
  ];
}

export const TerminalApp = (id: string) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const term = new XTerm({
      cursorBlink: true,
      convertEol: true,
      allowTransparency: true,
      fontFamily:
        'Menlo, Monaco, "SF Mono", ui-monospace, "Courier New", monospace',
      fontSize: 12,
      lineHeight: 1.25,
      letterSpacing: 0,
      theme: MACOS_PRO_THEME,
      scrollback: 1000,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(el);
    fitAddon.fit();

    const syncTitle = () => {
      if (titleRef.current) {
        titleRef.current.textContent = `zsh — ${term.cols}×${term.rows}`;
      }
    };
    syncTitle();

    let buffer = "";
    const history: string[] = [];
    let historyIndex = -1;
    let draft = "";

    const now = new Date();
    const lastLogin = now.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    term.writeln(`Last login: ${lastLogin} on ttys001`);
    term.writeln("");
    term.writeln("Welcome to MartijnOS. Type a command to get started.");
    term.writeln("");
    writeHelp(term);
    term.writeln("");
    writePrompt(term);
    term.focus();

    const replaceLine = (next: string) => {
      while (buffer.length > 0) {
        term.write("\b \b");
        buffer = buffer.slice(0, -1);
      }
      buffer = next;
      term.write(next);
    };

    const onKey = term.onKey(({ key, domEvent }) => {
      if (domEvent.key === "Enter") {
        term.write("\r\n");
        const command = buffer;
        buffer = "";
        historyIndex = -1;
        draft = "";
        if (command.trim()) history.push(command);
        runCommand(term, command, history);
        writePrompt(term);
        return;
      }

      if (domEvent.key === "Backspace") {
        if (buffer.length === 0) return;
        buffer = buffer.slice(0, -1);
        term.write("\b \b");
        return;
      }

      if (domEvent.key === "ArrowUp") {
        domEvent.preventDefault();
        if (history.length === 0) return;
        if (historyIndex === -1) {
          draft = buffer;
          historyIndex = history.length - 1;
        } else if (historyIndex > 0) {
          historyIndex -= 1;
        }
        replaceLine(history[historyIndex]);
        return;
      }

      if (domEvent.key === "ArrowDown") {
        domEvent.preventDefault();
        if (historyIndex === -1) return;
        if (historyIndex < history.length - 1) {
          historyIndex += 1;
          replaceLine(history[historyIndex]);
        } else {
          historyIndex = -1;
          replaceLine(draft);
        }
        return;
      }

      if (domEvent.key === "c" && domEvent.ctrlKey) {
        term.write("^C\r\n");
        buffer = "";
        historyIndex = -1;
        draft = "";
        writePrompt(term);
        return;
      }

      if (domEvent.key === "l" && domEvent.ctrlKey) {
        term.clear();
        writePrompt(term);
        term.write(buffer);
        return;
      }

      if (domEvent.key === "u" && domEvent.ctrlKey) {
        replaceLine("");
        return;
      }

      if (domEvent.key.length === 1 && !domEvent.ctrlKey && !domEvent.metaKey) {
        buffer += key;
        term.write(key);
      }
    });

    const resizeObserver = new ResizeObserver(() => {
      fitAddon.fit();
      syncTitle();
    });
    resizeObserver.observe(el);

    return () => {
      onKey.dispose();
      resizeObserver.disconnect();
      term.dispose();
    };
  }, [id]);

  return (
    <div className="terminal-window flex h-full flex-col overflow-hidden rounded-[inherit]">
      <div
        className="terminal-titlebar relative flex h-[38px] shrink-0 items-center px-3"
        data-handle={id}
      >
        <AppActions id={id} />
        <span
          ref={titleRef}
          className="pointer-events-none absolute inset-0 flex items-center justify-center text-[13px] font-medium tracking-[-0.08px] text-white/80"
        >
          zsh — 80×24
        </span>
      </div>
      <div
        ref={hostRef}
        id={`xterm-${id}`}
        className="terminal-body min-h-0 flex-1 overflow-hidden px-1.5 pb-1.5 pt-0.5"
      />
    </div>
  );
};
