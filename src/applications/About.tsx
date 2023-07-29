import React from "react";
import { Application } from "../store/atoms/applications";
import { Icon as IIcon } from "@iconify/react";

import Icon from "../icons/user.png";
import dayjs from "dayjs";
import { Applications, Apps } from ".";
import { Sonid } from "./projects/Sonid";
import { AppButton } from "../components/application/AppButton";
import { useWindowManager } from "../services/WindowManager";

export const AboutApplication = {
  name: "About",
  icon: () => <img src={Icon} alt="Logo" />,
};

export class About extends Application {
  public name = "About";
  static icon = () => <img src={Icon} alt="Logo" />;
  public category = "default";

  width = 900;
  height = 1000;

  component = () => AboutApp();

  constructor() {
    super();
  }
}

export type FieldExperience = {
  company: string;
  type: string;
  jobTitle: string;
  from: string;
  to: string;
  projects: ProjectInfo[];
};

export type ProjectInfo = {
  app: Apps;
  title: string;
};
const fieldExperiences: FieldExperience[] = [
  {
    company: "ecBase",
    type: "Remote",
    jobTitle: "Medior Full Stack Developer",
    from: dayjs("01-11-2021").format("YYYY"),
    to: "present",
    projects: [{ title: "Sonid", app: Sonid }],
  },
];

export const AboutApp = () => {
  const { startApp } = useWindowManager();
  const Experience = ({
    company,
    type,
    jobTitle,
    from,
    to,
    projects,
  }: FieldExperience) => {
    return (
      <section>
        <h5 className="font-merriweather text-lg">
          <span className="font-bold">{company}, </span>
          <span className="">{type} &#8212; </span>
          <span className="italic font-thin">{jobTitle}</span>
        </h5>

        <p className="uppercase text-zinc-400">
          {from} &#8212; {to}
        </p>

        {projects.map(({ title, app }) => {
          return (
            <div className="flex items-center gap-2" key={`project-${title}`}>
              <button onClick={() => startApp(app.name)}>
                {title} {app.name}
              </button>
            </div>
          );
        })}
      </section>
    );
  };

  return (
    <div className="p-3 h-full overflow-y-auto">
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2 flex flex-shrink flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-h1">Martijn van der Eijk</h2>
            <p className="subtitle">
              Full Stack developer met sterk gevoel voor detail.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="fat">OVER MIJ</h2>
            <p>
              Sinds 2021 woon ik met mijn vrouw in Italie. Hier is goede koffie
              en optimale WiFi. Wanneer ik niet werk ga ik graag tennissen,
              hiken, koken of lees ik een Marvel strip.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="fat">ERVARING</h2>

            {fieldExperiences.map((exp) => {
              return <Experience {...exp} key={`field-${exp.company}`} />;
            })}
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h4 className="fat">ADDRESS</h4>
            <p>Via Nuova 6,Villafranca in Lunigiana, MS, Italie</p>
            <a
              target="_blank"
              className="animate-underline"
              href={`https://wa.me/0031624852964?text=${encodeURIComponent(
                "Hoi Martijn, ik nodig je graag uit voor een gesprek."
              )}`}
            >
              <IIcon icon="la:whatsapp" /> +31624852964
            </a>

            <a
              target="_blank"
              className="animate-underline"
              href={`mailto:martijn.michel@gmail.com`}
            >
              <IIcon icon="la:inbox" /> martijn.michel@gmail.com
            </a>

            <a
              target="_blank"
              className="animate-underline"
              href={`https://www.linkedin.com/in/martijn-ensing-159582207/`}
            >
              <IIcon icon="la:linkedin" /> LinkedIn
            </a>
            <p></p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="fat">SKILLS</h4>
            <p className="subtitle">
              React, React Native, Typescript, ES6, Tailwind, Sass, LoDash
            </p>
            <p className="subtitle">Next, Express, NodeJS, Expo, Vite</p>
            <p className="subtitle">Firebase, MySQL</p>
            <p className="subtitle">Github, Vercel, Netlify, CI</p>
            <p className="subtitle">Sentry, Cypress</p>
          </div>
        </div>
      </div>
    </div>
  );
};
