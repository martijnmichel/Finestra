import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  getOsMetrics,
  OS_BUILD,
  OS_NAME,
  OS_VERSION,
} from "@/lib/os";
import { startApp } from "@/store/actions/startApp";
import { useAppContext } from "@/store";
import { cn } from "@/lib/utils";

function MetricRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="os-chrome grid grid-cols-[110px_1fr] gap-2 py-[3px]">
      <span className="text-right text-muted-foreground">{label}</span>
      <span className="os-chrome-em text-foreground">{value}</span>
    </div>
  );
}

export const AboutThisMac = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { t } = useTranslation();
  const { dispatch } = useAppContext();
  const metrics = useMemo(() => getOsMetrics(), [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "os-chrome max-w-[320px] gap-0 overflow-hidden rounded-[14px] border border-black/10 p-0 shadow-[0_0_0_0.5px_rgba(0,0,0,0.12),0_24px_60px_rgba(0,0,0,0.35)] dark:border-white/10",
          "bg-[color-mix(in_srgb,var(--popover)_94%,transparent)]",
          "[&>button]:hidden"
        )}
        style={{
          backdropFilter:
            "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
          WebkitBackdropFilter:
            "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
        }}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>
            {t("common:menuBar.aboutThisMac")}
          </DialogTitle>
          <DialogDescription>
            {OS_NAME} {OS_VERSION}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center px-6 pt-7 pb-2">
          <div
            className="size-[72px] rounded-[18px] flex items-center justify-center shadow-md mb-3"
            style={{
              background:
                "linear-gradient(180deg, #5ac8fa 0%, #007aff 55%, #5856d6 100%)",
            }}
          >
            <Icon
              icon="ant-design:apple-filled"
              className="!size-10 text-white drop-shadow-sm"
            />
          </div>
          <h2 className="text-[22px] font-semibold tracking-[-0.4px] text-foreground">
            {OS_NAME}
          </h2>
          <p className="os-chrome-muted mt-0.5">
            {t("common:aboutMac.version", {
              version: OS_VERSION,
              build: OS_BUILD,
            })}
          </p>
        </div>

        <div className="px-5 py-3">
          <MetricRow
            label={t("common:aboutMac.chip")}
            value={metrics.chip}
          />
          <MetricRow
            label={t("common:aboutMac.cores")}
            value={String(metrics.cores)}
          />
          <MetricRow
            label={t("common:aboutMac.memory")}
            value={metrics.memory}
          />
          <MetricRow
            label={t("common:aboutMac.display")}
            value={metrics.display}
          />
          <MetricRow
            label={t("common:aboutMac.startupDisk")}
            value={metrics.startupDisk}
          />
          <MetricRow
            label={t("common:aboutMac.language")}
            value={metrics.language}
          />
          <MetricRow
            label={t("common:aboutMac.network")}
            value={
              metrics.online
                ? t("common:menuBar.on")
                : t("common:menuBar.off")
            }
          />
        </div>

        <div className="flex justify-center gap-2 px-5 pb-5 pt-1">
          <Button
            variant="outline"
            className="min-w-[110px]"
            onClick={() => {
              onOpenChange(false);
              startApp("About")(dispatch);
            }}
          >
            {t("common:aboutMac.moreInfo")}
          </Button>
          <Button
            className="min-w-[110px]"
            onClick={() => onOpenChange(false)}
          >
            {t("common:aboutMac.ok")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
