import React from "react";
import { Application } from "./application";
import { Inbox, MessageCircle, Network } from "lucide-react";

import Icon from "../icons/user.png";
import Headshot from "../../profile/assets/headshot.png";
import dayjs from "dayjs";
import { Project, projects } from "./projects/projects";
import { App, Applications, NavMenu } from ".";
import { map } from "lodash";
import { Frameworks, IFrameworks } from "./projects/frameworks";
import XTooltip from "../components/Tooltip";

import { useTranslation } from "react-i18next";
import { useAppContext, useAppState } from "../store";
import { startApp } from "../store/actions/startApp";
import { ShepherdTour } from "../components/ShepherdTour";
import { languages } from "../i18n";
import i18next from "i18next";
import { AppNavigation } from "../components/application/AppNavigation";
export const AboutApplication = {
  name: "About",
  icon: () => <img src={Icon} alt="Logo" />,
};

export class About extends Application {
  public name = "About";
  static icon = () => <img src={Icon} alt="Logo" />;
  public category = "default";

  width = window.innerWidth > 900 ? 800 : window.innerWidth - 100;
  height = window.innerHeight > 1000 ? 850 : window.innerHeight - 200;

  y = 100;

  component = () => AboutApp(this.id);

  constructor() {
    super();
  }
}

export type FieldExperience = {
  company: string;
  type: string;
  jobTitle: string;
  jobDescription: string;
  from: string;
  to: string;
  projects: ProjectInfo[];
};

export type ProjectInfo = {
  app: string;
  title: string;
} & Project;

export const AboutApp = (id: string) => {
  const { t } = useTranslation();

  const { dispatch } = useAppContext();
  const fieldExperiences: FieldExperience[] = [
    {
      company: "Kurbo / independent",
      type: "Freelance",
      jobTitle: "Full Stack Developer",
      jobDescription: t("common:experience.freelance"),
      from: dayjs("01-11-2017").format("YYYY"),
      to: "NOW",
      projects: [
        { ...projects().directusMobile, app: "DirectusMobile" },
        { ...projects().sonid, app: "Sonid" },
        { ...projects().capo, app: "Capo" },
        { ...projects().toka, app: "Toka" },
        { ...projects().classroom, app: "Classroom" },
        { ...projects().sites, app: "WordPress" },
        { ...projects().metaAssembled, app: "MetaAssembled" },
      ],
    },
    {
      company: "ecBase",
      type: "Remote",
      jobTitle: "Medior Full Stack Developer",
      jobDescription: t("common:experience.ecbase"),
      from: dayjs("01-11-2021").format("YYYY"),
      to: "2026",
      projects: [
        { ...projects().wms, app: "WMS" },
        { ...projects().starterApp, app: "ECBaseBestelExpo" },
        { ...projects().starterTemplateNext, app: "ECBaseBestelNext" },
      ],
    },
  ];

  const Experience = ({
    company,
    type,
    jobTitle,
    jobDescription,
    from,
    to,
    projects,
  }: FieldExperience) => {
    return (
      <section className="flex flex-col">
        <h5 className="font-merriweather text-lg">
          <span className="font-bold">{company}, </span>
          <span className="">{type} &#8212; </span>
          <span className="italic font-thin">{jobTitle}</span>
        </h5>

        <p className="italic text-sm text-zinc-600 py-2">{jobDescription}</p>

        <p className="uppercase text-zinc-400">
          {from} &#8212; {to}
        </p>

        {map(projects, ({ title, frameworks, icon, app }) => {
          return (
            <div
              role="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                startApp(app)(dispatch);
              }}
              className="flex items-center gap-2 subtitle text-xs mt-1"
              key={`project-card-${title}`}
            >
              <img
                src={icon as string}
                className="w-5 h-5 object-cover rounded"
              />
              <span className="font-bold">{title} &#8212; </span>
              <div className="flex items-center gap-1 text-lg">
                {map(frameworks, (f) => {
                  const config = Frameworks()[f];
                  return (
                    <XTooltip
                      label={config.label}
                      key={`icon-f-${config.label}`}
                    >
                      {config.icon}
                    </XTooltip>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    );
  };

  const {
    PHP,
    Typescript,
    ES6,
    Tailwind,
    Firebase,
    Sass,
    LoDash,
    React,
    Next,
    Express,
    NodeJS,
    Expo,
    Vite,
    MySQL,
    Github,
    Vercel,
  } = Frameworks();

  const navigation: NavMenu[] = [
    {
      label: "File",
      items: [
        {
          label: "New Email",
          function: () => {
            window.open("mailto:martijn.michel@gmail.com", "_blank");
          },
        },
        {
          label: "New Message",
          function: () => {
            window.open(`https://wa.me/0031624852964?text=${encodeURIComponent(
              "Hoi Martijn, ik nodig je graag uit voor een gesprek."
            )}`, "_blank");
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
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="fat">{t("apps:about.aboutMe")}</h2>
            <p>{t("apps:about.aboutMeText")}</p>
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="fat">{t("apps:about.experience")}</h2>

            {fieldExperiences.map((exp) => {
              return <Experience {...exp} key={`field-${exp.company}`} />;
            })}
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <img
            src={Headshot}
            alt="Martijn van der Eijk"
            className="w-full max-w-[220px] aspect-square object-cover rounded-2xl"
          />
          <div className="flex flex-col gap-2">
            <h4 className="fat">{t("apps:about.address")}</h4>
            <p>Via ca' del monte 6, Villafranca in Lunigiana, MS, Italie</p>
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
            <p></p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="fat">{t("apps:about.skills")}</h4>
            {/** frontend */}
            <div className="flex items-center gap-2 text-xl">
              <XTooltip label={React.label}>{React.icon}</XTooltip>
              <XTooltip label={Typescript.label}>{Typescript.icon}</XTooltip>
              <XTooltip label={ES6.label}>{ES6.icon}</XTooltip>
              <XTooltip label={Tailwind.label}>{Tailwind.icon}</XTooltip>
              <XTooltip label={LoDash.label}>{LoDash.icon}</XTooltip>
              <XTooltip label={Sass.label}>{Sass.icon}</XTooltip>
            </div>

            {/** backend */}
            <div className="flex items-center gap-2 text-xl">
              <XTooltip label={NodeJS.label}>{NodeJS.icon}</XTooltip>
              <XTooltip label={Express.label}>{Express.icon}</XTooltip>
              <XTooltip label={PHP.label}>{PHP.icon}</XTooltip>

              <XTooltip label={MySQL.label}>{MySQL.icon}</XTooltip>
              <XTooltip label={Firebase.label}>{Firebase.icon}</XTooltip>
            </div>

            {/** frameworks */}
            <div className="flex items-center gap-2 text-xl">
              <XTooltip label={Next.label}>{Next.icon}</XTooltip>
              <XTooltip label={Expo.label}>{Expo.icon}</XTooltip>
              <XTooltip label={Vite.label}>{Vite.icon}</XTooltip>
            </div>

            <div className="flex items-center gap-2 text-xl">
              <XTooltip label={Github.label}>{Github.icon}</XTooltip>
              <XTooltip label={Vercel.label}>{Vercel.icon}</XTooltip>
            </div>
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
