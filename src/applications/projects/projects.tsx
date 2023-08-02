import React, {
  Component,
  FunctionComponent,
  FunctionComponentElement,
  ReactNode,
} from "react";

import Sonid from "../../icons/sonid.png";
import WMS from "../../icons/wms.png";
import StarterApp from "../../icons/starterApp.png";
import { useTranslation } from "react-i18next";
import { Frameworks, IFrameworks } from "./frameworks";
import { TranslationElement } from "../../components/TranslationElement";
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
      desc: "an app to learn and practice music theory in a fun and structured manner!",
      icon: Sonid,
      Text: <TranslationElement i18nKey="projects:sonid.htmlText" />,
      links: [{ label: "Website", href: "https://sonid.app" }],
      frameworks: [IFrameworks.Vue, IFrameworks.Cordova, IFrameworks.Firebase],
    },

    sites: {
      title: "Wordpress",
      desc: "Verschillende op Wordpress gebaseerde websites voor het mkb.",
      icon: WMS,
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
      title: "WMS",
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
      title: "ecBase Bestel",
      desc: "Een React Native boilerplate voor het bestellen van producten.",
      icon: StarterApp,
      Text: <TranslationElement i18nKey="projects:startApp.htmlText" />,
      frameworks: [IFrameworks.Expo],
    },
  };
};
