import React, { useState } from "react";
import { Application } from "../application";
import { AppIcon } from "../../components/application/AppIcon";
import SafariIcon from "../../icons/safari.png";
import { AppActions } from "../../components/application/AppActions";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Plus,
  Share,
  Shield,
  Sidebar,
} from "lucide-react";
import { NavMenu } from "..";
import { AppNavigation } from "../../components/application/AppNavigation";
import {
  FloatingGroup,
  FloatingGroupButton,
} from "@/components/ui/floating-group";
import { Input } from "@/components/ui/input";

export class Safari extends Application {
  static appName = "Safari";
  public name = "Safari";
  static icon = () => <AppIcon src={SafariIcon} alt="Safari" />;
  public category = "default";
  titleBar = true;

  width = window.innerWidth - (window.innerWidth < 700 ? 100 : 200);
  height = window.innerHeight - 200;

  component = () => SafariApp(this.id);

  constructor() {
    super();
  }
}

export const SafariApp = (id: string) => {
  const [address, setAddress] = useState("https://sonid.app");
  const [url, setUrl] = useState("https://sonid.app");
  const [history, setHistory] = useState(["https://sonid.app"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUrl(address);
    setHistory([...history, address]);
  };

  const navigation: NavMenu[] = [
    {
      label: "File",
      items: [
        { label: "New File", function: () => {}, shortcut: "⌘N" },
        { label: "New Window", function: () => {}, shortcut: "⇧⌘N" },
        { label: "separator", function: () => {} },
        { label: "Close", function: () => {}, shortcut: "⌘W" },
      ],
    },
    {
      label: "Edit",
      items: [
        { label: "Undo", function: () => {}, shortcut: "⌘Z" },
        { label: "Redo", function: () => {}, shortcut: "⇧⌘Z" },
      ],
    },
    {
      label: "Window",
      items: [
        { label: "New Window", function: () => {}, shortcut: "⇧⌘N" },
      ],
    },
    {
      label: "Help",
      items: [
        { label: "Welcome", function: () => {}, shortcut: "⌘H" },
        { label: "Show All Commands", function: () => {}, shortcut: "⌘⇧P" },
      ],
    },
  ];

  return (
    <>
      <AppNavigation items={navigation} id={id} appName="Safari" />
      <div
        className="px-2.5 py-2 flex items-center gap-2 rounded-t-[var(--window-radius)]"
        data-handle={id}
        style={{
          background: "var(--window-toolbar)",
          backdropFilter:
            "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
          WebkitBackdropFilter:
            "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
        }}
      >
        <AppActions id={id} />

        <FloatingGroup>
          <FloatingGroupButton>
            <Sidebar />
          </FloatingGroupButton>
        </FloatingGroup>

        <FloatingGroup>
          <FloatingGroupButton
            disabled={history.length < 2}
            onClick={() => {
              if (history.length < 2) return;
              const prev = history[history.length - 2];
              setAddress(prev);
              setUrl(prev);
              setHistory(history.slice(0, -1));
            }}
          >
            <ChevronLeft />
          </FloatingGroupButton>
          <FloatingGroupButton disabled>
            <ChevronRight />
          </FloatingGroupButton>
        </FloatingGroup>

        <form
          onSubmit={handleSubmit}
          className="flex-1 flex items-center justify-center min-w-0"
        >
          <div className="relative w-full max-w-[420px]">
            <Shield className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="macos-search h-[28px] pl-8 pr-3 text-center text-[12px] text-muted-foreground"
            />
          </div>
        </form>

        <FloatingGroup>
          <FloatingGroupButton>
            <Share />
          </FloatingGroupButton>
          <FloatingGroupButton>
            <Plus />
          </FloatingGroupButton>
          <FloatingGroupButton>
            <Copy />
          </FloatingGroupButton>
        </FloatingGroup>
      </div>

      <iframe
        src={url}
        width="100%"
        height="100%"
        className="rounded-b-lg bg-white"
        title="Safari"
      />
    </>
  );
};
