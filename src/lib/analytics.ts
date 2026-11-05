type UmamiTracker = {
  track: {
    (payload?: Record<string, unknown>): void;
    (eventName: string, data?: Record<string, unknown>): void;
    (
      fn: (props: Record<string, unknown>) => Record<string, unknown>
    ): void;
  };
};

declare global {
  interface Window {
    umami?: UmamiTracker;
  }
}

/** Track an OS app open as an Umami pageview (`/app/<Name>`). */
export const trackAppPageview = (appName: string) => {
  if (typeof window === "undefined" || !window.umami?.track) return;

  const url = `/app/${encodeURIComponent(appName)}`;
  const title = appName;

  window.umami.track((props) => ({
    ...props,
    url,
    title,
  }));
};
