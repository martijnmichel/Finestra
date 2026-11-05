import { useEffect, useState } from "react";

export type OsFormFactor = "ios" | "ipados" | "macos";

export const PHONE_BREAKPOINT = 768;
export const TABLET_BREAKPOINT = 1024;

export function getOsFormFactor(
  width = typeof window !== "undefined" ? window.innerWidth : TABLET_BREAKPOINT
): OsFormFactor {
  if (width < PHONE_BREAKPOINT) return "ios";
  if (width < TABLET_BREAKPOINT) return "ipados";
  return "macos";
}

export function isMobileShell(formFactor: OsFormFactor = getOsFormFactor()) {
  return formFactor !== "macos";
}

/** iPhone single-app shell (no window chrome). */
export function isIosPhone(formFactor: OsFormFactor = getOsFormFactor()) {
  return formFactor === "ios";
}

function applyFormFactorDataset(formFactor: OsFormFactor) {
  document.documentElement.dataset.osFormFactor = formFactor;
}

if (typeof document !== "undefined") {
  applyFormFactorDataset(getOsFormFactor());
}

/** Sync read + live updates; also sets `document.documentElement.dataset.osFormFactor`. */
export function useOsFormFactor() {
  const [formFactor, setFormFactor] = useState<OsFormFactor>(() =>
    getOsFormFactor()
  );

  useEffect(() => {
    const sync = () => {
      const next = getOsFormFactor();
      setFormFactor(next);
      applyFormFactorDataset(next);
    };

    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return {
    formFactor,
    isMobileShell: isMobileShell(formFactor),
    isIos: formFactor === "ios",
    isIpados: formFactor === "ipados",
    isMacos: formFactor === "macos",
  };
}
