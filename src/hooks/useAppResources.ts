import { useState } from "react";
import { useTheme } from "./useTheme";

/** Keep the login splash readable even when assets are already cached. */
const MIN_BOOT_MS = 1600;

export const useAppResources = () => {
  const { init } = useTheme();
  const [loaded, setLoaded] = useState(false);

  const loadResources = async () => {
    const started = performance.now();
    await init();
    const elapsed = performance.now() - started;
    if (elapsed < MIN_BOOT_MS) {
      await new Promise((resolve) =>
        window.setTimeout(resolve, MIN_BOOT_MS - elapsed)
      );
    }
    setLoaded(true);
  };

  return {
    loaded,
    loadResources,
  };
};
