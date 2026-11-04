import React, { ReactNode } from "react";

import Meta from "../../icons/meta.jpg";
import Sonid from "../../icons/sonid.png";
import Capo from "../../icons/capo.png";
import Toka from "../../icons/toka.png";
import Classroom from "../../icons/classroom.png";
import WMS from "../../icons/wms.png";
import StarterApp from "../../icons/starterApp.png";
import DirectusMobile from "../../icons/directusmobile.png";
import { useTranslation } from "react-i18next";
import { IFrameworks } from "./frameworks";
import { TranslationElement } from "../../components/TranslationElement";
import Next from "../../icons/demo-agf.webp";
import Wordpress from "../../icons/wordpress.png";

export type Project = {
  title: string;
  desc: string;
  Text?: React.ReactElement;
  icon: ReactNode;
  frameworks: IFrameworks[];
  links?: { label: string; href: string }[];
};

export const projects: () => { [x: string]: Project } = () => {
  const { t } = useTranslation();

  return {
    directusMobile: {
      title: t("projects:directusMobile.title"),
      desc: t("projects:directusMobile.desc"),
      icon: DirectusMobile,
      Text: <TranslationElement i18nKey="projects:directusMobile.htmlText" />,
      links: [
        { label: "Website", href: "https://directusmobile.app" },
        {
          label: "Android",
          href: "https://play.google.com/store/apps/details?id=com.martijnmichel.directusexpo.app",
        },
        {
          label: "iOS",
          href: "https://apps.apple.com/app/directus-mobile/id6740696350",
        },
        {
          label: "Github",
          href: "https://github.com/martijnmichel/directus-expo",
        },
      ],
      frameworks: [
        IFrameworks.Expo,
        IFrameworks.ReactNative,
        IFrameworks.Typescript,
        IFrameworks.Tanstack,
        IFrameworks.Directus,
      ],
    },


    sonid: {
      title: t("projects:sonid.title"),
      desc: t("projects:sonid.desc"),
      icon: Sonid,
      Text: <TranslationElement i18nKey="projects:sonid.htmlText" />,
      links: [
        { label: "Website", href: "https://sonid.app" },
        {
          label: "Android",
          href: "https://play.google.com/store/apps/details?id=org.stroopwafel.music.app",
        },
        {
          label: "iOS",
          href: "https://apps.apple.com/us/app/sonid/id1490221762?ls=1",
        },
      ],
      frameworks: [
        IFrameworks.Swift,
        IFrameworks.Kotlin,
        IFrameworks.Next,
        IFrameworks.React,
        IFrameworks.Typescript,
        IFrameworks.Firebase,
        IFrameworks.Postgres,
      ],
    },

    capo: {
      title: t("projects:capo.title"),
      desc: t("projects:capo.desc"),
      icon: Capo,
      Text: <TranslationElement i18nKey="projects:capo.htmlText" />,
      links: [
        { label: "Website", href: "https://getcapo.sonid.app" },
        {
          label: "Android",
          href: "https://play.google.com/store/apps/details?id=org.fretty.music.app",
        },
        {
          label: "iOS",
          href: "https://apps.apple.com/app/id1523517953",
        },
      ],
      frameworks: [
        IFrameworks.Swift,
        IFrameworks.Kotlin,
        IFrameworks.Next,
        IFrameworks.React,
        IFrameworks.Typescript,
        IFrameworks.Tailwind,
      ],
    },

    toka: {
      title: t("projects:toka.title"),
      desc: t("projects:toka.desc"),
      icon: Toka,
      Text: <TranslationElement i18nKey="projects:toka.htmlText" />,
      links: [
        { label: "Website", href: "https://gettoka.sonid.app" },
        {
          label: "Android",
          href: "https://play.google.com/store/apps/details?id=org.toka.music.app",
        },
        {
          label: "iOS",
          href: "https://apps.apple.com/us/app/toka-metronome-drums/id6804649271",
        },
      ],
      frameworks: [
        IFrameworks.Swift,
        IFrameworks.Kotlin,
        IFrameworks.Next,
        IFrameworks.React,
        IFrameworks.Typescript,
        IFrameworks.Tailwind,
      ],
    },

    classroom: {
      title: t("projects:classroom.title"),
      desc: t("projects:classroom.desc"),
      icon: Classroom,
      Text: <TranslationElement i18nKey="projects:classroom.htmlText" />,
      links: [
        { label: "Website", href: "https://classroom.sonid.app" },
        { label: "Sonid", href: "https://sonid.app" },
      ],
      frameworks: [
        IFrameworks.Next,
        IFrameworks.React,
        IFrameworks.Typescript,
        IFrameworks.Firebase,
        IFrameworks.Tailwind,
        IFrameworks.Postgres,
      ],
    },

    metaAssembled: {
      title: t("projects:meta.title"),
      desc: t("projects:meta.desc"),
      icon: Meta,
      Text: <TranslationElement i18nKey="projects:meta.htmlText" />,
      links: [
        {
          label: "Steam",
          href: "https://store.steampowered.com/app/1118640/Meta_Assembled/",
        },
      ],
      frameworks: [IFrameworks.Vue, IFrameworks.Firebase, IFrameworks.GSAP],
    },

    sites: {
      title: t("projects:sites.title"),
      desc: t("projects:sites.desc"),
      icon: Wordpress,
      Text: <TranslationElement i18nKey="projects:sites.htmlText" />,
      links: [
        {
          label: "Jeruzalem Kerk",
          href: "https://jeruzalem-kerk.nl/",
        },
        {
          label: "Bartoon",
          href: "https://bartoon.nl/",
        },
        {
          label: "Vincent Niekerk",
          href: "https://vincentniekerk.nl/",
        },
      ],
      frameworks: [
        IFrameworks.Wordpress,
        IFrameworks.jQuery,
        IFrameworks.Bootstrap,
        IFrameworks.PHP,
      ],
    },

    wms: {
      title: t("projects:wms.title"),
      desc: t("projects:wms.desc"),
      icon: WMS,
      Text: <TranslationElement i18nKey="projects:wms.htmlText" />,
      frameworks: [
        IFrameworks.Redux,
        IFrameworks.Tanstack,
        IFrameworks.ChartJS,
        IFrameworks.Vite,
      ],
    },

    starterApp: {
      title: t("projects:starterApp.title"),
      desc: t("projects:starterApp.desc"),

      Text: <TranslationElement i18nKey="projects:starterApp.htmlText" />,
      icon: StarterApp,
      frameworks: [
        IFrameworks.Expo,
        IFrameworks.ReactNative,
        IFrameworks.Typescript,
        IFrameworks.Redux,
      ],
    },


    starterTemplateNext: {
      title: t("projects:starterNext.title"),
      desc: t("projects:starterNext.desc"),

      Text: <TranslationElement i18nKey="projects:starterNext.htmlText" />,
      icon: Next,
      links: [
        {
          label: "Demo AGF",
          href: "https://demo-agf.ecbase.nl",
        },
      ],
      frameworks: [
        IFrameworks.Next,
        IFrameworks.Tailwind,
        IFrameworks.GoogleCloudRun,
        IFrameworks.GoogleCloud,
      ],
    },
  };
};
