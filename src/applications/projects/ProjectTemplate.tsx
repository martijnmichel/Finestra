import React from "react";
import { Project } from "./projects";
import { map } from "lodash";
import { ExternalLink } from "lucide-react";
import { Frameworks } from "./frameworks";
import XTooltip from "../../components/Tooltip";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/store";
import { startApp } from "@/store/actions/startApp";

export const ProjectTemplate = ({
  title,
  desc,
  Text,
  icon,
  links,
  frameworks,
  projectKey,
}: Project & { projectKey: string }) => {
  const { t } = useTranslation();
  const { dispatch } = useAppContext();

  return (
    <section className="content h-full p-5 overflow-y-auto flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <img
          className="w-[72px] aspect-square object-cover rounded-[17%]"
          src={icon as string}
        />
        <div>
          <h1 className="text-h2">{title}</h1>
          <p className="os-chrome-muted">{desc}</p>
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

      <div>
        <Button
          onClick={() =>
            startApp("Request", { relatedProject: projectKey })(dispatch)
          }
        >
          {t("apps:request.requestLikeThis")}
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="fat">{t("common:aboutProject")}</h3>
        {Text}
      </div>

      {!!links?.length && (
        <div className="flex flex-col gap-3">
          <h3 className="fat">Links</h3>

          <div className="flex items-center gap-3 flex-wrap">
            {map(links, (link) => (
              <a
                key={`link-${link.href}`}
                className="badge"
                target="_blank"
                href={link.href}
              >
                {link.label} <ExternalLink className="inline size-3.5" />
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
