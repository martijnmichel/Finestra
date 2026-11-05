import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppIcon } from "../components/application/AppIcon";
import { Application } from "./application";
import FinderIcon from "../icons/finder.png";
import { startApp } from "@/store/actions/startApp";
import type { AssistantActionDef } from "@/lib/assistant/types";
import { AppActions } from "../components/application/AppActions";
import {
  AppWindow,
  ChevronRight,
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
import {
  FloatingSidebar,
  FloatingSidebarContent,
  FloatingSidebarShell,
} from "@/components/ui/floating-sidebar";
import { PhoneAppChrome } from "@/components/application/PhoneAppChrome";
import { NavMenu } from ".";
import { AppNavigation } from "../components/application/AppNavigation";
import { cn } from "@/lib/utils";
import { useOsFormFactor } from "@/hooks/useOsFormFactor";
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

  static assistantActions: AssistantActionDef[] = [
    {
      id: "finder:open",
      labelKey: "apps:siri.actions.openFinder",
      keywords: ["finder", "files", "bestanden", "file"],
      run: ({ dispatch }) => startApp("Finder")(dispatch),
    },
  ];

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

export const FinderApp = (id: string) => {
  const { t } = useTranslation();
  const { isIos } = useOsFormFactor();
  const [activeId, setActiveId] = useState("recents");
  const [view, setView] = useState<"icons" | "list" | "columns" | "gallery">(
    "list"
  );
  const [query, setQuery] = useState("");
  const [mobileView, setMobileView] = useState<"browse" | "folder">("browse");

  const sidebarLabel = (itemId: string) =>
    t(`apps:finder.sidebar.${itemId}`);

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
    label: t(`apps:finder.sections.${section}`),
    items: FINDER_SIDEBAR.filter((item) => item.section === section),
  }));

  const openFolder = (folderId: string) => {
    setActiveId(folderId);
    if (isIos) setMobileView("folder");
  };

  const navigation: NavMenu[] = [
    {
      label: t("apps:finder.menus.file"),
      items: [
        {
          label: t("apps:finder.menus.newWindow"),
          function: () => {},
          shortcut: "⌘N",
        },
        {
          label: t("apps:finder.menus.newFolder"),
          function: () => {},
          shortcut: "⇧⌘N",
        },
        { label: "separator", function: () => {} },
        {
          label: t("apps:finder.menus.closeWindow"),
          function: () => {},
          shortcut: "⌘W",
        },
      ],
    },
    {
      label: t("apps:finder.menus.edit"),
      items: [
        {
          label: t("apps:finder.menus.undo"),
          function: () => {},
          shortcut: "⌘Z",
        },
        {
          label: t("apps:finder.menus.cut"),
          function: () => {},
          shortcut: "⌘X",
        },
        {
          label: t("apps:finder.menus.copy"),
          function: () => {},
          shortcut: "⌘C",
        },
        {
          label: t("apps:finder.menus.paste"),
          function: () => {},
          shortcut: "⌘V",
        },
        {
          label: t("apps:finder.menus.selectAll"),
          function: () => {},
          shortcut: "⌘A",
        },
      ],
    },
    {
      label: t("apps:finder.menus.view"),
      items: [
        {
          label: t("apps:finder.menus.asIcons"),
          function: () => setView("icons"),
        },
        {
          label: t("apps:finder.menus.asList"),
          function: () => setView("list"),
        },
        {
          label: t("apps:finder.menus.asColumns"),
          function: () => setView("columns"),
        },
        {
          label: t("apps:finder.menus.asGallery"),
          function: () => setView("gallery"),
        },
      ],
    },
    {
      label: t("apps:finder.menus.go"),
      items: [
        {
          label: t("apps:finder.menus.recents"),
          function: () => openFolder("recents"),
        },
        {
          label: t("apps:finder.menus.documents"),
          function: () => openFolder("documents"),
        },
        {
          label: t("apps:finder.menus.downloads"),
          function: () => openFolder("downloads"),
        },
      ],
    },
  ];

  if (isIos) {
    return (
      <div className="flex h-full min-h-0 flex-col bg-[var(--window-body)]">
        {mobileView === "browse" ? (
          <>
            <div className="px-4 pb-2 pt-3">
              <h1 className="os-chrome-em text-[34px] tracking-[-0.5px]">
                {t("apps:finder.name")}
              </h1>
              <div className="relative mt-3">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("apps:finder.search")}
                  className="macos-search h-[36px] pl-9 pr-3 text-[16px]"
                />
              </div>
            </div>
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 pb-8">
              {sections.map(({ section, label, items: sectionItems }) => (
                <div key={section}>
                  <h6 className="os-chrome-em mb-1.5 px-1 text-[13px] uppercase tracking-[-0.08px] text-muted-foreground">
                    {label}
                  </h6>
                  <div
                    className="overflow-hidden rounded-[12px] divide-y divide-black/[0.08] dark:divide-white/[0.08]"
                    style={{ background: "var(--settings-group, rgba(255,255,255,0.72))" }}
                  >
                    {sectionItems.map((item) => {
                      const Icon = SIDEBAR_ICONS[item.icon];
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => openFolder(item.id)}
                          className="flex w-full items-center gap-3 px-3.5 py-[11px] text-left active:bg-black/[0.04]"
                        >
                          {item.section === "tags" ? (
                            <span
                              className="size-3 shrink-0 rounded-full"
                              style={{ background: item.tagColor }}
                            />
                          ) : (
                            <span className="inline-flex size-7 items-center justify-center text-[var(--macos-accent)]">
                              <Icon className="size-[18px]" strokeWidth={2.25} />
                            </span>
                          )}
                          <span className="os-chrome min-w-0 flex-1 truncate text-[17px]">
                            {sidebarLabel(item.id)}
                          </span>
                          <ChevronRight className="size-5 text-black/25 dark:text-white/30" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <PhoneAppChrome
              title={sidebarLabel(activeItem.id)}
              onBack={() => setMobileView("browse")}
              backLabel={t("apps:finder.name")}
            />
            <div className="min-h-0 flex-1 overflow-y-auto px-2 py-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="os-chrome flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-foreground"
                >
                  <span className="min-w-0 flex-1 truncate text-[16px]">
                    {item.name}
                  </span>
                  <span className="shrink-0 text-[13px] text-muted-foreground">
                    {item.size}
                  </span>
                </div>
              ))}
              {items.length === 0 && (
                <div className="os-chrome py-10 text-center text-muted-foreground">
                  {t("apps:finder.empty")}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <FloatingSidebarShell>
      <FloatingSidebar width={210}>
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
                        {sidebarLabel(item.id)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </FloatingSidebar>

      <FloatingSidebarContent>
        <AppNavigation
          items={navigation}
          id={id}
          appName={t("apps:finder.name")}
        />

        <div
          className="relative z-[1] flex items-center gap-2 px-3 py-2 w-full shrink-0"
          data-handle={id}
        >
          <span className="os-chrome-em text-[13px] min-w-0 truncate px-1 text-foreground">
            {sidebarLabel(activeItem.id)}
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

          <div className="relative w-[140px] shrink-0">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("apps:finder.search")}
              className="macos-search h-[28px] pl-7 pr-2 text-[13px]"
            />
          </div>
        </div>

        <div className="relative z-[1] flex-1 min-h-0 flex flex-col overflow-hidden">
          <div className="sticky top-0 z-[1] grid grid-cols-[minmax(0,1fr)_140px_110px] gap-2 px-4 py-1.5 border-b border-black/[0.08] dark:border-white/[0.08] os-chrome-sm text-[#86868b]">
            <span>{t("apps:finder.columns.name")}</span>
            <span>{t("apps:finder.columns.dateModified")}</span>
            <span className="text-right">{t("apps:finder.columns.size")}</span>
          </div>
          <div className="flex-1 overflow-y-auto px-2.5 py-1">
            {items.map((item) => (
              <div
                key={item.id}
                className="os-chrome grid grid-cols-[minmax(0,1fr)_140px_110px] gap-2 w-full px-2 py-[3px] rounded-[5px] cursor-default text-foreground hover:bg-[var(--macos-accent)] hover:text-white group"
              >
                <span className="truncate">{item.name}</span>
                <span className="truncate text-muted-foreground group-hover:text-white/85">
                  {item.date}
                </span>
                <span className="truncate text-right text-muted-foreground group-hover:text-white/85">
                  {item.size}
                </span>
              </div>
            ))}
            {items.length === 0 && (
              <div className="os-chrome text-center text-muted-foreground py-10">
                {t("apps:finder.empty")}
              </div>
            )}
          </div>
        </div>
      </FloatingSidebarContent>
    </FloatingSidebarShell>
  );
};
