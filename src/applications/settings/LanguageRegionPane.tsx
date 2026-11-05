import React from "react";
import { useTranslation } from "react-i18next";
import { Check, Globe } from "lucide-react";
import { map } from "lodash";
import { languages } from "@/i18n";
import { cn } from "@/lib/utils";
import { LANGUAGE_REGION_PANE } from "./nav";

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
      <h3 className="os-chrome text-[13px] text-muted-foreground px-1">
        {title}
      </h3>
    ) : null}
    {description ? (
      <p className="os-chrome text-[12px] text-muted-foreground px-1 leading-snug">
        {description}
      </p>
    ) : null}
  </div>
);

export const LanguageRegionPane = () => {
  const { t, i18n } = useTranslation();
  const current = i18n.language?.slice(0, 2);

  return (
    <div className="os-chrome max-w-[560px] mx-auto w-full flex flex-col gap-5">
      <div className="flex flex-col items-center text-center gap-2 pt-2 pb-1">
        <span
          data-settings-icon
          className="settings-icon-badge inline-flex size-14 items-center justify-center shrink-0 rounded-[14px] text-white shadow-sm"
          style={{ background: LANGUAGE_REGION_PANE.iconBg }}
        >
          <Globe className="size-7" strokeWidth={2.25} />
        </span>
        <h2 className="text-[15px] font-semibold tracking-[-0.2px]">
          {t("apps:settings.panes.language-region")}
        </h2>
        <p className="text-[13px] text-muted-foreground max-w-sm">
          {t("apps:settings.descriptions.language-region")}
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <GroupHeader title={t("apps:settings.languageRegion.preferredLanguage")} />
        <SettingsGroup>
          {map(languages, (lang) => {
            const selected = current === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => void i18n.changeLanguage(lang.code)}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left cursor-default hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
              >
                <img
                  src={lang.icon}
                  alt=""
                  className="size-5 rounded-[2px] object-cover shrink-0"
                />
                <span className="flex-1 truncate text-[13px]">{lang.label}</span>
                {selected ? (
                  <Check className="size-4 text-[var(--macos-accent)] shrink-0" />
                ) : null}
              </button>
            );
          })}
        </SettingsGroup>
      </div>

      <div className="flex flex-col gap-1.5">
        <GroupHeader title={t("apps:settings.languageRegion.region")} />
        <SettingsGroup>
          <div className="px-3.5 py-8 text-center text-[13px] text-muted-foreground">
            {t("apps:settings.comingSoon")}
          </div>
        </SettingsGroup>
      </div>
    </div>
  );
};
