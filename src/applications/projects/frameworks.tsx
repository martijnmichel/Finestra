import { Icon } from "@iconify/react";
import { ReactNode } from "react";
import React from "react";
export enum IFrameworks {
  React = "React",
  ReactNative = "ReactNative",
  Tailwind = "Tailwind",
  Expo = "Expo",
  GoogleCloud = "GoogleCloud",
  GoogleCloudRun = "GoogleCloudRun",
  PHP = "PHP",
  MySQL = "MySQL",
  Vue = "Vue",
  Cordova = "Cordova",
  Firebase = "Firebase",
  Wordpress = "Wordpress",
  jQuery = "jQuery",
  Bootstrap = "Bootstrap",
  Redux = "Redux",
  Tanstack = "Tanstack",
  ChartJS = "ChartJS",

  Typescript = "Typescript",
  ES6 = "ES6",
  Sass = "Sass",
  LoDash = "LoDash",
  Next = "Next",
  Express = "Express",
  NodeJS = "NodeJS",
  Vite = "Vite",
  Github = "Github",
  Vercel = "Vercel",
  Netlify = "Netlify",
  Sentry = "Sentry",
  GSAP = "GSAP",
}

export type Framework = {
  label: string;
  icon: JSX.Element;
};

export const Frameworks: () => { [x in IFrameworks]: Framework } = () => ({
  React: {
    label: "React",
    icon: <Icon icon="logos:react" />,
  },
  ReactNative: {
    label: "React Native",
    icon: <Icon icon="logos:react" />,
  },

  Tailwind: {
    label: "Tailwind",
    icon: <Icon icon="skill-icons:tailwindcss-dark" />,
  },
  GSAP: {
    label: "GSAP",
    icon: <Icon icon="logos:greensock-icon" />,
  },
  Expo: {
    label: "Expo",
    icon: <Icon icon="logos:expo-icon" />,
  },
  GoogleCloud: {
    label: "Google Cloud",
    icon: <Icon icon="logos:google-cloud" />,
  },
  GoogleCloudRun: {
    label: "Google Cloud Run",
    icon: <Icon icon="logos:google-cloud-run" />,
  },
  PHP: {
    label: "PHP",
    icon: <Icon icon="logos:php-alt" />,
  },
  MySQL: {
    label: "MySQL",
    icon: <Icon icon="logos:mysql-icon" />,
  },

  Vue: {
    label: "Vue",
    icon: <Icon icon="logos:vue" />,
  },
  Cordova: {
    label: "Cordova",
    icon: <Icon icon="logos:cordova" />,
  },
  Firebase: {
    label: "Firebase",
    icon: <Icon icon="logos:firebase" />,
  },

  Wordpress: {
    label: "Wordpress",
    icon: <Icon icon="logos:wordpress-icon" />,
  },
  jQuery: {
    label: "jQuery",
    icon: <Icon icon="skill-icons:jquery" />,
  },
  Bootstrap: {
    label: "Bootstrap",
    icon: <Icon icon="logos:bootstrap" />,
  },

  Redux: {
    label: "Redux",
    icon: <Icon icon="logos:redux" />,
  },
  Tanstack: {
    label: "Tanstack React",
    icon: <Icon icon="logos:react-query-icon" />,
  },
  ChartJS: {
    label: "ChartJS",
    icon: <Icon icon="file-icons:chartjs" />,
  },

  Typescript: {
    label: "Typescript",
    icon: <Icon icon="logos:typescript-icon" />,
  },
  ES6: {
    label: "ES6",
    icon: <Icon icon="logos:es6" />,
  },
  Sass: {
    label: "Sass",
    icon: <Icon icon="logos:sass" />,
  },
  LoDash: {
    label: "LoDash",
    icon: <Icon icon="logos:lodash" />,
  },
  Next: {
    label: "Next",
    icon: <Icon icon="logos:nextjs-icon" />,
  },
  Express: {
    label: "Express",
    icon: <Icon icon="skill-icons:expressjs-light" />,
  },
  NodeJS: {
    label: "NodeJS",
    icon: <Icon icon="logos:nodejs-icon" />,
  },
  Vite: {
    label: "Vite",
    icon: <Icon icon="logos:vitejs" />,
  },

  Github: {
    label: "Github",
    icon: <Icon icon="skill-icons:github-dark" />,
  },
  Vercel: {
    label: "Vercel",
    icon: <Icon icon="skill-icons:vercel-dark" />,
  },
  Netlify: {
    label: "Netlify",
    icon: <Icon icon="logos:netlify" />,
  },
  Sentry: {
    label: "Sentry",
    icon: <Icon icon="skill-icons:sentry" />,
  },
});
