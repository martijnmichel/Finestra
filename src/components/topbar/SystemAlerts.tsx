import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useAppContext } from "@/store";
import { closeApp } from "@/store/actions/closeApp";
import { OS_NAME } from "@/lib/os";
import { cn } from "@/lib/utils";

export type SystemAlertKind =
  | "forceQuit"
  | "restart"
  | "shutDown"
  | "logOut"
  | "appStore"
  | null;

export const SystemAlertDialog = ({
  kind,
  onClose,
}: {
  kind: SystemAlertKind;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const {
    state: { applications },
    dispatch,
  } = useAppContext();

  if (!kind) return null;

  const titles: Record<Exclude<SystemAlertKind, null>, string> = {
    forceQuit: t("common:systemAlerts.forceQuitTitle"),
    restart: t("common:systemAlerts.restartTitle"),
    shutDown: t("common:systemAlerts.shutDownTitle"),
    logOut: t("common:systemAlerts.logOutTitle"),
    appStore: t("common:systemAlerts.appStoreTitle"),
  };

  const bodies: Record<Exclude<SystemAlertKind, null>, string> = {
    forceQuit: t("common:systemAlerts.forceQuitBody"),
    restart: t("common:systemAlerts.restartBody", { os: OS_NAME }),
    shutDown: t("common:systemAlerts.shutDownBody", { os: OS_NAME }),
    logOut: t("common:systemAlerts.logOutBody", { os: OS_NAME }),
    appStore: t("common:systemAlerts.appStoreBody", { os: OS_NAME }),
  };

  return (
    <Dialog open={!!kind} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className={cn(
          "os-chrome max-w-[360px] gap-3 rounded-[12px] border border-black/10 p-4 dark:border-white/10",
          "bg-[color-mix(in_srgb,var(--popover)_94%,transparent)]",
          "[&>button]:top-3 [&>button]:right-3"
        )}
        style={{
          backdropFilter:
            "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
          WebkitBackdropFilter:
            "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
        }}
      >
        <DialogHeader className="space-y-1.5 text-left">
          <DialogTitle className="os-chrome text-[13px] font-semibold tracking-[-0.08px]">
            {titles[kind]}
          </DialogTitle>
          <DialogDescription className="os-chrome-muted">
            {bodies[kind]}
          </DialogDescription>
        </DialogHeader>

        {kind === "forceQuit" ? (
          <div className="max-h-[180px] overflow-y-auto rounded-[8px] border border-black/10 dark:border-white/10 divide-y divide-black/10 dark:divide-white/10">
            {applications.length === 0 ? (
              <p className="os-chrome-muted px-3 py-4 text-center">
                {t("common:systemAlerts.noApps")}
              </p>
            ) : (
              applications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center gap-2 px-3 py-2"
                >
                  <span className="os-chrome flex-1 truncate">{app.name}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 text-[11px]"
                    onClick={() => closeApp(app.id)(dispatch)}
                  >
                    {t("common:systemAlerts.forceQuitApp")}
                  </Button>
                </div>
              ))
            )}
          </div>
        ) : null}

        <DialogFooter className="gap-2 sm:justify-end">
          {kind === "appStore" || kind === "forceQuit" ? (
            <Button onClick={onClose}>{t("common:aboutMac.ok")}</Button>
          ) : (
            <>
              <Button variant="outline" onClick={onClose}>
                {t("common:systemAlerts.cancel")}
              </Button>
              <Button
                onClick={onClose}
                className="bg-[#ff3b30] hover:bg-[#ff453a] text-white"
              >
                {kind === "restart"
                  ? t("common:menuBar.restart").replace("…", "")
                  : kind === "shutDown"
                    ? t("common:menuBar.shutDown").replace("…", "")
                    : t("common:menuBar.logOut").replace("…", "")}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const SleepOverlay = ({
  active,
  onWake,
}: {
  active: boolean;
  onWake: () => void;
}) => {
  if (!active) return null;
  return (
    <button
      type="button"
      aria-label="Wake"
      className="fixed inset-0 z-[200] bg-black cursor-default animate-in fade-in-0 duration-500"
      onClick={onWake}
      onKeyDown={onWake}
    />
  );
};

export const LockScreenOverlay = ({
  active,
  onUnlock,
}: {
  active: boolean;
  onUnlock: () => void;
}) => {
  const { t } = useTranslation();
  if (!active) return null;

  const now = new Date();
  const time = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <button
      type="button"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-3 cursor-default bg-black/80 backdrop-blur-2xl text-white animate-in fade-in-0 duration-300"
      onClick={onUnlock}
    >
      <div className="text-[64px] font-light tracking-tight tabular-nums leading-none">
        {time}
      </div>
      <div className="os-chrome text-[15px] text-white/80">{date}</div>
      <div className="os-chrome-muted mt-10 text-white/55">
        {t("common:systemAlerts.unlockHint")}
      </div>
    </button>
  );
};
