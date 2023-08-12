import React, { ReactNode } from "react";

import Meta from "../../icons/meta.jpg";
import Sonid from "../../icons/sonid.png";
import WMS from "../../icons/wms.png";
import StarterApp from "../../icons/starterApp.png";
import { useTranslation } from "react-i18next";
import { Frameworks, IFrameworks } from "./frameworks";
import { TranslationElement } from "../../components/TranslationElement";
import Next from "../../icons/demo-agf.webp";
import Wordpress from "../../icons/wordpress.png";

export type Project = {
  title: string;
  desc: string;
  Text?: JSX.Element;
  icon: ReactNode;
  frameworks: IFrameworks[];
  links?: { label: string; href: string }[];
};

export const projects: () => { [x: string]: Project } = () => {
  const { t } = useTranslation();

  return {
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
      frameworks: [IFrameworks.Vue, IFrameworks.Cordova, IFrameworks.Firebase],
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
      title: "Wordpress",
      desc: "Verschillende op Wordpress gebaseerde websites voor het mkb.",
      icon: Wordpress,
      Text: <TranslationElement i18nKey="projects:sites.htmlText" />,
      links: [
        {
          label: "Jeruzalem Kerk",
          href: "https://jeruzalem-kerk.nl/",
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
      desc: "ecBase WMS as a Warehouse Management System available to our private clients in addition to our backoffice.",
      icon: WMS,
      Text: <TranslationElement i18nKey="projects:wms.htmlText" />,
      frameworks: [
        IFrameworks.Redux,
        IFrameworks.Tanstack,
        IFrameworks.ChartJS,
      ],
    },

    starterApp: {
      title: "ecBase Bestel App",
      desc: "Een React Native boilerplate voor het bestellen van producten.",
      icon: StarterApp,
      Text: <TranslationElement i18nKey="projects:startNext.htmlText" />,
      frameworks: [IFrameworks.Expo],
    },

    starterTemplateNext: {
      title: "ecBase Bestel Commerce",
      desc: "Een NextJS boilerplate voor het bestellen van producten.",
      icon: Next,
      Text: <TranslationElement i18nKey="projects:startNext.htmlText" />,
      frameworks: [IFrameworks.Next, IFrameworks.Tailwind],
    },
  };
};
