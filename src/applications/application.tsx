import React from "react";
import { v4 } from "uuid";
import { Apple } from "lucide-react";

export type AppConfig = {
  minimized?: boolean;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
};

export class Application {
  active = true; // the activated/focused app window
  minimized = false; // minimized/unminimized
  public name = "Default App";
  id = v4();

  multiple = false;
  fullscreen = false;

  width = window.innerWidth > 900 ? 800 : window.innerWidth - 100;
  height = window.innerHeight > 800 ? 600 : window.innerHeight - 100;

  x = 0;
  y = 0;

  static category = "default";

  titleBar = false;

  static icon: (() => React.ReactNode) | undefined = () => (
    <Apple className="size-8" />
  );

  component: (() => React.ReactNode) | undefined;

  constructor(config?: AppConfig) {
    if (config?.minimized) this.minimized = config?.minimized;
    if (config?.width) this.width = config?.width;
    if (config?.height) this.height = config?.height;
    if (config?.x) this.x = config?.x;
    if (config?.y) this.y = config?.y;
  }
}
