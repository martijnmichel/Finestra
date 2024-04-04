import React from "react";

import "./index.scss";
import App from "./App";

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { createRoot } from "react-dom/client";

import en_apps from "./i18n/en/apps.json";
import en_projects from "./i18n/en/projects";
import en_common from "./i18n/en/common.json";

import nl_apps from "./i18n/nl/apps.json";
import nl_projects from "./i18n/nl/projects";
import nl_common from "./i18n/nl/common.json";

import it_apps from "./i18n/it/apps.json";
import it_projects from "./i18n/it/projects";
import it_common from "./i18n/it/common.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        apps: en_apps,
        common: en_common,
        projects: en_projects,
      },
      nl: {
        apps: nl_apps,
        common: nl_common,
        projects: nl_projects,
      },
      it: {
        apps: it_apps,
        common: it_common,
        projects: it_projects,
      },
    },

    fallbackLng: "en",

    supportedLngs: ["en", "nl", "it"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
