export type SettingsPaneId =
  | "wifi"
  | "bluetooth"
  | "network"
  | "vpn"
  | "energy"
  | "general"
  | "language-region"
  | "accessibility"
  | "appearance"
  | "apple-intelligence"
  | "control-center"
  | "desktop-dock"
  | "displays"
  | "menu-bar"
  | "spotlight"
  | "wallpaper"
  | "notifications"
  | "sound"
  | "focus"
  | "screen-time"
  | "lock-screen"
  | "privacy"
  | "touch-id"
  | "users"
  | "internet-accounts"
  | "game-center"
  | "icloud"
  | "wallet"
  | "keyboard"
  | "mouse"
  | "trackpad"
  | "printers";

export type SettingsNavItem = {
  id: SettingsPaneId;
  iconBg: string;
  /** Lucide icon name key used in SettingsApp */
  icon: string;
};

/** Nested under General — deep-linkable, not shown in the sidebar list. */
export const LANGUAGE_REGION_PANE: SettingsNavItem = {
  id: "language-region",
  iconBg: "#007aff",
  icon: "globe",
};

export const SETTINGS_NAV: SettingsNavItem[] = [
  { id: "wifi", iconBg: "#007aff", icon: "wifi" },
  { id: "bluetooth", iconBg: "#007aff", icon: "bluetooth" },
  { id: "network", iconBg: "#007aff", icon: "network" },
  { id: "vpn", iconBg: "#007aff", icon: "shield" },
  { id: "energy", iconBg: "#34c759", icon: "battery" },
  { id: "general", iconBg: "#8e8e93", icon: "settings" },
  { id: "accessibility", iconBg: "#007aff", icon: "accessibility" },
  { id: "appearance", iconBg: "#007aff", icon: "paintbrush" },
  {
    id: "apple-intelligence",
    iconBg: "linear-gradient(135deg,#bf5af2,#0a84ff,#30d158)",
    icon: "sparkles",
  },
  { id: "control-center", iconBg: "#8e8e93", icon: "sliders" },
  { id: "desktop-dock", iconBg: "#007aff", icon: "panel-bottom" },
  { id: "displays", iconBg: "#007aff", icon: "monitor" },
  { id: "menu-bar", iconBg: "#8e8e93", icon: "panel-top" },
  { id: "spotlight", iconBg: "#8e8e93", icon: "search" },
  { id: "wallpaper", iconBg: "#30d158", icon: "image" },
  { id: "notifications", iconBg: "#ff3b30", icon: "bell" },
  { id: "sound", iconBg: "#ff2d55", icon: "volume-2" },
  { id: "focus", iconBg: "#5856d6", icon: "moon" },
  { id: "screen-time", iconBg: "#5856d6", icon: "hourglass" },
  { id: "lock-screen", iconBg: "#000000", icon: "lock" },
  { id: "privacy", iconBg: "#007aff", icon: "hand" },
  { id: "touch-id", iconBg: "#ffffff", icon: "fingerprint" },
  { id: "users", iconBg: "#8e8e93", icon: "users" },
  { id: "internet-accounts", iconBg: "#007aff", icon: "at-sign" },
  { id: "game-center", iconBg: "#ffffff", icon: "gamepad-2" },
  { id: "icloud", iconBg: "#007aff", icon: "cloud" },
  { id: "wallet", iconBg: "#000000", icon: "wallet" },
  { id: "keyboard", iconBg: "#8e8e93", icon: "keyboard" },
  { id: "mouse", iconBg: "#8e8e93", icon: "mouse" },
  { id: "trackpad", iconBg: "#8e8e93", icon: "tablet" },
  { id: "printers", iconBg: "#8e8e93", icon: "printer" },
];

export const ALL_SETTINGS_PANES: SettingsNavItem[] = [
  ...SETTINGS_NAV,
  LANGUAGE_REGION_PANE,
];

export const isSettingsPaneId = (
  value: string | undefined
): value is SettingsPaneId =>
  !!value && ALL_SETTINGS_PANES.some((item) => item.id === value);

export const getSettingsPaneItem = (
  id: SettingsPaneId
): SettingsNavItem | undefined =>
  ALL_SETTINGS_PANES.find((item) => item.id === id);

/** Sidebar selection parent for nested panes. */
export const settingsSidebarSelection = (
  pane: SettingsPaneId
): SettingsPaneId => (pane === "language-region" ? "general" : pane);
