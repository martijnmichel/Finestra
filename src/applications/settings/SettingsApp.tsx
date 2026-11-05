import React, { useMemo, useState } from "react";
import {
  Accessibility,
  AtSign,
  BatteryCharging,
  Bell,
  Bluetooth,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Fingerprint,
  Gamepad2,
  Globe,
  Hand,
  Hourglass,
  Image,
  Keyboard,
  Lock,
  Monitor,
  Moon,
  Mouse,
  Network,
  Paintbrush,
  PanelBottom,
  PanelTop,
  Printer,
  Search,
  Settings as SettingsIcon,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Tablet,
  Users,
  Volume2,
  Wallet,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { AppActions } from "@/components/application/AppActions";
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
import { cn } from "@/lib/utils";
import { AppearancePane } from "./AppearancePane";
import {
  SETTINGS_NAV,
  type SettingsNavItem,
  type SettingsPaneId,
} from "./nav";

const ICONS: Record<string, LucideIcon> = {
  wifi: Wifi,
  bluetooth: Bluetooth,
  network: Network,
  shield: Shield,
  battery: BatteryCharging,
  settings: SettingsIcon,
  accessibility: Accessibility,
  paintbrush: Paintbrush,
  sparkles: Sparkles,
  sliders: SlidersHorizontal,
  "panel-bottom": PanelBottom,
  monitor: Monitor,
  "panel-top": PanelTop,
  search: Search,
  image: Image,
  bell: Bell,
  "volume-2": Volume2,
  moon: Moon,
  hourglass: Hourglass,
  lock: Lock,
  hand: Hand,
  fingerprint: Fingerprint,
  users: Users,
  globe: Globe,
  "at-sign": AtSign,
  "gamepad-2": Gamepad2,
  cloud: Cloud,
  wallet: Wallet,
  keyboard: Keyboard,
  mouse: Mouse,
  tablet: Tablet,
  printer: Printer,
};

const SettingsIconBadge = ({
  item,
  size = "sm",
}: {
  item: SettingsNavItem;
  size?: "sm" | "lg";
}) => {
  const Icon = ICONS[item.icon] ?? SettingsIcon;
  const needsDarkIcon =
    item.iconBg === "#ffffff" || item.iconBg.startsWith("#fff");

  return (
    <span
      data-settings-icon
      className={cn(
        "settings-icon-badge inline-flex items-center justify-center shrink-0 shadow-sm",
        size === "lg"
          ? "size-14 rounded-[14px]"
          : "rounded-[6px]",
        needsDarkIcon ? "text-black border border-black/10" : "text-white"
      )}
      style={
        size === "lg"
          ? { background: item.iconBg }
          : {
              background: item.iconBg,
              width: "var(--sidebar-icon-size, 23px)",
              height: "var(--sidebar-icon-size, 23px)",
            }
      }
    >
      <Icon
        className={size === "lg" ? "size-7" : "size-[55%]"}
        strokeWidth={2.25}
      />
    </span>
  );
};

const StubPane = ({ item }: { item: SettingsNavItem }) => (
  <div className="os-chrome max-w-[560px] mx-auto w-full flex flex-col items-center text-center pt-10 gap-3">
    <SettingsIconBadge item={item} size="lg" />
    <h2 className="text-[15px] font-semibold tracking-[-0.2px] text-foreground">
      {item.label}
    </h2>
    <p className="text-[13px] text-muted-foreground max-w-sm leading-relaxed">
      {item.description ??
        `${item.label} settings are not available in this portfolio OS yet.`}
    </p>
    <div
      className="w-full mt-4 rounded-[10px] px-3.5 py-8 text-[13px] text-muted-foreground"
      style={{ background: "var(--settings-group)" }}
    >
      Coming soon
    </div>
  </div>
);

const GeneralPane = ({ item }: { item: SettingsNavItem }) => {
  const rows = [
    { label: "About", iconBg: "#8e8e93", icon: "settings" as const },
    {
      label: "Software Update",
      iconBg: "#007aff",
      icon: "sparkles" as const,
    },
    { label: "Storage", iconBg: "#8e8e93", icon: "monitor" as const },
    {
      label: "Apple Care & Warranty",
      iconBg: "#007aff",
      icon: "shield" as const,
    },
    { label: "Date & Time", iconBg: "#007aff", icon: "hourglass" as const },
    {
      label: "Language & Region",
      iconBg: "#007aff",
      icon: "globe" as const,
    },
    {
      label: "Transfer or Reset",
      iconBg: "#8e8e93",
      icon: "settings" as const,
    },
  ];

  return (
    <div className="os-chrome max-w-[560px] mx-auto w-full flex flex-col gap-5">
      <div className="flex flex-col items-center text-center gap-2 pt-2 pb-1">
        <SettingsIconBadge item={item} size="lg" />
        <h2 className="text-[15px] font-semibold tracking-[-0.2px]">{item.label}</h2>
        <p className="text-[13px] text-muted-foreground max-w-sm">
          {item.description}
        </p>
      </div>
      <div
        className="rounded-[10px] overflow-hidden divide-y divide-black/[0.08] dark:divide-white/[0.08]"
        style={{ background: "var(--settings-group)" }}
      >
        {rows.map((row) => {
          const Icon = ICONS[row.icon] ?? SettingsIcon;
          return (
            <button
              key={row.label}
              type="button"
              className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left cursor-default hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
            >
              <span
                className="size-[26px] rounded-[6px] inline-flex items-center justify-center text-white shrink-0"
                style={{ background: row.iconBg }}
              >
                <Icon className="size-3.5" strokeWidth={2.25} />
              </span>
              <span className="flex-1 truncate">{row.label}</span>
              <ChevronRight className="size-4 text-black/25 dark:text-white/30" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const SettingsApp = (id: string) => {
  const [active, setActive] = useState<SettingsPaneId>("appearance");
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<SettingsPaneId[]>(["appearance"]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SETTINGS_NAV;
    return SETTINGS_NAV.filter((item) => item.label.toLowerCase().includes(q));
  }, [query]);

  const activeItem =
    SETTINGS_NAV.find((item) => item.id === active) ?? SETTINGS_NAV[0];

  const navigate = (pane: SettingsPaneId) => {
    if (pane === active) return;
    const next = history.slice(0, historyIndex + 1);
    next.push(pane);
    setHistory(next);
    setHistoryIndex(next.length - 1);
    setActive(pane);
  };

  const goBack = () => {
    if (historyIndex <= 0) return;
    const next = historyIndex - 1;
    setHistoryIndex(next);
    setActive(history[next]);
  };

  const goForward = () => {
    if (historyIndex >= history.length - 1) return;
    const next = historyIndex + 1;
    setHistoryIndex(next);
    setActive(history[next]);
  };

  return (
    <FloatingSidebarShell
      shellStyle={{ background: "var(--settings-content)" }}
    >
      <FloatingSidebar width={220}>
        <div className="px-2 pt-1 pb-1" data-handle={id}>
          <AppActions id={id} />
        </div>

        <div className="px-2.5 pb-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="macos-search h-[28px] pl-7 pr-2 text-[13px]"
            />
          </div>
        </div>

        <button
          type="button"
          className="mx-2 mb-2 flex items-center gap-2.5 rounded-[8px] px-2 py-1.5 text-left hover:bg-black/[0.04] dark:hover:bg-white/[0.06] cursor-default"
        >
          <span className="size-9 rounded-full bg-gradient-to-br from-[#7eb6ff] to-[#4c7dff] text-white inline-flex items-center justify-center text-[13px] font-semibold shrink-0">
            Mv
          </span>
          <span className="min-w-0">
            <span className="block os-chrome-em truncate text-[13px]">
              Martijn van der E…
            </span>
            <span className="block os-chrome-sm text-muted-foreground font-normal">
              Apple Account
            </span>
          </span>
        </button>

        <div className="flex-1 min-h-0 overflow-y-auto px-2 pb-3 space-y-[1px]">
          {filtered.map((item) => {
            const selected = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.id)}
                className={cn(
                  "w-full flex items-center gap-2 px-[7px] py-[4px] rounded-[7px] cursor-default text-left",
                  selected
                    ? "text-white"
                    : "text-foreground hover:bg-black/[0.05] dark:hover:bg-white/[0.07]"
                )}
                style={
                  selected
                    ? { background: "var(--macos-accent)" }
                    : undefined
                }
              >
                <SettingsIconBadge item={item} />
                <span className="os-chrome truncate text-[13px]">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </FloatingSidebar>

      <FloatingSidebarContent className="rounded-tl-[16px] bg-white/70 dark:bg-[#1c1c1e]/55">
        <div
          className="absolute inset-0 pointer-events-none rounded-tl-[16px]"
          style={{ background: "var(--window-tint)" }}
        />

        <header
          className="relative z-[1] flex items-center gap-2.5 px-4 h-[48px] shrink-0"
          data-handle={id}
        >
          <FloatingGroup>
            <FloatingGroupButton
              onClick={goBack}
              disabled={historyIndex <= 0}
            >
              <ChevronLeft />
            </FloatingGroupButton>
            <FloatingGroupButton
              onClick={goForward}
              disabled={historyIndex >= history.length - 1}
            >
              <ChevronRight />
            </FloatingGroupButton>
          </FloatingGroup>
          <span className="os-chrome text-[13px] font-semibold tracking-[-0.08px] text-foreground">
            {activeItem.label}
          </span>
        </header>

        <div className="relative z-[1] flex-1 min-h-0 overflow-y-auto px-8 pb-6">
          {active === "appearance" ? (
            <AppearancePane />
          ) : active === "general" ? (
            <GeneralPane item={activeItem} />
          ) : (
            <StubPane item={activeItem} />
          )}
        </div>
      </FloatingSidebarContent>
    </FloatingSidebarShell>
  );
};
