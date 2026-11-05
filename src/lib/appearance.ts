import { backgrounds } from "../constants/background";

export type AppearanceMode = "light" | "dark" | "auto";
export type LiquidGlass = "clear" | "tinted";
export type IconStyle = "default" | "dark" | "clear" | "tinted";
export type SidebarIconSize = "small" | "medium" | "large";
export type ScrollBarVisibility = "automatic" | "when-scrolling" | "always";
export type ScrollBarClick = "page" | "spot";

export type AccentColorId =
  | "multicolor"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "graphite";

export type HighlightColorId = AccentColorId;

export type ThemeConfig = {
  background: string;
  mode: AppearanceMode;
  liquidGlass: LiquidGlass;
  accentColor: AccentColorId;
  highlightColor: HighlightColorId;
  iconStyle: IconStyle;
  folderColor: "automatic" | AccentColorId;
  sidebarIconSize: SidebarIconSize;
  tintWindowsWithWallpaper: boolean;
  showScrollBars: ScrollBarVisibility;
  scrollBarClick: ScrollBarClick;
};

export const ACCENT_COLORS: Record<
  Exclude<AccentColorId, "multicolor">,
  { label: string; light: string; dark: string }
> = {
  blue: { label: "Blue", light: "#007aff", dark: "#0a84ff" },
  purple: { label: "Purple", light: "#af52de", dark: "#bf5af2" },
  pink: { label: "Pink", light: "#ff2d55", dark: "#ff375f" },
  red: { label: "Red", light: "#ff3b30", dark: "#ff453a" },
  orange: { label: "Orange", light: "#ff9500", dark: "#ff9f0a" },
  yellow: { label: "Yellow", light: "#ffcc00", dark: "#ffd60a" },
  green: { label: "Green", light: "#28cd41", dark: "#30d158" },
  graphite: { label: "Graphite", light: "#8e8e93", dark: "#98989d" },
};

export const ACCENT_SWATCH_ORDER: AccentColorId[] = [
  "multicolor",
  "blue",
  "purple",
  "pink",
  "red",
  "orange",
  "yellow",
  "green",
  "graphite",
];

export const DEFAULT_THEME: ThemeConfig = {
  background: backgrounds[0],
  mode: "light",
  liquidGlass: "clear",
  accentColor: "blue",
  highlightColor: "blue",
  iconStyle: "default",
  folderColor: "automatic",
  sidebarIconSize: "medium",
  tintWindowsWithWallpaper: true,
  showScrollBars: "automatic",
  scrollBarClick: "page",
};

export const resolveAccentHex = (
  id: AccentColorId,
  isDark: boolean
): string => {
  if (id === "multicolor") {
    return isDark ? ACCENT_COLORS.blue.dark : ACCENT_COLORS.blue.light;
  }
  return isDark ? ACCENT_COLORS[id].dark : ACCENT_COLORS[id].light;
};

export const resolveEffectiveMode = (mode: AppearanceMode): "light" | "dark" => {
  if (mode === "auto") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return mode;
};

