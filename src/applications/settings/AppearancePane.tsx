import React from "react";
import { useTheme } from "@/hooks/useTheme";
import {
  ACCENT_COLORS,
  ACCENT_SWATCH_ORDER,
  accentLabel,
  type AccentColorId,
  type AppearanceMode,
  type HighlightColorId,
  type IconStyle,
  type LiquidGlass,
  type ScrollBarClick,
  type ScrollBarVisibility,
  type SidebarIconSize,
} from "@/lib/appearance";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const SettingsGroup = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "rounded-[10px] overflow-hidden divide-y divide-black/[0.08] dark:divide-white/[0.08]",
      className
    )}
    style={{ background: "var(--settings-group)" }}
  >
    {children}
  </div>
);

const GroupHeader = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => (
  <div className="px-1 pb-1.5 pt-0.5">
    {title ? (
      <h3 className="os-chrome text-[13px] text-muted-foreground px-1">{title}</h3>
    ) : null}
    {description ? (
      <p className="os-chrome text-[12px] text-muted-foreground px-1 leading-snug">
        {description}
      </p>
    ) : null}
  </div>
);

const ModePreview = ({
  mode,
  selected,
  onSelect,
}: {
  mode: AppearanceMode;
  selected: boolean;
  onSelect: () => void;
}) => {
  const isDark = mode === "dark";
  const isAuto = mode === "auto";

  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex flex-col items-center gap-2 group cursor-default"
    >
      <div
        className={cn(
          "relative w-[104px] h-[68px] rounded-[8px] overflow-hidden border-[2.5px] transition-colors",
          selected
            ? "border-[var(--macos-accent)]"
            : "border-transparent group-hover:border-black/10 dark:group-hover:border-white/15"
        )}
      >
        {isAuto ? (
          <div className="absolute inset-0 flex">
            <div className="w-1/2 h-full bg-[#d8e4f8] relative">
              <MiniWindow light />
            </div>
            <div className="w-1/2 h-full bg-[#1a2744] relative">
              <MiniWindow />
            </div>
          </div>
        ) : (
          <div
            className={cn(
              "absolute inset-0",
              isDark ? "bg-[#1a2744]" : "bg-[#d8e4f8]"
            )}
          >
            <MiniWindow light={!isDark} />
          </div>
        )}
      </div>
      <span
        className={cn(
          "os-chrome text-[12px]",
          selected ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {mode === "auto" ? "Auto" : mode === "light" ? "Light" : "Dark"}
      </span>
    </button>
  );
};

const MiniWindow = ({ light = false }: { light?: boolean }) => (
  <div
    className={cn(
      "absolute left-2.5 right-2.5 top-3 bottom-2 rounded-[4px] overflow-hidden shadow-sm",
      light ? "bg-white/90" : "bg-[#2c2c2e]/95"
    )}
  >
    <div
      className={cn(
        "h-2.5 flex items-center gap-0.5 px-1",
        light ? "bg-[#ececec]" : "bg-[#3a3a3c]"
      )}
    >
      <span className="size-1 rounded-full bg-[#ff5f57]" />
      <span className="size-1 rounded-full bg-[#febc2e]" />
      <span className="size-1 rounded-full bg-[#28c840]" />
    </div>
    <div className="flex h-[calc(100%-10px)]">
      <div
        className={cn(
          "w-[28%] border-r",
          light
            ? "bg-[#f0f0f0]/90 border-black/5"
            : "bg-[#3a3a3c]/80 border-white/5"
        )}
      />
      <div className="flex-1 p-1 space-y-0.5">
        <div
          className={cn(
            "h-1 rounded-full w-3/4",
            light ? "bg-black/10" : "bg-white/15"
          )}
        />
        <div
          className={cn(
            "h-1 rounded-full w-1/2",
            light ? "bg-black/8" : "bg-white/10"
          )}
        />
      </div>
    </div>
  </div>
);

const GlassPreview = ({
  variant,
  selected,
  onSelect,
}: {
  variant: LiquidGlass;
  selected: boolean;
  onSelect: () => void;
}) => (
  <button
    type="button"
    onClick={onSelect}
    className="flex flex-col items-center gap-2 group cursor-default"
  >
    <div
      className={cn(
        "relative w-[140px] h-[88px] rounded-[10px] overflow-hidden border-[2.5px] transition-colors",
        selected
          ? "border-[var(--macos-accent)]"
          : "border-transparent group-hover:border-black/10 dark:group-hover:border-white/15"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#7eb6ff] via-[#c9ddff] to-[#eef4ff]" />
      <div
        className={cn(
          "absolute inset-3 rounded-[8px] border border-white/50 shadow-lg",
          variant === "clear"
            ? "bg-white/25 backdrop-blur-md"
            : "bg-white/70 backdrop-blur-sm"
        )}
      >
        <div className="m-2 h-full rounded-[6px] bg-white/40 border border-white/40" />
      </div>
    </div>
    <span
      className={cn(
        "os-chrome text-[12px]",
        selected ? "text-foreground" : "text-muted-foreground"
      )}
    >
      {variant === "clear" ? "Clear" : "Tinted"}
    </span>
  </button>
);

const IconStylePreview = ({
  style,
  selected,
  onSelect,
}: {
  style: IconStyle;
  selected: boolean;
  onSelect: () => void;
}) => {
  const tiles =
    style === "default"
      ? ["#34c759", "#ffcc00", "#ff9500", "#007aff"]
      : style === "dark"
        ? ["#1c1c1e", "#2c2c2e", "#3a3a3c", "#48484a"]
        : style === "clear"
          ? [
              "rgba(52,199,89,0.45)",
              "rgba(255,204,0,0.45)",
              "rgba(255,149,0,0.45)",
              "rgba(0,122,255,0.45)",
            ]
          : [
              "rgba(52,199,89,0.75)",
              "rgba(255,204,0,0.75)",
              "rgba(255,149,0,0.75)",
              "rgba(0,122,255,0.75)",
            ];

  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex flex-col items-center gap-2 group cursor-default"
    >
      <div
        className={cn(
          "grid grid-cols-2 gap-1 p-2 rounded-[10px] border-[2.5px] transition-colors",
          selected
            ? "border-[var(--macos-accent)]"
            : "border-transparent group-hover:border-black/10 dark:group-hover:border-white/15"
        )}
        style={{ background: "var(--settings-group)" }}
      >
        {tiles.map((color, i) => (
          <div
            key={i}
            className="size-7 rounded-[7px] shadow-sm"
            style={{
              background: color,
              backdropFilter:
                style === "clear" || style === "tinted" ? "blur(4px)" : undefined,
            }}
          />
        ))}
      </div>
      <span
        className={cn(
          "os-chrome text-[12px] capitalize",
          selected ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {style}
      </span>
    </button>
  );
};

const ColorSwatch = ({
  id,
  selected,
  onSelect,
}: {
  id: AccentColorId;
  selected: boolean;
  onSelect: () => void;
}) => {
  const fill =
    id === "multicolor"
      ? "conic-gradient(#ff3b30, #ff9500, #ffcc00, #34c759, #007aff, #af52de, #ff2d55)"
      : ACCENT_COLORS[id].light;

  return (
    <button
      type="button"
      title={accentLabel(id)}
      onClick={onSelect}
      className={cn(
        "size-[22px] rounded-full shrink-0 cursor-default transition-shadow",
        selected && "ring-[2.5px] ring-[var(--macos-accent)] ring-offset-2 ring-offset-[var(--settings-group)]"
      )}
      style={{ background: fill }}
      aria-label={accentLabel(id)}
    />
  );
};

const ColorDot = ({ id }: { id: AccentColorId }) => (
  <span
    className="size-3 rounded-full shrink-0"
    style={{
      background:
        id === "multicolor"
          ? "conic-gradient(#ff3b30,#ffcc00,#34c759,#007aff,#af52de)"
          : ACCENT_COLORS[id].light,
    }}
  />
);

export const AppearancePane = () => {
  const { theme, updateTheme } = useTheme();

  return (
    <div className="os-chrome flex flex-col gap-5 max-w-[560px] mx-auto w-full pb-8">
      <section>
        <GroupHeader title="Appearance" />
        <SettingsGroup>
          <div className="flex justify-center gap-6 px-4 py-5">
            {(["auto", "light", "dark"] as AppearanceMode[]).map((mode) => (
              <ModePreview
                key={mode}
                mode={mode}
                selected={theme.mode === mode}
                onSelect={() => updateTheme({ mode })}
              />
            ))}
          </div>
        </SettingsGroup>
      </section>

      <section>
        <GroupHeader description="Choose your preferred look for Liquid Glass." />
        <SettingsGroup>
          <div className="flex justify-center gap-8 px-4 py-5">
            {(["clear", "tinted"] as LiquidGlass[]).map((variant) => (
              <GlassPreview
                key={variant}
                variant={variant}
                selected={theme.liquidGlass === variant}
                onSelect={() => updateTheme({ liquidGlass: variant })}
              />
            ))}
          </div>
        </SettingsGroup>
      </section>

      <section>
        <GroupHeader title="Theme" />
        <SettingsGroup>
          <div className="flex items-center justify-between gap-4 px-3.5 py-3">
            <span>Colour</span>
            <div className="flex items-center gap-2.5 flex-wrap justify-end">
              {ACCENT_SWATCH_ORDER.map((id) => (
                <ColorSwatch
                  key={id}
                  id={id}
                  selected={theme.accentColor === id}
                  onSelect={() =>
                    updateTheme({
                      accentColor: id,
                      ...(theme.highlightColor === theme.accentColor
                        ? { highlightColor: id as HighlightColorId }
                        : {}),
                    })
                  }
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 px-3.5 py-2.5">
            <span>Text highlight colour</span>
            <Select
              value={theme.highlightColor}
              onValueChange={(v) =>
                updateTheme({ highlightColor: v as HighlightColorId })
              }
            >
              <SelectTrigger className="macos-select w-auto justify-end">
                <SelectValue>
                  <span className="flex items-center gap-1.5">
                    <ColorDot id={theme.highlightColor} />
                    {accentLabel(theme.highlightColor)}
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {ACCENT_SWATCH_ORDER.filter((id) => id !== "multicolor").map(
                  (id) => (
                    <SelectItem key={id} value={id}>
                      <span className="flex items-center gap-2">
                        <ColorDot id={id} />
                        {accentLabel(id)}
                      </span>
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </SettingsGroup>
      </section>

      <section>
        <GroupHeader title="Icon & widget style" />
        <SettingsGroup>
          <div className="flex justify-center gap-5 px-4 py-5">
            {(["default", "dark", "clear", "tinted"] as IconStyle[]).map(
              (style) => (
                <IconStylePreview
                  key={style}
                  style={style}
                  selected={theme.iconStyle === style}
                  onSelect={() => updateTheme({ iconStyle: style })}
                />
              )
            )}
          </div>
          <div className="flex items-center justify-between gap-4 px-3.5 py-2.5">
            <span>Folder colour</span>
            <Select
              value={theme.folderColor}
              onValueChange={(v) =>
                updateTheme({
                  folderColor: v as ThemeConfigFolder,
                })
              }
            >
              <SelectTrigger className="macos-select w-auto justify-end">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="automatic">
                  <span className="flex items-center gap-2">
                    <ColorDot id="blue" />
                    Automatic
                  </span>
                </SelectItem>
                {ACCENT_SWATCH_ORDER.filter((id) => id !== "multicolor").map(
                  (id) => (
                    <SelectItem key={id} value={id}>
                      <span className="flex items-center gap-2">
                        <ColorDot id={id} />
                        {accentLabel(id)}
                      </span>
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </SettingsGroup>
      </section>

      <section>
        <GroupHeader title="Windows" />
        <SettingsGroup>
          <div className="flex items-center justify-between gap-4 px-3.5 py-2.5">
            <span>Sidebar icon size</span>
            <Select
              value={theme.sidebarIconSize}
              onValueChange={(v) =>
                updateTheme({ sidebarIconSize: v as SidebarIconSize })
              }
            >
              <SelectTrigger className="macos-select w-auto justify-end">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between gap-4 px-3.5 py-2.5">
            <Label htmlFor="wallpaper-tint" className="os-chrome font-normal">
              Tint window background with wallpaper colour
            </Label>
            <Switch
              id="wallpaper-tint"
              checked={theme.tintWindowsWithWallpaper}
              onCheckedChange={(checked) =>
                updateTheme({ tintWindowsWithWallpaper: checked })
              }
            />
          </div>
        </SettingsGroup>
      </section>

      <section>
        <GroupHeader title="Show scroll bars" />
        <SettingsGroup>
          <RadioGroup
            value={theme.showScrollBars}
            onValueChange={(v) =>
              updateTheme({ showScrollBars: v as ScrollBarVisibility })
            }
            className="gap-0 divide-y divide-black/[0.08] dark:divide-white/[0.08]"
          >
            {(
              [
                ["automatic", "Automatically based on mouse or trackpad"],
                ["when-scrolling", "When scrolling"],
                ["always", "Always"],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className="flex items-center gap-2.5 px-3.5 py-2.5 cursor-default"
              >
                <RadioGroupItem value={value} id={`scroll-${value}`} />
                <span>{label}</span>
              </label>
            ))}
          </RadioGroup>
        </SettingsGroup>
      </section>

      <section>
        <GroupHeader title="Click in the scroll bar to" />
        <SettingsGroup>
          <RadioGroup
            value={theme.scrollBarClick}
            onValueChange={(v) =>
              updateTheme({ scrollBarClick: v as ScrollBarClick })
            }
            className="gap-0 divide-y divide-black/[0.08] dark:divide-white/[0.08]"
          >
            {(
              [
                ["page", "Jump to the next page"],
                ["spot", "Jump to the spot that's clicked"],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className="flex items-center gap-2.5 px-3.5 py-2.5 cursor-default"
              >
                <RadioGroupItem value={value} id={`click-${value}`} />
                <span>{label}</span>
              </label>
            ))}
          </RadioGroup>
        </SettingsGroup>
      </section>
    </div>
  );
};

type ThemeConfigFolder = "automatic" | AccentColorId;
