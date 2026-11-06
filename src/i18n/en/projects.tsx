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

  capo: {
    title: "Capo",
    desc: "Interactive fretboard for chords, scales & theory",
    htmlText: () => (
      <article className="content">
        <Info title="Client" text="Own product (Sonid)" />
        <Info
          title="Description"
          text={`Capo puts Sonid’s chord and scale library on an interactive neck for guitar, bass, ukulele, mandolin, and more. Musicians explore voicings, full-neck views, alternate tunings, and theory articles tied to the same catalog that powers sonid.app — with shareable deep links between web and mobile.`}
        />
        <Info
          title="What I worked on"
          text={`Designed and shipped native iOS (Swift) and Android (Kotlin) apps plus a Next.js marketing site (getcapo.sonid.app). Built fretboard UX, instrument/tuning layouts, Sonid library integration, themes, deep links, and App Store / Play releases inside the Sonid turborepo.`}
        />
      </article>
    ),
  },

  toka: {
    title: "Toka",
    desc: "Practice metronome with real drum grooves",
    htmlText: () => (
      <article className="content">
        <Info title="Client" text="Own product (Sonid)" />
        <Info
          title="Description"
          text={`Toka is a practice metronome and step sequencer with real drum feels — not just a click. Set BPM and meter, pick genre grooves (pop, rock, jazz, boom-bap, reggae, bossa, samba, and more), paint steps on a sequencer, and practice with swing and subdivisions. Free core with optional one-time Pro and sample packs.`}
        />
        <Info
          title="What I worked on"
          text={`Built native iOS (Swift) and Android (Kotlin) apps, desktop packaging, and the gettoka.sonid.app marketing site. Owned groove engine/sequencer UX, themes, in-app purchases, deep links from Sonid’s web metronome, and store releases in the shared Sonid monorepo.`}
        />
      </article>
    ),
  },

  classroom: {
    title: "Sonid Classroom",
    desc: "Music school platform for teachers & students",
    htmlText: () => (
      <article className="content">
        <Info title="Client" text="Own product (Sonid)" />
        <Info
          title="Description"
          text={`Sonid Classroom is a web platform for music teachers and schools: classes, roles, student invites, assignments tied to Sonid practice exercises, schedules, availability, holidays, invoices, school files, and a student hub. Free plan for getting started; paid tiers for growing schools. Live at classroom.sonid.app.`}
        />
        <Info
          title="What I worked on"
          text={`Owned the Next.js Classroom app end to end in the Sonid turborepo: auth and multi-tenant school data on Firebase, plans/billing, class & role management, assignments, calendar workflows, i18n, and integrations with the Sonid practice/curriculum packages.`}
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

  jeruzalemKerk: {
    title: "Jeruzalem Kerk",
    desc: "Church website with self-serve content",
    htmlText: () => (
      <article className="content">
        <Info title="Client" text="Jeruzalemkerk Amsterdam-West" />
        <Info
          title="Description"
          text={`WordPress site for Jeruzalemkerk in Amsterdam West: services, livestream, activities, and community info. Built so volunteers can manage blog posts and events independently, with a fresher look aimed at a wider audience.`}
        />
        <Info
          title="What I worked on"
          text={`Custom WordPress theme, content structure for blog and events, and a setup volunteers can update without a developer.`}
        />
      </article>
    ),
  },

  vincentNiekerk: {
    title: "Vincent Niekerk",
    desc: "Portfolio for a custom furniture maker",
    htmlText: () => (
      <article className="content">
        <Info title="Client" text="Vincent Niekerk Meubelmaker" />
        <Info
          title="Description"
          text={`Portfolio site for an Amsterdam furniture maker and designer — cabinets, kitchens, beds, and custom work. Helped attract new customers and ranks well in Google.`}
        />
        <Info
          title="What I worked on"
          text={`WordPress portfolio with project galleries, about/contact flows, and SEO-friendly structure for local search.`}
        />
      </article>
    ),
  },

  terrybak: {
    title: "Terrybak",
    desc: "Artist portfolio (Next.js + Directus)",
    htmlText: () => (
      <article className="content">
        <Info title="Client" text="Terry Vreeburg" />
        <Info
          title="Description"
          text={`Portfolio for visual artist Terry Vreeburg: works organized by year, project detail pages, and media managed from a headless CMS. Live at terrybak.com.`}
        />
        <Info
          title="What I worked on"
          text={`Next.js front end with shadcn/ui, Directus CMS for uploads and project content, and a clean gallery/navigation experience.`}
        />
      </article>
    ),
  },

  esploraNatura: {
    title: "Esplora Natura",
    desc: "Guided hiking tours (Next.js + Directus)",
    htmlText: () => (
      <article className="content">
        <Info title="Client" text="Esplora Natura" />
        <Info
          title="Description"
          text={`Website for guided hiking, trekking, and e-bike tours in Liguria and Tuscany. Showcases upcoming events and the guide’s approach to safe, conscious outdoor experiences. Live at esploranatura.com.`}
        />
        <Info
          title="What I worked on"
          text={`Next.js front end with shadcn/ui, Directus for events and media, and a booking-oriented content structure for a local outdoor brand.`}
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
