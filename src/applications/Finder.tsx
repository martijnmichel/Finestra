import React, { useMemo, useState } from "react";
import { AppIcon } from "../components/application/AppIcon";
import { Application } from "./application";
import FinderIcon from "../icons/finder.png";
import { AppActions } from "../components/application/AppActions";
import {
  AppWindow,
  Cloud,
  Clock,
  Columns3,
  Download,
  FileText,
  Film,
  GalleryThumbnails,
  HardDrive,
  Home,
  Image,
  Laptop,
  LayoutGrid,
  List,
  Monitor,
  MoreHorizontal,
  Music,
  Network,
  Search,
  Share,
  Tag,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  FloatingGroup,
  FloatingGroupButton,
} from "@/components/ui/floating-group";
import { FloatingContent } from "@/components/ui/floating-content";
import { NavMenu } from ".";
import { AppNavigation } from "../components/application/AppNavigation";
import { cn } from "@/lib/utils";
import {
  FINDER_SIDEBAR,
  filesForFolder,
  type FinderSidebarItem,
} from "./finder/data";

export class Finder extends Application {
  static appName = "Finder";
  public name = "Finder";
  static icon = () => <AppIcon src={FinderIcon} alt="Finder" />;

  titleBar = true;

  public category = "default";

  component = () => FinderApp(this.id);

  constructor() {
    super();
  }
}

const SIDEBAR_ICONS: Record<FinderSidebarItem["icon"], LucideIcon> = {
  clock: Clock,
  "app-window": AppWindow,
  monitor: Monitor,
  "file-text": FileText,
  download: Download,
  image: Image,
  music: Music,
  film: Film,
  cloud: Cloud,
  users: Users,
  "hard-drive": HardDrive,
  laptop: Laptop,
  network: Network,
  home: Home,
};

const SECTION_LABELS: Record<FinderSidebarItem["section"], string> = {
  favorites: "Favorites",
  icloud: "iCloud",
  locations: "Locations",
  tags: "Tags",
};

