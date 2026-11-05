import i18n from "i18next";
import { languages } from "@/i18n";
import { Applications } from "@/applications";
import { Application } from "@/applications/application";
import { startApp } from "@/store/actions/startApp";
import { toggleLaunchpad } from "@/store/actions/toggleLaunchPad";
import type {
  AssistantAction,
  AssistantActionDef,
  AssistantContext,
} from "./types";
import { resolveActionLabel } from "./types";

export type { AssistantAction, AssistantActionDef, AssistantContext };
export { resolveActionLabel };

const langCodes = Object.keys(languages) as (keyof typeof languages)[];

const cycleLanguage = () => {
  const current =
    (i18n.language?.slice(0, 2) as keyof typeof languages) || "en";
  const idx = langCodes.indexOf(current);
  const next = langCodes[(idx + 1) % langCodes.length];
  void i18n.changeLanguage(languages[next].code);
};

/** OS-level actions not owned by a single app window. */
const systemAssistantActions: AssistantActionDef[] = [
  {
    id: "system:change-language",
    labelKey: "apps:siri.actions.changeLanguage",
    keywords: [
      "language",
      "taal",
      "lingua",
      "i18n",
      "english",
      "nederlands",
      "italiano",
    ],
    suggest: true,
    run: () => cycleLanguage(),
  },
  {
    id: "system:see-projects",
    labelKey: "apps:siri.actions.seeProjects",
    keywords: [
      "projects",
      "projecten",
      "progetti",
      "launchpad",
      "apps",
      "work",
      "portfolio",
    ],
    suggest: true,
    run: ({ dispatch }) => toggleLaunchpad()(dispatch),
  },
];

const skipAutoOpen = new Set(["Siri"]);

/**
 * Collect system actions + every `Application.assistantActions` +
 * a default “Open {App}” for apps that don’t declare one.
 */
export const collectAssistantActions = (): AssistantAction[] => {
  const collected: AssistantAction[] = systemAssistantActions.map((a) => ({
    ...a,
  }));
  const seen = new Set(collected.map((a) => a.id));

  for (const App of Object.values(Applications) as (typeof Application)[]) {
    const appName = App.appName;
    if (!appName || skipAutoOpen.has(appName)) continue;

    const defs = App.assistantActions ?? [];
    for (const def of defs) {
      if (seen.has(def.id)) continue;
      seen.add(def.id);
      collected.push({ ...def, appName });
    }

    const openId = `open-${appName.toLowerCase()}`;
    const hasOpen = defs.some(
      (d) =>
        d.id === openId ||
        d.id === `open-${appName}` ||
        d.keywords.includes(appName.toLowerCase())
    );
    if (!hasOpen && !seen.has(openId)) {
      seen.add(openId);
      collected.push({
        id: openId,
        label: `Open ${appName}`,
        keywords: [appName.toLowerCase(), "open", "app"],
        suggest: false,
        appName,
        run: ({ dispatch }) => startApp(appName)(dispatch),
      });
    }
  }

  return collected;
};

export const getSuggestedActions = () =>
  collectAssistantActions().filter((a) => a.suggest);

export const matchAssistantActions = (
  query: string,
  t: (key: string) => string
): AssistantAction[] => {
  const q = query.trim().toLowerCase();
  const all = collectAssistantActions();
  if (!q) return all.filter((a) => a.suggest);

  return all.filter((action) => {
    const label = resolveActionLabel(action, t).toLowerCase();
    const app = (action.appName ?? "").toLowerCase();
    return (
      label.includes(q) ||
      app.includes(q) ||
      action.keywords.some((k) => k.includes(q) || q.includes(k))
    );
  });
};

export const runAssistantAction = (
  id: string,
  ctx: AssistantContext
): boolean => {
  const action = collectAssistantActions().find((a) => a.id === id);
  if (!action) return false;
  action.run(ctx);
  ctx.closeSelf?.();
  return true;
};
