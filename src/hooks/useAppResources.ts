import { useState } from "react";
import { storageKey } from "@/lib/os";
import { useTheme } from "./useTheme";

/** Keep the login splash readable even when assets are already cached. */
const MIN_BOOT_MS = 1600;
const BOOT_SESSION_KEY = storageKey("session-booted");

function readSessionBooted(): boolean {
  try {
    return sessionStorage.getItem(BOOT_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markSessionBooted() {
  try {
    sessionStorage.setItem(BOOT_SESSION_KEY, "1");
  } catch {
    // private mode / blocked storage — splash may replay
  }
}

/**
 * Skip the login splash when:
 * - developing (Vite full-reloads on many edits; splash would play every time)
 * - this tab already finished boot once (survives full page reload / HMR)
 */
function shouldSkipBoot(): boolean {
  return import.meta.env.DEV || readSessionBooted();
}

export const useAppResources = () => {
  const { init } = useTheme();
  const [loaded, setLoaded] = useState(shouldSkipBoot);

  const loadResources = async () => {
    if (shouldSkipBoot()) {
      markSessionBooted();
      setLoaded(true);
      return;
    }

    const started = performance.now();
    await init();
    const elapsed = performance.now() - started;
    if (elapsed < MIN_BOOT_MS) {
      await new Promise((resolve) =>
        window.setTimeout(resolve, MIN_BOOT_MS - elapsed)
      );
    }
    markSessionBooted();
    setLoaded(true);
  };

  return {
    loaded,
    loadResources,
  };
};
