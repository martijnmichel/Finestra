import React from "react";
import { v4 } from "uuid";
import { Icon } from "@iconify/react";
import type { AssistantActionDef } from "@/lib/assistant/types";

export type AppConfig = {
  minimized?: boolean;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  /** Prefill for Request app (project key from projects()). */
  relatedProject?: string;
  /** Open Settings to this pane (SettingsPaneId). */
  settingsPane?: string;
};

export class Application {
  active = true; // the activated/focused app window
  minimized = false; // minimized/unminimized
  /** Stable app id/label — do not use Class.name (mangled in production). */
  static appName = "Default App";
  public name = "Default App";
  id = v4();
  /** Higher = closer to front. Bumped on open/focus. */
  stackOrder = 0;

  multiple = false;
  fullscreen = false;

  width = window.innerWidth > 900 ? 800 : window.innerWidth - 100;
  height = window.innerHeight > 800 ? 600 : window.innerHeight - 100;

  x = 0;
  y = 0;

  static category = "default";

  titleBar = false;

  relatedProject?: string;
  settingsPane?: string;

  static icon: (() => React.ReactNode) | undefined = () => (
    <Icon icon="fxemoji:redapple" />
  );

  /**
   * Siri / Spotlight actions contributed by this app.
   * Declare on the class in each app file — collected at runtime.
   */
  static assistantActions: AssistantActionDef[] = [];

  component: (() => React.ReactNode) | undefined;

  constructor(config?: AppConfig) {
    this.name = (this.constructor as typeof Application).appName;
    if (config?.minimized) this.minimized = config?.minimized;
    if (config?.width) this.width = config?.width;
    if (config?.height) this.height = config?.height;
    if (config?.x) this.x = config?.x;
    if (config?.y) this.y = config?.y;
    if (config?.relatedProject) this.relatedProject = config.relatedProject;
    if (config?.settingsPane) this.settingsPane = config.settingsPane;
  }
}