const glassTokens = (liquidGlass: LiquidGlass, isDark: boolean) => {
  if (liquidGlass === "clear") {
    return {
      menubarBg: isDark ? "rgba(30, 30, 32, 0.42)" : "rgba(255, 255, 255, 0.42)",
      sidebar: isDark ? "rgba(40, 40, 42, 0.55)" : "rgba(246, 246, 246, 0.55)",
      popover: isDark ? "rgba(40, 40, 42, 0.62)" : "rgba(255, 255, 255, 0.62)",
      windowTitlebar: isDark
        ? "linear-gradient(180deg, rgba(58,58,60,0.72) 0%, rgba(44,44,46,0.68) 100%)"
        : "linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(242,242,242,0.68) 100%)",
      windowToolbar: isDark
        ? "rgba(44, 44, 46, 0.72)"
        : "rgba(246, 246, 246, 0.72)",
      dockBg: isDark ? "rgba(40, 40, 42, 0.45)" : "rgba(245, 245, 247, 0.45)",
      windowBody: isDark ? "rgba(30, 30, 30, 0.86)" : "rgba(255, 255, 255, 0.86)",
      settingsContent: isDark
        ? "rgba(28, 28, 30, 0.45)"
        : "rgba(232, 232, 237, 0.55)",
      settingsGroup: isDark
        ? "rgba(58, 58, 60, 0.88)"
        : "rgba(255, 255, 255, 0.9)",
      blur: "40px",
      saturate: "190%",
    };
  }

  return {
    menubarBg: isDark ? "rgba(30, 30, 32, 0.72)" : "rgba(255, 255, 255, 0.72)",
    sidebar: isDark ? "rgba(40, 40, 42, 0.82)" : "rgba(246, 246, 246, 0.82)",
    popover: isDark ? "rgba(40, 40, 42, 0.88)" : "rgba(255, 255, 255, 0.88)",
    windowTitlebar: isDark
      ? "linear-gradient(180deg, #3a3a3c 0%, #2c2c2e 100%)"
      : "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(242,242,242,0.9) 100%)",
    windowToolbar: isDark ? "#2c2c2e" : "rgba(246, 246, 246, 0.94)",
    dockBg: isDark ? "rgba(40, 40, 42, 0.72)" : "rgba(245, 245, 247, 0.72)",
    windowBody: isDark ? "rgba(30, 30, 30, 0.94)" : "rgba(255, 255, 255, 0.94)",
    settingsContent: isDark
      ? "rgba(28, 28, 30, 0.72)"
      : "rgba(235, 235, 240, 0.88)",
    settingsGroup: isDark
      ? "rgba(58, 58, 60, 0.96)"
      : "rgba(255, 255, 255, 0.96)",
    blur: "28px",
    saturate: "160%",
  };
};

export const applyAppearance = (theme: ThemeConfig) => {
  const root = document.documentElement;
  const effective = resolveEffectiveMode(theme.mode);
  const isDark = effective === "dark";
  const accent = resolveAccentHex(theme.accentColor, isDark);
  const highlight = resolveAccentHex(theme.highlightColor, isDark);
  const glass = glassTokens(theme.liquidGlass, isDark);

  root.classList.toggle("dark", isDark);
  root.dataset.mode = theme.mode;
  root.dataset.effectiveMode = effective;
  root.dataset.liquidGlass = theme.liquidGlass;
  root.dataset.iconStyle = theme.iconStyle;
  root.dataset.sidebarIconSize = theme.sidebarIconSize;
  root.dataset.wallpaperTint = theme.tintWindowsWithWallpaper ? "on" : "off";
  root.dataset.scrollBars = theme.showScrollBars;

  root.style.setProperty("--macos-accent", accent);
  root.style.setProperty("--macos-highlight", highlight);
  root.style.setProperty("--ring", accent);
  root.style.setProperty("--sidebar-primary", accent);
  root.style.setProperty("--sidebar-ring", accent);
  root.style.setProperty("--menubar-bg", glass.menubarBg);
  root.style.setProperty("--sidebar", glass.sidebar);
  root.style.setProperty("--popover", glass.popover);
  root.style.setProperty("--window-titlebar", glass.windowTitlebar);
  root.style.setProperty("--window-toolbar", glass.windowToolbar);
  root.style.setProperty("--dock-bg", glass.dockBg);
  root.style.setProperty("--window-body", glass.windowBody);
  root.style.setProperty("--settings-content", glass.settingsContent);
  root.style.setProperty("--settings-group", glass.settingsGroup);
  root.style.setProperty("--glass-blur", glass.blur);
  root.style.setProperty("--glass-saturate", glass.saturate);

  if (theme.tintWindowsWithWallpaper) {
    root.style.setProperty(
      "--window-tint",
      isDark ? "rgba(120, 140, 180, 0.08)" : "rgba(180, 200, 230, 0.12)"
    );
  } else {
    root.style.setProperty("--window-tint", "transparent");
  }
};

export const accentLabel = (id: AccentColorId): string => {
  if (id === "multicolor") return "Multicolor";
  return ACCENT_COLORS[id].label;
};