export const FinderApp = (id: string) => {
  const [activeId, setActiveId] = useState("recents");
  const [view, setView] = useState<"icons" | "list" | "columns" | "gallery">(
    "list"
  );
  const [query, setQuery] = useState("");

  const activeItem =
    FINDER_SIDEBAR.find((item) => item.id === activeId) ?? FINDER_SIDEBAR[0];

  const items = useMemo(() => {
    const files = filesForFolder(activeId);
    const q = query.trim().toLowerCase();
    if (!q) return files;
    return files.filter(
      (f) =>
        f.name.toLowerCase().includes(q) || f.kind.toLowerCase().includes(q)
    );
  }, [activeId, query]);

  const sections = (
    ["favorites", "icloud", "locations", "tags"] as const
  ).map((section) => ({
    section,
    label: SECTION_LABELS[section],
    items: FINDER_SIDEBAR.filter((item) => item.section === section),
  }));

  const navigation: NavMenu[] = [
    {
      label: "File",
      items: [
        { label: "New Finder Window", function: () => {}, shortcut: "⌘N" },
        { label: "New Folder", function: () => {}, shortcut: "⇧⌘N" },
        { label: "separator", function: () => {} },
        { label: "Close Window", function: () => {}, shortcut: "⌘W" },
      ],
    },
    {
      label: "Edit",
      items: [
        { label: "Undo", function: () => {}, shortcut: "⌘Z" },
        { label: "Cut", function: () => {}, shortcut: "⌘X" },
        { label: "Copy", function: () => {}, shortcut: "⌘C" },
        { label: "Paste", function: () => {}, shortcut: "⌘V" },
        { label: "Select All", function: () => {}, shortcut: "⌘A" },
      ],
    },
    {
      label: "View",
      items: [
        { label: "as Icons", function: () => setView("icons") },
        { label: "as List", function: () => setView("list") },
        { label: "as Columns", function: () => setView("columns") },
        { label: "as Gallery", function: () => setView("gallery") },
      ],
    },
    {
      label: "Go",
      items: [
        { label: "Recents", function: () => setActiveId("recents") },
        { label: "Documents", function: () => setActiveId("documents") },
        { label: "Downloads", function: () => setActiveId("downloads") },
      ],
    },
  ];

  return (
    <div
      className="@container/window flex h-full min-h-0 w-full"
      style={{
        background: "var(--sidebar)",
        backdropFilter:
          "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
        WebkitBackdropFilter:
          "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
      }}
    >
      <aside className="hidden @xl/window:flex w-[210px] shrink-0 min-h-0 flex-col">
        <div className="px-2 pt-1 pb-1" data-handle={id}>
          <AppActions id={id} />
        </div>

        <div className="px-2 pt-1 pb-3 flex-1 min-h-0 overflow-y-auto space-y-3">
          {sections.map(({ section, label, items: sectionItems }) => (
            <div key={section}>
              <h6 className="os-chrome-sm text-[#86868b] mb-1 px-2">{label}</h6>
              <div className="space-y-px">
                {sectionItems.map((item) => {
                  const selected = item.id === activeId;
                  const Icon = SIDEBAR_ICONS[item.icon];
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      className={cn(
                        "w-full flex gap-[7px] items-center px-[7px] py-[3px] rounded-[6px] cursor-default text-left",
                        selected
                          ? "bg-black/[0.08] dark:bg-white/[0.14]"
                          : "hover:bg-black/[0.04] dark:hover:bg-white/[0.07]"
                      )}
                    >
                      {item.section === "tags" ? (
                        <span
                          className="size-[10px] rounded-full shrink-0 ml-0.5"
                          style={{ background: item.tagColor }}
                        />
                      ) : (
                        <span className="text-[var(--macos-accent)] shrink-0">
                          <Icon className="size-[15px]" strokeWidth={2.25} />
                        </span>
                      )}
                      <span className="os-chrome truncate text-[13px] text-foreground">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      <div className="flex flex-1 min-w-0 min-h-0 flex-col pr-2.5 pb-2.5 gap-1.5">
        <AppNavigation items={navigation} id={id} appName="Finder" />

        <div
          className="flex items-center gap-2 px-1 py-1 w-full shrink-0"
          data-handle={id}
        >
          <span className="os-chrome-em text-[13px] min-w-0 truncate px-1 text-foreground">
            {activeItem.label}
          </span>

          <div className="flex-1" />

          <FloatingGroup>
            <FloatingGroupButton
              active={view === "icons"}
              onClick={() => setView("icons")}
            >
              <LayoutGrid />
            </FloatingGroupButton>
            <FloatingGroupButton
              active={view === "list"}
              onClick={() => setView("list")}
            >
              <List />
            </FloatingGroupButton>
            <FloatingGroupButton
              active={view === "columns"}
              onClick={() => setView("columns")}
            >
              <Columns3 />
            </FloatingGroupButton>
            <FloatingGroupButton
              active={view === "gallery"}
              onClick={() => setView("gallery")}
            >
              <GalleryThumbnails />
            </FloatingGroupButton>
          </FloatingGroup>

          <FloatingGroup>
            <FloatingGroupButton>
              <Share />
            </FloatingGroupButton>
            <FloatingGroupButton>
              <Tag />
            </FloatingGroupButton>
            <FloatingGroupButton>
              <MoreHorizontal />
            </FloatingGroupButton>
          </FloatingGroup>

          <div className="relative w-[128px] shrink-0">
            <Search className="absolute left-1.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="macos-input-plain h-[28px] pl-6 pr-1 text-[13px] text-muted-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <FloatingContent>
          <div className="sticky top-0 z-[1] grid grid-cols-[minmax(0,1fr)_140px_110px] gap-2 px-3 py-1.5 border-b border-black/[0.08] bg-[#f5f5f7]/95 os-chrome-sm text-[#86868b]">
            <span>Name</span>
            <span>Date Modified</span>
            <span className="text-right">Size</span>
          </div>
          <div className="h-full overflow-y-auto px-1.5 py-1">
            {items.map((item) => (
              <div
                key={item.id}
                className="os-chrome grid grid-cols-[minmax(0,1fr)_140px_110px] gap-2 w-full px-2 py-[3px] rounded-[5px] cursor-default text-[#1d1d1f] hover:bg-[var(--macos-accent)] hover:text-white group"
              >
                <span className="truncate">{item.name}</span>
                <span className="truncate text-[#86868b] group-hover:text-white/85">
                  {item.date}
                </span>
                <span className="truncate text-right text-[#86868b] group-hover:text-white/85">
                  {item.size}
                </span>
              </div>
            ))}
            {items.length === 0 && (
              <div className="os-chrome text-center text-[#86868b] py-10">
                No items to show
              </div>
            )}
          </div>
        </FloatingContent>
      </div>
    </div>
  );
};
