import React from "react";
import { Application } from "./application";
import { AppIcon } from "../components/application/AppIcon";
import Icon from "../icons/siri.png";

/**
 * Registry entry for Dock / Home / Launchpad icon only.
 * Siri UI lives in `SiriOverlay` (Spotlight-style dialog) — never a window.
 */
export class Siri extends Application {
  static appName = "Siri";
  public name = "Siri";
  static icon = () => <AppIcon src={Icon} alt="Siri" squircle />;
  public category = "default";

  component = () => null;

  constructor() {
    super();
  }
}
