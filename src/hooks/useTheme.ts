import { useLocalStorage } from "usehooks-ts";
import {
  backgrounds,
  backgrounds as wallpapers,
} from "../constants/background";

type ThemeConfig = {
  background: string;
};

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage("finestra-theme", {
    background: backgrounds[0],
  });
  /**
   * Load the needed resources from localStorage
   */
  const init = async () => {
    await cacheImages();
  };

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

  return {
    init,
    theme
  };
};
