import React from "react";
import {
  Atom,
  Bird,
  Boxes,
  Braces,
  Bug,
  ChartColumn,
  Cloud,
  CloudCog,
  Code2,
  Component,
  Cpu,
  Database,
  FileCode2,
  Flame,
  FolderKanban,
  GitBranch,
  Globe,
  Hexagon,
  LayoutTemplate,
  Library,
  Palette,
  RefreshCw,
  Server,
  Smartphone,
  Triangle,
  Wind,
  Workflow,
  Zap,
} from "lucide-react";

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
  Swift = "Swift",
  Kotlin = "Kotlin",
  Postgres = "Postgres",
  Directus = "Directus",
}

export type Framework = {
  label: string;
  icon: React.ReactElement;
};

export const Frameworks: () => { [x in IFrameworks]: Framework } = () => ({
  React: {
    label: "React",
    icon: <Atom />,
  },
  ReactNative: {
    label: "React Native",
    icon: <Atom />,
  },

  Tailwind: {
    label: "Tailwind",
    icon: <Wind />,
  },
  GSAP: {
    label: "GSAP",
    icon: <Zap />,
  },
  Expo: {
    label: "Expo",
    icon: <Smartphone />,
  },
  GoogleCloud: {
    label: "Google Cloud",
    icon: <Cloud />,
  },
  GoogleCloudRun: {
    label: "Google Cloud Run",
    icon: <CloudCog />,
  },
  PHP: {
    label: "PHP",
    icon: <Code2 />,
  },
  MySQL: {
    label: "MySQL",
    icon: <Database />,
  },

  Vue: {
    label: "Vue",
    icon: <Component />,
  },
  Cordova: {
    label: "Cordova",
    icon: <Smartphone />,
  },
  Firebase: {
    label: "Firebase",
    icon: <Flame />,
  },

  Wordpress: {
    label: "Wordpress",
    icon: <Globe />,
  },
  jQuery: {
    label: "jQuery",
    icon: <Code2 />,
  },
  Bootstrap: {
    label: "Bootstrap",
    icon: <LayoutTemplate />,
  },

  Redux: {
    label: "Redux",
    icon: <RefreshCw />,
  },
  Tanstack: {
    label: "Tanstack React",
    icon: <Workflow />,
  },
  ChartJS: {
    label: "ChartJS",
    icon: <ChartColumn />,
  },

  Typescript: {
    label: "Typescript",
    icon: <FileCode2 />,
  },
  ES6: {
    label: "ES6",
    icon: <Braces />,
  },
  Sass: {
    label: "Sass",
    icon: <Palette />,
  },
  LoDash: {
    label: "LoDash",
    icon: <Library />,
  },
  Next: {
    label: "Next",
    icon: <Triangle />,
  },
  Express: {
    label: "Express",
    icon: <Server />,
  },
  NodeJS: {
    label: "NodeJS",
    icon: <Cpu />,
  },
  Vite: {
    label: "Vite",
    icon: <Zap />,
  },

  Github: {
    label: "Github",
    icon: <GitBranch />,
  },
  Vercel: {
    label: "Vercel",
    icon: <Triangle />,
  },
  Netlify: {
    label: "Netlify",
    icon: <Globe />,
  },
  Sentry: {
    label: "Sentry",
    icon: <Bug />,
  },
  Swift: {
    label: "Swift",
    icon: <Bird />,
  },
  Kotlin: {
    label: "Kotlin",
    icon: <Hexagon />,
  },
  Postgres: {
    label: "Postgres",
    icon: <Database />,
  },
  Directus: {
    label: "Directus",
    icon: <Boxes />,
  },
});
