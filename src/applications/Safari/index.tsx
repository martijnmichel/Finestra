import React, { useState } from "react";
import { Application } from "../application";
import SafariIcon from "../../icons/safari.png";
import { AppActions } from "../../components/application/AppActions";
import { ChevronLeft, ChevronRight, Copy, Plus, Share, Shield, Sidebar } from "lucide-react";
import { NavMenu } from "..";
import { AppNavigation } from "../../components/application/AppNavigation";

export class Safari extends Application {
  public name = "Safari";
  static icon = () => <img src={SafariIcon} alt="Logo" />;
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

  const handleSubmit = (e: any) => {
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
      <AppNavigation items={navigation} id={id} />
      <div
        className="px-2 py-[10px] flex items-center justify-between"
        data-handle={id}
      >
        <div className="icon-container">
          <AppActions id={id} />

          <Sidebar className="size-4"/>

          <ChevronLeft className="size-4"/>

          <ChevronRight className="size-4"/>
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <Shield className="size-4"/>

          <input
            value={address}
            className="bg-neutral-100 text-neutral-500 text-[12px] border-0 shadow-sm rounded-md px-20 py-[3px]"
            onChange={(val) => setAddress(val.target.value)}
          />
        </form>

        <div className="flex gap-4">
          <Share className="size-4"/>

          <Plus className="size-4"/>

          <Copy className="size-4"/>
        </div>
      </div>

      <div className="h-[1px] w-full bg-gray-200"></div>

      <iframe
        src={url}
        width="100%"
        height="100%"
        className="rounded-b-lg bg-white"
      />
    </>
  );
};
