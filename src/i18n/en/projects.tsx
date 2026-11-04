import React from "react";
import { Info } from "../../components/Info";

export default {
  directusMobile: {
    title: "Directus Mobile",
    desc: "Production iOS & Android CMS client for Directus",
    htmlText: () => (
      <article className="content">
        <Info title="Client" text="Own product" />
        <Info
          title="Description"
          text={`Directus Mobile is a production iOS and Android app for managing Directus content and media on the go. Users connect multiple Directus instances, browse and edit collections, upload assets, receive push notifications, and add home-screen widgets. It supports a wide range of Directus interfaces, including relational fields (M2O, O2M, M2M, M2A), translations, files/images, and common input types. Built with Expo / React Native and the Directus SDK; shipped to the App Store and Google Play.`}
        />
        <Info
          title="What I worked on"
          text={`Owned product and engineering end to end: multi-server auth, content CRUD, relational editors, media uploads, push notifications, widgets, store releases, and ongoing production maintenance.`}
        />
      </article>
    ),
  },

  sonid: {
    title: "Sonid",
    desc: "Cross-platform music theory learning apps & web",
    htmlText: () => (
      <article className="content">
        <Info title="Client" text="Own product" />
        <Info
          title="Description"
          text={`Sonid is a music theory learning product for musicians and students who want structured practice — not only reference charts. It teaches intervals, chords, scales, keys, and progressions through guided exercises on iOS and Android, with a multi-locale website and educational content. The ecosystem grew into related practice tools and school workflows from the same monorepo.`}
        />
        <Info
          title="What I worked on"
          text={`As founder and core developer I owned product direction, native apps (Swift / Kotlin), web (Next.js), backend (Firebase, Postgres, Google Cloud), i18n, store releases, and long-term iteration from MVP to production.`}
        />
      </article>
    ),
  },

  meta: {
    title: "Meta: Assembled",
    desc: "Free online card game on Steam",
    htmlText: () => (
      <article className="content">
        <Info title="Client" text="Own product" />
        <Info
          title="Description"
          text={`Meta: Assembled is a free online card game on Steam, lightly inspired by Magic: The Gathering and Hearthstone. Built as a learning project to ship a realtime multiplayer experience.`}
        />
        <Info
          title="What I worked on"
          text={`Implemented realtime game state with Firebase, Vue client UI, and Steam distribution for a playable free title.`}
        />
      </article>
    ),
  },

  sites: {
    title: "WordPress",
    desc: "Client websites",
    htmlText: () => (
      <article className="content">
        <Info
          title="Jeruzalem Kerk"
          text={
            "Built a new WordPress site for Jeruzalem Kerk Amsterdam so volunteers can manage blog posts and events independently, with a fresher look aimed at a wider audience."
          }
        />
        <Info
          title="Bartoon"
          text={
            "Small portfolio site for Dutch cartoonist Bart Kranenburg to display his work."
          }
        />
        <Info
          title="Vincent Niekerk"
          text={
            "Portfolio site for an Amsterdam carpenter. Helped attract new customers and ranks well in Google."
          }
        />
      </article>
    ),
  },

  wms: {
    title: "WMS",
    desc: "Warehouse management web app",
    htmlText: () => (
      <article className="content">
        <Info title="Client" text="ecBase" />
        <Info
          title="Description"
          text={`Browser-based warehouse management frontend for a backoffice ERP. Users manage purchasing and sales, run inventory counts, and monitor operations from a statistics dashboard. Focused on complex data UI and reliable day-to-day business workflows.`}
        />
        <Info
          title="What I worked on"
          text={`Implemented WMS flows for sales, stock, and counts; built dashboard/chart views; structured client state (local vs global vs server vs storage); and shipped reusable components for large tables and filters (Vite, React, TanStack, Chart.js).`}
        />
      </article>
    ),
  },

  starterApp: {
    title: "B2B Order App",
    desc: "Whitelabel B2B ordering app (Expo)",
    htmlText: () => (
      <article className="content">
        <Info title="Client" text="ecBase" />
        <Info
          title="Description"
          text={`Whitelabel mobile ordering app for B2B customers of affiliated companies — mainly catering and wholesale. Users browse assortments with search/filters, manage order lists, and view or update customer data such as orders and invoices.`}
        />
        <Info
          title="What I worked on"
          text={`Built the Expo / React Native app, handled App Store and Play release tracks (dev, preview, staging, production), OTA updates, and performance on lower-end devices.`}
        />
      </article>
    ),
  },

  starterNext: {
    title: "B2B Order Commerce",
    desc: "Whitelabel B2B ordering website (Next.js)",
    htmlText: () => (
      <article className="content">
        <Info title="Client" text="ecBase" />
        <Info
          title="Description"
          text={`Whitelabel B2B ordering website that affiliated businesses offer to their customers. Modules include product ordering, customer profile, most-ordered products, invoices, and order status. Widely used in catering.`}
        />
        <Info
          title="What I worked on"
          text={`Built the Next.js frontend with auth/sessions, product filtering and sorting, performance work (bundle size, image cache), and deployment on Google Cloud Run with Docker.`}
        />
      </article>
    ),
  },
};
