import React from "react";
import { Project } from "./projects";
import { map } from "lodash";
import { Icon } from "@iconify/react";
import { Frameworks } from "./frameworks";
import XTooltip from "../../components/Tooltip";
import { t } from "i18next";

export const ProjectTemplate = ({
  title,
  desc,
  Text,
  icon,
  links,
  frameworks,
}: Project) => {
  console.log(Text);

  return (
    <section className="content p-5 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <img
          className="w-[72px] aspect-square object-cover rounded-[17%]"
          src={icon as string}
        />
        <div>
          <h1 className="text-h2">{title}</h1>
          <p className="subtitle">{desc}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-3xl">
        {map(frameworks, (f) => {
          const config = Frameworks()[f];
          return (
            <XTooltip label={config.label} key={`icon-f-inapp-${config.label}`}>
              {config.icon}
            </XTooltip>
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="fat">{t("common:aboutProject")}</h3>
        {Text}
      </div>

      {!!links?.length && (
        <div className="flex flex-col gap-3">
          <h3 className="fat">Links</h3>

          <div className="flex items-center gap-3">
            {map(links, (link) => (
              <a
                key={`link-${link.href}`}
                className="badge"
                target="_blank"
                href={link.href}
              >
                {link.label}{" "}
                <Icon className="text-sm" icon="ei:external-link" />
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
