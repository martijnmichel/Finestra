import { useCallback, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { backgrounds as wallpapers } from "../constants/background";
import {
  applyAppearance,
  DEFAULT_THEME,
  type ThemeConfig,
} from "../lib/appearance";
import { storageKey } from "../lib/os";

const THEME_KEY = storageKey("theme");

// One-time migrate from legacy Finestra key
if (typeof window !== "undefined") {
  const legacy = window.localStorage.getItem("finestra-theme");
  if (legacy && !window.localStorage.getItem(THEME_KEY)) {
    window.localStorage.setItem(THEME_KEY, legacy);
  }
}

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage<ThemeConfig>(
    THEME_KEY,
    DEFAULT_THEME
  );

  const updateTheme = useCallback(
    (patch: Partial<ThemeConfig>) => {
      setTheme((prev) => ({ ...prev, ...patch }));
    },
    [setTheme]
  );

  const cacheImages = async () => {
    const promises = wallpapers.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject();
      });
    });

    await Promise.all(promises);
  };

  const init = async () => {
    applyAppearance({ ...DEFAULT_THEME, ...theme });
    await cacheImages();
  };

  useEffect(() => {
    applyAppearance({ ...DEFAULT_THEME, ...theme });
  }, [theme]);

  useEffect(() => {
    if (theme.mode !== "auto") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyAppearance({ ...DEFAULT_THEME, ...theme });
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  return {
    init,
    theme: { ...DEFAULT_THEME, ...theme },
    setTheme,
    updateTheme,
  };
};
