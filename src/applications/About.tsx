import React from "react";
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
  icon: () => <img src={Icon} alt="Logo" />,
};

export class About extends Application {
  static appName = "About";
  public name = "About";
  static icon = () => <img src={Icon} alt="Logo" />;
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

  const exportCv = () => {
    exportCvPdf({
      name: "Martijn van der Eijk",
      subtitle: t("apps:about.subtitle"),
      about: t("apps:about.aboutMeText"),
      tagline: t("apps:about.tagline"),
      email: "martijn.michel@gmail.com",
      linkedIn: "linkedin.com/in/martijn-ensing-159582207",
      projects: Object.values(allProjects).map((project) => ({
        title: project.title,
        desc: project.desc,
        frameworks: project.frameworks?.map((f) => Frameworks()[f]?.label ?? f),
      })),
    });
  };

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
          function: exportCv,
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
            <p className="subtitle">{t("apps:about.subtitle")}</p>
            <p className="text-sm text-zinc-500">{t("apps:about.tagline")}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="fat">{t("apps:about.aboutMe")}</h2>
            <p>{t("apps:about.aboutMeText")}</p>
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
            <p className="text-sm text-zinc-600">
              {t("apps:about.selectedWorkHint")}
            </p>
            <div className="flex flex-col gap-2">
              {featured.map(({ title, frameworks, icon, app, key }) => (
                <button
                  type="button"
                  key={`featured-${key}`}
                  onClick={() => startApp(app)(dispatch)}
                  className="flex items-center gap-2 subtitle text-xs text-left hover:opacity-80"
                >
                  <img
                    src={icon as string}
                    className="w-5 h-5 object-cover rounded"
                    alt=""
                  />
                  <span className="font-bold">{title}</span>
                  <div className="flex items-center gap-1 text-lg">
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
              className="animate-underline"
              href={`https://wa.me/0031624852964?text=${encodeURIComponent(
                "Hoi Martijn, ik nodig je graag uit voor een gesprek."
              )}`}
            >
              <MessageCircle className="inline size-4" /> +31624852964
            </a>

            <a
              target="_blank"
              className="animate-underline"
              href={`mailto:martijn.michel@gmail.com`}
            >
              <Inbox className="inline size-4" /> martijn.michel@gmail.com
            </a>

            <a
              target="_blank"
              className="animate-underline"
              href={`https://www.linkedin.com/in/martijn-ensing-159582207/`}
            >
              <Network className="inline size-4" /> LinkedIn
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="fat">{t("common:changeLanguage")}</h2>
            {map(languages, (lang) => {
              return (
                <button
                  key={`lang-picker-${lang.label}`}
                  onClick={() => {
                    i18next.changeLanguage(lang.code);
                  }}
                >
                  <div className="flex items-center gap-1 text-xs">
                    <img
                      className="w-[24px] h-[24px] object-contain"
                      src={lang.icon}
                    />
                    {lang.label}
                  </div>
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
