import type { Dispatch } from "react";
import type { AppActions } from "@/store/actions";

export type AssistantContext = {
  dispatch: Dispatch<AppActions>;
  closeSelf?: () => void;
};

/**
 * Declared on `Application.assistantActions` (per app) or as system actions.
 * Prefer `labelKey` (i18n); `label` is a plain fallback.
 */
export type AssistantActionDef = {
  id: string;
  labelKey?: string;
  label?: string;
  keywords: string[];
  /** Shown when Siri query is empty. */
  suggest?: boolean;
  run: (ctx: AssistantContext) => void;
};

export type AssistantAction = AssistantActionDef & {
  /** App that contributed this action, if any. */
  appName?: string;
};

export const resolveActionLabel = (
  action: AssistantActionDef,
  t: (key: string) => string
): string => {
  if (action.labelKey) return t(action.labelKey);
  return action.label ?? action.id;
};
