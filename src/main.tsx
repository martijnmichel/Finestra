import React from "react";
import "./index.css";
import App from "./App";

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

import { createRoot } from "react-dom/client";

import en_apps from "./i18n/en/apps.json";
import en_projects from "./i18n/en/projects.json";
import en_common from "./i18n/en/common.json";

import nl_apps from "./i18n/nl/apps.json";
import nl_projects from "./i18n/nl/projects.json";
import nl_common from "./i18n/nl/common.json";

import it_apps from "./i18n/it/apps.json";
import it_projects from "./i18n/it/projects.json";
import it_common from "./i18n/it/common.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
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

    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    supportedLngs: ["en", "nl", "it"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
