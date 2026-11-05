import React from "react";
import { AppIcon } from "../components/application/AppIcon";
import { Application } from "./application";
import { Inbox, MessageCircle, Network } from "lucide-react";

import Icon from "../icons/user.png";
import Headshot from "../../profile/assets/headshot.png";
import { projects } from "./projects/projects";
import type { NavMenu } from "./types";
import { map } from "lodash";
import { Frameworks } from "./projects/frameworks";
import XTooltip from "../components/Tooltip";

import { useTranslation } from "react-i18next";
import { useAppContext } from "../store";
import { startApp } from "../store/actions/startApp";
import { toggleLaunchpad } from "../store/actions/toggleLaunchPad";
import { ShepherdTour } from "../components/ShepherdTour";
import { languages } from "../i18n";
import i18next from "i18next";
import { AppNavigation } from "../components/application/AppNavigation";
import { Button } from "@/components/ui/button";
import { exportCvPdf } from "@/lib/exportCvPdf";

export const AboutApplication = {
  name: "About",
  icon: () => <AppIcon src={Icon} alt="About" />,
};

export class About extends Application {
  static appName = "About";
  public name = "About";
  static icon = () => <AppIcon src={Icon} alt="About" />;
  public category = "default";

  width = window.innerWidth > 900 ? 800 : window.innerWidth - 100;
  height = window.innerHeight > 1000 ? 720 : window.innerHeight - 200;

  y = 100;

  component = () => AboutApp(this.id);

  constructor() {
    super();
  }
}

export const AboutApp = (id: string) => {
  const { t } = useTranslation();
  const { dispatch } = useAppContext();
  const allProjects = projects();

  const featured = [
    { key: "directusMobile", app: "DirectusMobile", ...allProjects.directusMobile },
    { key: "sonid", app: "Sonid", ...allProjects.sonid },
    { key: "capo", app: "Capo", ...allProjects.capo },
    { key: "toka", app: "Toka", ...allProjects.toka },
    { key: "classroom", app: "Classroom", ...allProjects.classroom },
    { key: "wms", app: "WMS", ...allProjects.wms },
  ];

  const navigation: NavMenu[] = [
    {
      label: "File",
      items: [
        {
          label: t("apps:about.requestProject"),
          function: () => startApp("Request")(dispatch),
        },
        {
          label: t("apps:about.exportCv"),
          function: exportCvPdf,
        },
        {
          label: "New Email",
          function: () => {
            window.open("mailto:martijn.michel@gmail.com", "_blank");
          },
        },
        {
          label: "New Message",
          function: () => {
            window.open(
              `https://wa.me/0031624852964?text=${encodeURIComponent(
                "Hoi Martijn, ik nodig je graag uit voor een gesprek."
              )}`,
              "_blank"
            );
          },
        },
      ],
    },
    {
      label: "About",
      items: [
        {
          label: "LinkedIn",
          function: () => {
            window.open(
              "https://www.linkedin.com/in/martijn-ensing-159582207/",
              "_blank"
            );
          },
        },
        {
          label: "GitHub",
          function: () => {
            window.open("https://github.com/martijnmichel", "_blank");
          },
        },
      ],
    },
  ];

  return (
    <div className="p-3 h-full overflow-y-auto">
      <AppNavigation items={navigation} id={id} appName="About" />
      <div className="grid grid-cols-1 @3xl/window:grid-cols-3 gap-10">
        <div className="col-span-2 flex flex-shrink flex-col gap-6">
          <div id="step-about" className="flex flex-col gap-3">
            <h2 className="text-h1">Martijn van der Eijk</h2>
            <p className="os-chrome-muted">{t("apps:about.subtitle")}</p>
            <p className="os-chrome-sm text-muted-foreground font-normal">
              {t("apps:about.tagline")}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="fat">{t("apps:about.aboutMe")}</h2>
            <p className="os-chrome text-[13px] leading-relaxed">
              {t("apps:about.aboutMeText")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={() => startApp("Request")(dispatch)}>
              {t("apps:about.requestProject")}
            </Button>
            <Button
              variant="outline"
              onClick={() => toggleLaunchpad()(dispatch)}
            >
              {t("apps:about.browseThenRequest")}
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="fat">{t("apps:about.selectedWork")}</h2>
            <p className="os-chrome-muted">
              {t("apps:about.selectedWorkHint")}
            </p>
            <div className="flex flex-col gap-1">
              {featured.map(({ title, frameworks, icon, app, key }) => (
                <button
                  type="button"
                  key={`featured-${key}`}
                  onClick={() => startApp(app)(dispatch)}
                  className="os-chrome flex items-center gap-2.5 rounded-[6px] px-1.5 py-1 text-left cursor-default hover:bg-black/[0.05] dark:hover:bg-white/[0.08]"
                >
                  <img
                    src={icon as string}
                    className="size-5 object-cover rounded-[4px] shrink-0"
                    alt=""
                  />
                  <span className="os-chrome-em text-[13px] truncate">
                    {title}
                  </span>
                  <div className="flex items-center gap-1 text-[15px] ml-auto shrink-0 opacity-80">
                    {map(frameworks.slice(0, 4), (f) => {
                      const config = Frameworks()[f];
                      return (
                        <XTooltip
                          label={config.label}
                          key={`icon-f-${key}-${config.label}`}
                        >
                          {config.icon}
                        </XTooltip>
                      );
                    })}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <img
            src={Headshot}
            alt="Martijn van der Eijk"
            className="w-full max-w-[220px] aspect-square object-cover rounded-2xl"
          />
          <div className="flex flex-col gap-2">
            <h4 className="fat">{t("apps:about.contact")}</h4>
            <a
              target="_blank"
              className="os-chrome animate-underline inline-flex items-center gap-1.5"
              href={`https://wa.me/0031624852964?text=${encodeURIComponent(
                "Hoi Martijn, ik nodig je graag uit voor een gesprek."
              )}`}
            >
              <MessageCircle className="size-3.5 shrink-0" /> +31624852964
            </a>

            <a
              target="_blank"
              className="os-chrome animate-underline inline-flex items-center gap-1.5"
              href={`mailto:martijn.michel@gmail.com`}
            >
              <Inbox className="size-3.5 shrink-0" /> martijn.michel@gmail.com
            </a>

            <a
              target="_blank"
              className="os-chrome animate-underline inline-flex items-center gap-1.5"
              href={`https://www.linkedin.com/in/martijn-ensing-159582207/`}
            >
              <Network className="size-3.5 shrink-0" /> LinkedIn
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="fat">{t("common:changeLanguage")}</h2>
            {map(languages, (lang) => {
              return (
                <button
                  type="button"
                  key={`lang-picker-${lang.label}`}
                  onClick={() => {
                    i18next.changeLanguage(lang.code);
                  }}
                  className="os-chrome flex items-center gap-2 rounded-[6px] px-1.5 py-1 text-left cursor-default hover:bg-black/[0.05] dark:hover:bg-white/[0.08]"
                >
                  <img
                    className="size-5 object-contain rounded-[2px]"
                    src={lang.icon}
                    alt=""
                  />
                  {lang.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <ShepherdTour />
    </div>
  );
};
