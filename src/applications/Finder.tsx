import React, { useEffect, useState } from "react";
import { Application } from "./application";
import FinderIcon from "../icons/finder.png";
import { AppActions } from "../components/application/AppActions";
import { Icon } from "@iconify/react";
import {
  ChevronLeft,
  ChevronRight,
  GalleryThumbnails,
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

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

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
      icon: <Icon icon="bi:clock" />,
    },
    { label: "Applications", icon: <Icon icon="simple-icons:appstore" /> },
    { label: "Desktop", icon: <Icon icon="akar-icons:desktop-device" /> },
    { label: "Documents", icon: <Icon icon="carbon:document-blank" /> },
    {
      label: "Downloads",
      icon: <Icon icon="iconoir:download-circled-outline" />,
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
        className="flex-col hidden @xl/window:flex w-64 min-h-0 h-full grow backdrop-blur-xl"
      >
        <SidebarContent className="grow h-full py-4" data-handle={id}>
          <AppActions id={id} />

          <div className=" px-2 py-5">
            <h6 className="text-xs font-bold text-gray-400 mb-1">Favorites</h6>
            {favs.map((fav) => {
              return (
                <div
                  className={`flex gap-2 items-center mb-1 p-1 rounded-md cursor-pointer ${
                    active === fav.label ? "bg-zinc-300 text-white" : ""
                  }`}
                  key={fav.label}
                  onClick={() => {
                    getFiles();
                    setActive(fav.label);
                  }}
                >
                  <span
                    className={`${
                      active === fav.label ? "" : "text-blue-500"
                    } *:size-4`}
                  >
                    {fav.icon}
                  </span>{" "}
                  <span className="text-sm font-medium">{fav.label}</span>
                </div>
              );
            })}
          </div>
        </SidebarContent>
      </Sidebar>
      <div className="flex flex-col w-full flex-grow">
        <AppNavigation items={navigation} id={id} />
        <div className="flex justify-between items-center bg-gray-100 p-2 w-full rounded-tr-lg">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <ChevronLeft />
            </Button>

            <Button variant="ghost" size="icon">
              <ChevronRight />
            </Button>

            <span className="text-md font-semibold ml-2">Downloads</span>
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
                      i % 2 === 1 ? "bg-gray-100" : ""
                    } text-sm w-full px-3 py-[0.125rem] rounded flex justify-between cursor-pointer`}
                    key={`itemkey-${item.id}`}
                  >
                    <span>{item.filename}</span>
                    <span className="text-sm text-gray-500">{item.date}</span>
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
