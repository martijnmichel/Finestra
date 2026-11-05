import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "usehooks-ts";
import {
  Airplay,
  Bluetooth,
  Cast,
  Focus,
  Languages,
  Monitor,
  Moon,
  Settings2,
  Sun,
  Volume2,
  Wifi,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useTheme } from "@/hooks/useTheme";
import type { AppearanceMode, LiquidGlass } from "@/lib/appearance";
import { languages } from "@/i18n";
import { startApp } from "@/store/actions/startApp";
import { useAppContext } from "@/store";
import { cn } from "@/lib/utils";
import { storageKey } from "@/lib/os";

const modeIcon = (mode: AppearanceMode) => {
  if (mode === "dark") return Moon;
  if (mode === "light") return Sun;
  return Monitor;
};

const nextMode = (mode: AppearanceMode): AppearanceMode => {
  if (mode === "auto") return "light";
  if (mode === "light") return "dark";
  return "auto";
};

const nextGlass = (g: LiquidGlass): LiquidGlass =>
  g === "clear" ? "tinted" : "clear";

const langCodes = Object.keys(languages) as (keyof typeof languages)[];

function CcTile({
  active,
  onClick,
  icon: IconCmp,
  label,
  detail,
  className,
}: {
  active?: boolean;
  onClick?: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  detail?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 rounded-[12px] px-2.5 py-2 text-left cursor-default transition-colors",
        active
          ? "bg-[var(--macos-accent)] text-white"
          : "bg-black/[0.06] dark:bg-white/[0.08] hover:bg-black/[0.09] dark:hover:bg-white/[0.12]",
        className
      )}
    >
      <span
        className={cn(
          "size-7 rounded-full inline-flex items-center justify-center shrink-0",
          active ? "bg-white/20" : "bg-black/[0.08] dark:bg-white/15"
        )}
      >
        <IconCmp className="!size-3.5" />
      </span>
      <span className="min-w-0 flex flex-col leading-tight">
        <span className="os-chrome-sm truncate">{label}</span>
        {detail ? (
          <span
            className={cn(
              "os-chrome-xs truncate font-normal",
              active ? "text-white/80" : "text-muted-foreground"
            )}
          >
            {detail}
          </span>
        ) : null}
      </span>
    </button>
  );
}

function CcSlider({
  icon: IconCmp,
  value,
  onChange,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  onChange: (v: number) => void;
  label: string;
}) {
  return (
    <div className="rounded-[12px] bg-black/[0.06] dark:bg-white/[0.08] px-3 py-2.5 flex items-center gap-2.5">
      <IconCmp className="!size-4 shrink-0 opacity-70" />
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        className="cc-slider flex-1"
      />
    </div>
  );
}

