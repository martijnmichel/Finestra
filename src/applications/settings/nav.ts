export type SettingsPaneId =
  | "wifi"
  | "bluetooth"
  | "network"
  | "vpn"
  | "energy"
  | "general"
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
  label: string;
  iconBg: string;
  /** Lucide icon name key used in SettingsApp */
  icon: string;
  description?: string;
};

export const SETTINGS_NAV: SettingsNavItem[] = [
  { id: "wifi", label: "Wi-Fi", iconBg: "#007aff", icon: "wifi" },
  { id: "bluetooth", label: "Bluetooth", iconBg: "#007aff", icon: "bluetooth" },
  { id: "network", label: "Network", iconBg: "#007aff", icon: "network" },
  { id: "vpn", label: "VPN", iconBg: "#007aff", icon: "shield" },
  { id: "energy", label: "Energy", iconBg: "#34c759", icon: "battery" },
  {
    id: "general",
    label: "General",
    iconBg: "#8e8e93",
    icon: "settings",
    description: "Manage general system settings, storage and software updates",
  },
  {
    id: "accessibility",
    label: "Accessibility",
    iconBg: "#007aff",
    icon: "accessibility",
  },
  {
    id: "appearance",
    label: "Appearance",
    iconBg: "#007aff",
    icon: "paintbrush",
    description: "Light, Dark, Liquid Glass, accent and highlight colours",
  },
  {
    id: "apple-intelligence",
    label: "Apple Intelligence & Siri",
    iconBg: "linear-gradient(135deg,#bf5af2,#0a84ff,#30d158)",
    icon: "sparkles",
  },
  {
    id: "control-center",
    label: "Control Centre",
    iconBg: "#8e8e93",
    icon: "sliders",
  },
  {
    id: "desktop-dock",
    label: "Desktop & Dock",
    iconBg: "#007aff",
    icon: "panel-bottom",
  },
  { id: "displays", label: "Displays", iconBg: "#007aff", icon: "monitor" },
  { id: "menu-bar", label: "Menu Bar", iconBg: "#8e8e93", icon: "panel-top" },
  { id: "spotlight", label: "Spotlight", iconBg: "#8e8e93", icon: "search" },
  { id: "wallpaper", label: "Wallpaper", iconBg: "#30d158", icon: "image" },
  {
    id: "notifications",
    label: "Notifications",
    iconBg: "#ff3b30",
    icon: "bell",
  },
  { id: "sound", label: "Sound", iconBg: "#ff2d55", icon: "volume-2" },
  { id: "focus", label: "Focus", iconBg: "#5856d6", icon: "moon" },
  {
    id: "screen-time",
    label: "Screen Time",
    iconBg: "#5856d6",
    icon: "hourglass",
  },
  { id: "lock-screen", label: "Lock Screen", iconBg: "#000000", icon: "lock" },
  {
    id: "privacy",
    label: "Privacy & Security",
    iconBg: "#007aff",
    icon: "hand",
  },
  {
    id: "touch-id",
    label: "Login Password",
    iconBg: "#ffffff",
    icon: "fingerprint",
  },
  {
    id: "users",
    label: "Users & Groups",
    iconBg: "#8e8e93",
    icon: "users",
  },
  {
    id: "internet-accounts",
    label: "Internet Accounts",
    iconBg: "#007aff",
    icon: "at-sign",
  },
  {
    id: "game-center",
    label: "Game Center",
    iconBg: "#ffffff",
    icon: "gamepad-2",
  },
  { id: "icloud", label: "iCloud", iconBg: "#007aff", icon: "cloud" },
  {
    id: "wallet",
    label: "Wallet & Apple Pay",
    iconBg: "#000000",
    icon: "wallet",
  },
  { id: "keyboard", label: "Keyboard", iconBg: "#8e8e93", icon: "keyboard" },
  { id: "mouse", label: "Mouse", iconBg: "#8e8e93", icon: "mouse" },
  { id: "trackpad", label: "Trackpad", iconBg: "#8e8e93", icon: "tablet" },
  {
    id: "printers",
    label: "Printers & Scanners",
    iconBg: "#8e8e93",
    icon: "printer",
  },
];
