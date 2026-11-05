/** Portfolio OS identity — shown in About This Mac, chrome, and emails. */
export const OS_NAME = "MartijnOS";
export const OS_VERSION = "15.0";
export const OS_BUILD = "25A354";
export const OS_CODENAME = "Sequoia";
export const OS_STORAGE_PREFIX = "martijnos";

export const storageKey = (name: string) => `${OS_STORAGE_PREFIX}-${name}`;

export type OsMetrics = {
  chip: string;
  cores: number;
  memory: string;
  display: string;
  pixelRatio: number;
  language: string;
  platform: string;
  online: boolean;
  startupDisk: string;
};

export const getOsMetrics = (): OsMetrics => {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency || 4;
  const memGb = nav.deviceMemory;
  const memory =
    typeof memGb === "number"
      ? `${memGb} GB`
      : cores >= 8
        ? "16 GB"
        : "8 GB";

  const w = window.screen.width;
  const h = window.screen.height;
  const dpr = window.devicePixelRatio || 1;

  let chip = "Apple M-series (emulated)";
  const ua = nav.userAgent;
  if (/Mac OS X/.test(ua) && /AppleWebKit/.test(ua)) {
    chip = dpr >= 2 ? "Apple Silicon" : "Intel";
  } else if (/Win/.test(ua)) {
    chip = "x86_64";
  } else if (/Linux/.test(ua)) {
    chip = "Linux";
  }

  return {
    chip,
    cores,
    memory,
    display: `${w}×${h} (${dpr}x)`,
    pixelRatio: dpr,
    language: nav.language || "en",
    platform: nav.platform || "Web",
    online: nav.onLine,
    startupDisk: OS_NAME,
  };
};
