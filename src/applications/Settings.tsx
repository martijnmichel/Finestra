import React from "react";
import { AppIcon } from "../components/application/AppIcon";
import { Application } from "./application";
import Icon from "../icons/settings.png";
import { SettingsApp } from "./settings/SettingsApp";
import { startApp } from "@/store/actions/startApp";
import type { AssistantActionDef } from "@/lib/assistant/types";
import type { SettingsPaneId } from "./settings/nav";

export { SettingsApp };

const openSettingsPane =
  (pane: SettingsPaneId): AssistantActionDef["run"] =>
  ({ dispatch }) =>
    startApp("Settings", { settingsPane: pane })(dispatch);

export class Settings extends Application {
  static appName = "Settings";
  public name = "Settings";
  static icon = () => <AppIcon src={Icon} alt="Settings" />;
  public category = "default";

  titleBar = true;
  width = 780;
  height = 620;

  static assistantActions: AssistantActionDef[] = [
    {
      id: "settings:open",
      labelKey: "apps:siri.actions.openSettings",
      keywords: ["settings", "instellingen", "impostazioni", "system"],
      suggest: true,
      run: ({ dispatch }) => startApp("Settings")(dispatch),
    },
    {
      id: "settings:appearance",
      labelKey: "apps:settings.panes.appearance",
      keywords: [
        "appearance",
        "theme",
        "dark",
        "light",
        "accent",
        "glass",
        "wallpaper tint",
      ],
      run: openSettingsPane("appearance"),
    },
    {
      id: "settings:language-region",
      labelKey: "apps:settings.panes.language-region",
      keywords: [
        "language",
        "region",
        "locale",
        "taal",
        "lingua",
        "i18n",
      ],
      run: openSettingsPane("language-region"),
    },

    {
      id: "settings:wifi",
      labelKey: "apps:settings.panes.wifi",
      keywords: ["wifi", "wi-fi", "network", "internet"],
      run: openSettingsPane("wifi"),
    },
    {
      id: "settings:bluetooth",
      labelKey: "apps:settings.panes.bluetooth",
      keywords: ["bluetooth", "devices"],
      run: openSettingsPane("bluetooth"),
    },
    {
      id: "settings:wallpaper",
      labelKey: "apps:settings.panes.wallpaper",
      keywords: ["wallpaper", "background", "desktop"],
      run: openSettingsPane("wallpaper"),
    },
    {
      id: "settings:notifications",
      labelKey: "apps:settings.panes.notifications",
      keywords: ["notifications", "alerts", "banner"],
      run: openSettingsPane("notifications"),
    },
    {
      id: "settings:focus",
      labelKey: "apps:settings.panes.focus",
      keywords: ["focus", "dnd", "do not disturb"],
      run: openSettingsPane("focus"),
    },
    {
      id: "settings:displays",
      labelKey: "apps:settings.panes.displays",
      keywords: ["display", "brightness", "monitor", "screen"],
      run: openSettingsPane("displays"),
    },
  ];

  component = () => SettingsApp(this.id);

  constructor(config?: ConstructorParameters<typeof Application>[0]) {
    super(config);
  }
}
