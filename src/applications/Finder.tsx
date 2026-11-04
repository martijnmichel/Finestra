import React, { useEffect, useState } from "react";
import { Application } from "./application";
import FinderIcon from "../icons/finder.png";
import { AppActions } from "../components/application/AppActions";
import {
  AppWindow,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  FileText,
  GalleryThumbnails,
  Monitor,
  MoreVertical,
  Share,
  Tag,
} from "lucide-react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { NavMenu } from ".";
import { AppNavigation } from "../components/application/AppNavigation";

export class Finder extends Application {
  public name = "Finder";
  static icon = () => <img src={FinderIcon} alt="Logo" />;

  titleBar = true;

  public category = "default";

  component = () => FinderApp(this.id);

  constructor() {
    super();
  }
}

export const FinderApp = (id: string) => {
  const [items, setItems] = useState<
    { id: number; filename: string; date: string }[]
  >([]);

  const [active, setActive] = useState("Recents");

  const getFiles = () => {
    fetch("https://my.api.mockaroo.com/files.json?key=25574bd0")
      .then((response) => response.json())
      .then((json) => setItems(json));
  };
  const favs = [
    {
      label: "Recents",
      icon: <Clock className="size-4" />,
    },
    { label: "Applications", icon: <AppWindow className="size-4" /> },
    { label: "Desktop", icon: <Monitor className="size-4" /> },
    { label: "Documents", icon: <FileText className="size-4" /> },
    {
      label: "Downloads",
      icon: <Download className="size-4" />,
    },
  ];

  useEffect(() => {
    getFiles();
  }, []);

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
        { label: "Undo", function: () => {} },
        { label: "Redo", function: () => {} },
        { label: "Cut", function: () => {}, shortcut: "⌘X" },
        { label: "Copy", function: () => {}, shortcut: "⌘C" },
        { label: "Paste", function: () => {}, shortcut: "⌘V" },
        { label: "Find", function: () => {}, shortcut: "⌘F" },
        { label: "Replace", function: () => {}, shortcut: "⌥⌘F" },
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
    <SidebarProvider className="h-full min-h-0">
      <Sidebar
        collapsible="none"
        className="flex-col hidden @xl/window:flex w-[210px] min-h-0 h-full grow border-r border-black/[0.08]"
        style={{
          background: "var(--sidebar)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
        }}
      >
        <SidebarContent className="grow h-full pt-1" data-handle={id}>
          <div className="px-2 pt-1 pb-1">
            <AppActions id={id} />
          </div>

          <div className="px-2.5 pt-3 pb-2">
            <h6 className="os-chrome-sm text-[#86868b] mb-1 px-1.5">
              Favorites
            </h6>
            {favs.map((fav) => {
              const selected = active === fav.label;
              return (
                <div
                  className={`flex gap-[7px] items-center px-[7px] py-[3px] rounded-[6px] cursor-default ${
                    selected
                      ? "bg-black/[0.08] text-[#1d1d1f]"
                      : "text-[#1d1d1f] hover:bg-black/[0.04]"
                  }`}
                  key={fav.label}
                  onClick={() => {
                    getFiles();
                    setActive(fav.label);
                  }}
                >
                  <span className="text-[#007aff] *:size-[15px] shrink-0">
                    {fav.icon}
                  </span>
                  <span className="os-chrome truncate">{fav.label}</span>
                </div>
              );
            })}
          </div>
        </SidebarContent>
      </Sidebar>
      <div className="flex flex-col w-full flex-grow min-w-0 bg-white">
        <AppNavigation items={navigation} id={id} appName="Finder" />
        <div className="window-toolbar flex justify-between items-center px-2 py-1.5 w-full">
          <div className="flex items-center gap-0.5">
            <Button variant="ghost" size="icon" className="size-7">
              <ChevronLeft className="size-4" />
            </Button>

            <Button variant="ghost" size="icon" className="size-7">
              <ChevronRight className="size-4" />
            </Button>

            <span className="os-chrome-em ml-1.5">{active}</span>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <GalleryThumbnails />
            </Button>

            <Button variant="ghost" size="icon">
              <Share />
            </Button>

            <Button variant="ghost" size="icon">
              <Tag />
            </Button>

            <Button variant="ghost" size="icon">
              <MoreVertical />
            </Button>
          </div>
        </div>

        <div className="h-full overflow-y-auto px-3 py-1">
          <div>
            {items.map((item, i) => {
              return (
                i < 20 && (
                  <div
                    className={`${
                      i % 2 === 1 ? "bg-[#f5f5f7]" : ""
                    } os-chrome w-full px-3 py-[2px] rounded-[4px] flex justify-between cursor-default hover:bg-black/[0.05]`}
                    key={`itemkey-${item.id}`}
                  >
                    <span>{item.filename}</span>
                    <span className="os-chrome text-[#86868b]">{item.date}</span>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