export const ControlCenter = () => {
  const { t, i18n } = useTranslation();
  const { theme, updateTheme } = useTheme();
  const { dispatch } = useAppContext();
  const [open, setOpen] = useState(false);

  const [wifi, setWifi] = useLocalStorage(storageKey("wifi"), true);
  const [bluetooth, setBluetooth] = useLocalStorage(storageKey("bluetooth"), true);
  const [airdrop, setAirdrop] = useLocalStorage(storageKey("airdrop"), false);
  const [focus, setFocus] = useLocalStorage(storageKey("focus"), false);
  const [brightness, setBrightness] = useLocalStorage(storageKey("brightness"), 85);
  const [volume, setVolume] = useLocalStorage(storageKey("volume"), 55);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--display-brightness",
      String(Math.max(0.35, brightness / 100))
    );
  }, [brightness]);

  const ModeIcon = modeIcon(theme.mode);
  const currentLang =
    languages[(i18n.language?.slice(0, 2) as keyof typeof languages) || "en"] ??
    languages.en;

  const cycleLanguage = () => {
    const idx = langCodes.indexOf(
      (currentLang.code as keyof typeof languages) || "en"
    );
    const next = langCodes[(idx + 1) % langCodes.length];
    i18n.changeLanguage(languages[next].code);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "topnav-button focus:outline-none",
            open && "bg-black/[0.1] dark:bg-white/15"
          )}
          aria-label={t("common:menuBar.controlCenter")}
        >
          <Settings2 />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={6}
        className="w-[320px] p-3 rounded-[16px] border border-black/10 dark:border-white/10 bg-[color-mix(in_srgb,var(--popover)_92%,transparent)] shadow-[0_0_0_0.5px_rgba(0,0,0,0.12),0_18px_50px_rgba(0,0,0,0.28)]"
        style={{
          backdropFilter:
            "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
          WebkitBackdropFilter:
            "blur(var(--glass-blur)) saturate(var(--glass-saturate))",
        }}
      >
        <div className="grid grid-cols-2 gap-2">
          <CcTile
            active={wifi}
            onClick={() => setWifi((v) => !v)}
            icon={Wifi}
            label={t("common:menuBar.wifi")}
            detail={
              wifi
                ? t("common:menuBar.wifiConnected")
                : t("common:menuBar.off")
            }
          />
          <CcTile
            active={bluetooth}
            onClick={() => setBluetooth((v) => !v)}
            icon={Bluetooth}
            label={t("common:menuBar.bluetooth")}
            detail={
              bluetooth ? t("common:menuBar.on") : t("common:menuBar.off")
            }
          />
          <CcTile
            active={airdrop}
            onClick={() => setAirdrop((v) => !v)}
            icon={Airplay}
            label={t("common:menuBar.airdrop")}
            detail={
              airdrop
                ? t("common:menuBar.airdropContacts")
                : t("common:menuBar.off")
            }
          />
          <CcTile
            active={focus}
            onClick={() => setFocus((v) => !v)}
            icon={Focus}
            label={t("common:menuBar.focus")}
            detail={
              focus ? t("common:menuBar.focusDoNotDisturb") : t("common:menuBar.off")
            }
          />
        </div>

        <div className="mt-2 flex flex-col gap-2">
          <CcSlider
            icon={Sun}
            value={brightness}
            onChange={setBrightness}
            label={t("common:menuBar.display")}
          />
          <CcSlider
            icon={Volume2}
            value={volume}
            onChange={setVolume}
            label={t("common:menuBar.sound")}
          />
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2">
          <CcTile
            onClick={() => updateTheme({ mode: nextMode(theme.mode) })}
            icon={ModeIcon}
            label={t("common:menuBar.appearance")}
            detail={t(`apps:settings.appearance.modes.${theme.mode}`)}
            className="flex-col items-start gap-1.5 py-2.5 !px-2.5"
          />
          <CcTile
            onClick={cycleLanguage}
            icon={Languages}
            label={t("common:menuBar.language")}
            detail={currentLang.label}
            className="flex-col items-start gap-1.5 py-2.5 !px-2.5"
          />
          <CcTile
            onClick={() =>
              updateTheme({ liquidGlass: nextGlass(theme.liquidGlass) })
            }
            icon={Cast}
            label={t("common:menuBar.glass")}
            detail={t(`apps:settings.appearance.glass.${theme.liquidGlass}`)}
            className="flex-col items-start gap-1.5 py-2.5 !px-2.5"
          />
        </div>

        <button
          type="button"
          className="mt-2 w-full rounded-[12px] bg-black/[0.06] dark:bg-white/[0.08] hover:bg-black/[0.09] dark:hover:bg-white/[0.12] px-3 py-2.5 flex items-center gap-2.5 text-left cursor-default transition-colors"
          onClick={() => {
            setOpen(false);
            startApp("Settings")(dispatch);
          }}
        >
          <span className="size-7 rounded-[8px] bg-[var(--macos-accent)] text-white inline-flex items-center justify-center shrink-0">
            <Settings2 className="!size-3.5" />
          </span>
          <span className="min-w-0 flex flex-col leading-tight">
            <span className="os-chrome-sm">
              {t("common:menuBar.openSettings")}
            </span>
            <span className="os-chrome-xs text-muted-foreground font-normal">
              {t("common:menuBar.openSettingsHint")}
            </span>
          </span>
        </button>
      </PopoverContent>
    </Popover>
  );
};
