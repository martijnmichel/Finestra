import type { Dispatch } from "react";
import i18n from "i18next";
import { languages } from "@/i18n";
import { exportCvPdf } from "@/lib/exportCvPdf";
import { startApp } from "@/store/actions/startApp";
import { toggleLaunchpad } from "@/store/actions/toggleLaunchPad";
import type { AppActions } from "@/store/actions";

export type AssistantContext = {
  dispatch: Dispatch<AppActions>;
  closeSelf?: () => void;
};

export type AssistantAction = {
  id: string;
  labelKey: string;
  keywords: string[];
  /** Shown as a default suggestion chip when the query is empty. */
  suggest?: boolean;
  run: (ctx: AssistantContext) => void;
};

const langCodes = Object.keys(languages) as (keyof typeof languages)[];

const cycleLanguage = () => {
  const current = (i18n.language?.slice(0, 2) as keyof typeof languages) || "en";
  const idx = langCodes.indexOf(current);
  const next = langCodes[(idx + 1) % langCodes.length];
  void i18n.changeLanguage(languages[next].code);
};

export const assistantActions: AssistantAction[] = [
  {
    id: "change-language",
    labelKey: "apps:siri.actions.changeLanguage",
    keywords: ["language", "taal", "lingua", "i18n", "english", "nederlands", "italiano"],
    suggest: true,
    run: () => cycleLanguage(),
  },
  {
    id: "see-projects",
    labelKey: "apps:siri.actions.seeProjects",
    keywords: ["projects", "projecten", "progetti", "launchpad", "apps", "work", "portfolio"],
    suggest: true,
    run: ({ dispatch }) => toggleLaunchpad()(dispatch),
  },
  {
    id: "open-about",
    labelKey: "apps:siri.actions.openAbout",
    keywords: ["about", "over", "cv", "martijn", "profile", "me"],
    suggest: true,
    run: ({ dispatch }) => startApp("About")(dispatch),
  },
  {
    id: "request-project",
    labelKey: "apps:siri.actions.requestProject",
    keywords: ["request", "aanvraag", "hire", "contact", "project", "email"],
    suggest: true,
    run: ({ dispatch }) => startApp("Request")(dispatch),
  },
  {
    id: "open-settings",
    labelKey: "apps:siri.actions.openSettings",
    keywords: ["settings", "instellingen", "impostazioni", "appearance", "wifi"],
    suggest: true,
    run: ({ dispatch }) => startApp("Settings")(dispatch),
  },
  {
    id: "export-cv",
    labelKey: "apps:siri.actions.exportCv",
    keywords: ["cv", "resume", "pdf", "export", "download"],
    suggest: true,
    run: () => exportCvPdf(),
  },
  {
    id: "open-vscode",
    labelKey: "apps:siri.actions.openVscode",
    keywords: ["code", "vscode", "source", "github", "editor"],
    suggest: false,
    run: ({ dispatch }) => startApp("VSCode")(dispatch),
  },
  {
    id: "open-terminal",
    labelKey: "apps:siri.actions.openTerminal",
    keywords: ["terminal", "shell", "cli", "command"],
    suggest: false,
    run: ({ dispatch }) => startApp("Terminal")(dispatch),
  },
  {
    id: "open-finder",
    labelKey: "apps:siri.actions.openFinder",
    keywords: ["finder", "files", "bestanden", "file"],
    suggest: false,
    run: ({ dispatch }) => startApp("Finder")(dispatch),
  },
];

export const getSuggestedActions = () =>
  assistantActions.filter((a) => a.suggest);

export const matchAssistantActions = (
  query: string,
  t: (key: string) => string
): AssistantAction[] => {
  const q = query.trim().toLowerCase();
  if (!q) return getSuggestedActions();

  return assistantActions.filter((action) => {
    const label = t(action.labelKey).toLowerCase();
    return (
      label.includes(q) ||
      action.keywords.some((k) => k.includes(q) || q.includes(k))
    );
  });
};

export const runAssistantAction = (
  id: string,
  ctx: AssistantContext
): boolean => {
  const action = assistantActions.find((a) => a.id === id);
  if (!action) return false;
  action.run(ctx);
  ctx.closeSelf?.();
  return true;
};
