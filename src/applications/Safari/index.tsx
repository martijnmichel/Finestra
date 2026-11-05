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
import { useOsFormFactor } from "@/hooks/useOsFormFactor";
import { useAppDispatch } from "@/store";
import { goHome } from "@/store/actions/goHome";
import { cn } from "@/lib/utils";

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
  const { isIos } = useOsFormFactor();
  const dispatch = useAppDispatch();
  const [address, setAddress] = useState("https://sonid.app");
  const [url, setUrl] = useState("https://sonid.app");
  const [history, setHistory] = useState(["https://sonid.app"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUrl(address);
    setHistory([...history, address]);
  };

  const goBack = () => {
    if (history.length < 2) return;
    const prev = history[history.length - 2];
    setAddress(prev);
    setUrl(prev);
    setHistory(history.slice(0, -1));
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

  const addressField = (
    <form
      onSubmit={handleSubmit}
      className={cn("flex min-w-0 items-center", isIos ? "flex-1" : "flex-1 justify-center")}
    >
      <div className={cn("relative w-full", !isIos && "max-w-[420px]")}>
        <Shield className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={cn(
            "macos-search pl-8 pr-3 text-muted-foreground",
            isIos
              ? "h-[36px] text-center text-[15px]"
              : "h-[28px] text-center text-[12px]"
          )}
        />
      </div>
    </form>
  );

  if (isIos) {
    return (
      <div className="flex h-full min-h-0 flex-col bg-white">
        <div
          className="flex shrink-0 items-center gap-2 px-3 py-2"
          style={{
            background: "var(--window-toolbar)",
            backdropFilter:
              "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
            WebkitBackdropFilter:
              "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
          }}
        >
          <button
            type="button"
            onClick={() => goHome()(dispatch)}
            className="os-chrome-em shrink-0 text-[17px] text-[var(--macos-accent)]"
          >
            Done
          </button>
          {addressField}
        </div>

        <iframe
          src={url}
          title="Safari"
          className="min-h-0 w-full flex-1 border-0 bg-white"
        />

        <div
          className="flex shrink-0 items-center justify-around px-6 pb-[max(10px,env(safe-area-inset-bottom,0px))] pt-2"
          style={{
            background: "var(--window-toolbar)",
            backdropFilter:
              "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
            WebkitBackdropFilter:
              "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
          }}
        >
          <button
            type="button"
            disabled={history.length < 2}
            onClick={goBack}
            className="inline-flex size-11 items-center justify-center text-[var(--macos-accent)] disabled:opacity-30"
          >
            <ChevronLeft className="size-7" strokeWidth={2} />
          </button>
          <button
            type="button"
            disabled
            className="inline-flex size-11 items-center justify-center text-[var(--macos-accent)] disabled:opacity-30"
          >
            <ChevronRight className="size-7" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-[var(--macos-accent)]"
          >
            <Share className="size-6" />
          </button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-[var(--macos-accent)]"
          >
            <Plus className="size-6" />
          </button>
        </div>
      </div>
    );
  }

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
            onClick={goBack}
          >
            <ChevronLeft />
          </FloatingGroupButton>
          <FloatingGroupButton disabled>
            <ChevronRight />
          </FloatingGroupButton>
        </FloatingGroup>

        {addressField}

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
