import { useTranslation } from "react-i18next";
import { useLocalStorage } from "usehooks-ts";
import dayjs from "dayjs";
import { map } from "lodash";
import {
  BatteryCharging,
  Bluetooth,
  Check,
  Wifi,
  WifiOff,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { languages } from "@/i18n";
import { startApp } from "@/store/actions/startApp";
import { useAppContext } from "@/store";
import { cn } from "@/lib/utils";
import { useState } from "react";

function StatusTrigger({
  open,
  children,
  className,
  label,
}: {
  open: boolean;
  children: React.ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <DropdownMenuTrigger asChild>
      <button
        type="button"
        aria-label={label}
        className={cn(
          "topnav-button focus:outline-none",
          open && "bg-black/[0.1] dark:bg-white/15",
          className
        )}
      >
        {children}
      </button>
    </DropdownMenuTrigger>
  );
}

export const WifiMenu = () => {
  const { t } = useTranslation();
  const { dispatch } = useAppContext();
  const [open, setOpen] = useState(false);
  const [wifi, setWifi] = useLocalStorage("finestra-wifi", true);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <StatusTrigger open={open} label={t("common:menuBar.wifi")}>
        {wifi ? <Wifi /> : <WifiOff />}
      </StatusTrigger>
      <DropdownMenuContent align="end" className="min-w-[200px]">
        <DropdownMenuLabel className="os-chrome-sm font-semibold text-muted-foreground">
          {t("common:menuBar.wifi")}
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setWifi((v) => !v)}>
          {wifi ? t("common:menuBar.turnOffWifi") : t("common:menuBar.turnOnWifi")}
        </DropdownMenuItem>
        {wifi ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2" disabled>
              <Check className="!size-3.5 text-[var(--macos-accent)]" />
              FinestraNet
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Other Networks…</DropdownMenuItem>
          </>
        ) : null}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => startApp("Settings")(dispatch)}>
          {t("common:menuBar.wifiSettings")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const BluetoothMenu = () => {
  const { t } = useTranslation();
  const { dispatch } = useAppContext();
  const [open, setOpen] = useState(false);
  const [bluetooth, setBluetooth] = useLocalStorage("finestra-bluetooth", true);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <StatusTrigger
        open={open}
        label={t("common:menuBar.bluetooth")}
        className={!bluetooth ? "opacity-45" : undefined}
      >
        <Bluetooth />
      </StatusTrigger>
      <DropdownMenuContent align="end" className="min-w-[200px]">
        <DropdownMenuLabel className="os-chrome-sm font-semibold text-muted-foreground">
          {t("common:menuBar.bluetooth")}
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setBluetooth((v) => !v)}>
          {bluetooth
            ? t("common:menuBar.turnOffBluetooth")
            : t("common:menuBar.turnOnBluetooth")}
        </DropdownMenuItem>
        {bluetooth ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              {t("common:menuBar.devices")}
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2" disabled>
              <Check className="!size-3.5 text-[var(--macos-accent)]" />
              Magic Keyboard
            </DropdownMenuItem>
            <DropdownMenuItem disabled>AirPods Pro</DropdownMenuItem>
          </>
        ) : null}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => startApp("Settings")(dispatch)}>
          {t("common:menuBar.bluetoothSettings")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const BatteryMenu = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [powerMode, setPowerMode] = useLocalStorage(
    "finestra-low-power",
    false
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <StatusTrigger open={open} label={t("common:menuBar.battery")}>
        <BatteryCharging />
      </StatusTrigger>
      <DropdownMenuContent align="end" className="min-w-[210px]">
        <DropdownMenuLabel className="font-normal">
          <div className="os-chrome-em">{t("common:menuBar.battery")}</div>
          <div className="os-chrome-xs text-muted-foreground font-normal mt-0.5">
            {t("common:menuBar.batteryCharging", { percent: 86 })}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setPowerMode((v) => !v)}>
          <span className="flex-1">{t("common:menuBar.lowPowerMode")}</span>
          {powerMode ? (
            <Check className="!size-3.5 text-[var(--macos-accent)]" />
          ) : null}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          {t("common:menuBar.batterySettings")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const LanguageMenu = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = i18n.language?.slice(0, 2);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <StatusTrigger open={open} label={t("common:changeLanguage")}>
        <img
          src={
            languages[(current as keyof typeof languages) || "en"]?.icon ??
            languages.en.icon
          }
          alt=""
          className="size-[14px] object-cover rounded-[2px]"
        />
      </StatusTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        <DropdownMenuLabel className="os-chrome-sm font-semibold text-muted-foreground">
          {t("common:changeLanguage")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {map(languages, (lang) => (
          <DropdownMenuItem
            key={`lang-${lang.code}`}
            onClick={() => i18n.changeLanguage(lang.code)}
            className="gap-2"
          >
            <img
              className="size-4 object-contain rounded-[2px]"
              src={lang.icon}
              alt=""
            />
            <span className="flex-1">{lang.label}</span>
            {current === lang.code ? (
              <Check className="!size-3.5 text-[var(--macos-accent)]" />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const ClockMenu = ({ dateTime }: { dateTime?: number }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const now = dateTime ?? Date.now();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "os-chrome px-2 h-[24px] rounded-[5px] tabular-nums text-[13px] tracking-[-0.08px] cursor-default focus:outline-none",
            open && "bg-black/[0.1] dark:bg-white/15"
          )}
        >
          {dayjs(now).format("ddd D MMM HH:mm")}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[220px]">
        <DropdownMenuLabel className="font-normal py-2">
          <div className="text-[15px] font-semibold tracking-[-0.2px]">
            {dayjs(now).format("dddd")}
          </div>
          <div className="os-chrome text-muted-foreground mt-0.5">
            {dayjs(now).format("D MMMM YYYY")}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          {t("common:menuBar.viewAsAnalog")}
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          {t("common:menuBar.clockSettings")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
