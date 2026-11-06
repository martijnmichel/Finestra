import React from "react";
import { useTranslation } from "react-i18next";
import { WidgetShell, type WidgetSize } from "./WidgetShell";
import { ContactBrandBadge } from "@/components/icons/ContactBrandIcons";
import { cn } from "@/lib/utils";

const LINKS = [
  {
    id: "whatsapp" as const,
    label: "WhatsApp",
    href: `https://wa.me/0031624852964?text=${encodeURIComponent(
      "Hoi Martijn, ik nodig je graag uit voor een gesprek."
    )}`,
  },
  {
    id: "email" as const,
    label: "Email",
    href: "mailto:martijn.michel@gmail.com",
  },
  {
    id: "linkedin" as const,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/martijn-van-der-eijk-159582207/",
  },
];

/** Quick contact actions. */
export function ContactWidget({
  size = "sm",
  className,
}: {
  size?: WidgetSize;
  className?: string;
}) {
  const { t } = useTranslation();

  return (
    <WidgetShell
      size={size}
      className={cn("flex flex-col p-3", className)}
      aria-label={t("apps:about.contact")}
    >
      <p className="os-chrome-em px-0.5 pb-2 text-[12px]">
        {t("apps:about.contact")}
      </p>
      <div
        className={cn(
          "grid flex-1 gap-1.5",
          size === "sm" ? "grid-cols-1" : "grid-cols-3"
        )}
      >
        {LINKS.map(({ id, label, href }) => (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "flex min-w-0 items-center gap-2 rounded-[12px] bg-black/[0.05] px-2.5 py-2 dark:bg-white/[0.08]",
              "hover:bg-black/[0.08] dark:hover:bg-white/[0.12]",
              size === "sm"
                ? "flex-row"
                : "flex-col justify-center text-center"
            )}
          >
            <ContactBrandBadge id={id} />
            <span className="os-chrome-sm truncate">{label}</span>
          </a>
        ))}
      </div>
    </WidgetShell>
  );
}
