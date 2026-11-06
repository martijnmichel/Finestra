import React from "react";
import { Info } from "../../components/Info";

export default {
  directusMobile: {
    title: "Directus Mobile",
    desc: "Productie iOS- & Android-CMS-app voor Directus",
    htmlText: () => (
      <article className="content">
        <Info title="Opdrachtgever" text="Eigen product" />
        <Info
          title="Beschrijving"
          text={`Directus Mobile is een productie-app voor iOS en Android om Directus-content en media onderweg te beheren. Gebruikers koppelen meerdere Directus-instances, bekijken en bewerken collecties, uploaden bestanden, ontvangen pushmeldingen en voegen homescreen-widgets toe. De app ondersteunt veel Directus-interfaces, waaronder relationele velden (M2O, O2M, M2M, M2A), vertalingen, bestanden/afbeeldingen en gangbare inputtypes. Gebouwd met Expo / React Native en de Directus SDK; live in de App Store en Google Play.`}
        />
        <Info
          title="Wat ik deed"
          text={`Product en engineering end-to-end: multi-server auth, content CRUD, relationele editors, media-uploads, push, widgets, store-releases en doorlopend onderhoud.`}
        />
      </article>
    ),
  },

  sonid: {
    title: "Sonid",
    desc: "Cross-platform muziektheorie-apps & website",
    htmlText: () => (
      <article className="content">
        <Info title="Opdrachtgever" text="Eigen product" />
        <Info
          title="Beschrijving"
          text={`Sonid is een muziektheorieproduct voor musici en studenten die gestructureerd willen oefenen — niet alleen naslag. Intervals, akkoorden, toonladders, toonsoorten en progressies via begeleide oefeningen op iOS en Android, met een meertalige website en educatieve content. Uit dezelfde monorepo groeiden gerelateerde oefentools en schoolworkflows.`}
        />
        <Info
          title="Wat ik deed"
          text={`Als founder en kernontwikkelaar: productrichting, native apps (Swift / Kotlin), web (Next.js), backend (Firebase, Postgres, Google Cloud), i18n, store-releases en langetermijn-iteratie van MVP tot productie.`}
        />
      </article>
    ),
  },

  capo: {
    title: "Capo",
    desc: "Interactief fretboard voor akkoorden, ladders & theorie",
    htmlText: () => (
      <article className="content">
        <Info title="Opdrachtgever" text="Eigen product (Sonid)" />
        <Info
          title="Beschrijving"
          text={`Capo zet Sonids akkoord- en ladderbibliotheek op een interactieve hals voor gitaar, bas, ukelele, mandoline en meer. Musici verkennen voicings, volledige-halsweergaven, alternative stemmingen en theorie-artikelen uit dezelfde catalogus als sonid.app — met deelbare deep links tussen web en mobiel.`}
        />
        <Info
          title="Wat ik deed"
          text={`Native iOS (Swift) en Android (Kotlin) apps plus Next.js-marketingsite (getcapo.sonid.app). Fretboard-UX, instrument/stemmingen, Sonid-bibliotheekintegratie, thema’s, deep links en store-releases in de Sonid-turborepo.`}
        />
      </article>
    ),
  },

  toka: {
    title: "Toka",
    desc: "Oefenmetronoom met echte drumgrooves",
    htmlText: () => (
      <article className="content">
        <Info title="Opdrachtgever" text="Eigen product (Sonid)" />
        <Info
          title="Beschrijving"
          text={`Toka is een oefenmetronoom en step sequencer met echte drumfeels — niet alleen een klik. BPM en maatsoort instellen, genre-grooves kiezen (pop, rock, jazz, boom-bap, reggae, bossa, samba en meer), stappen schilderen en oefenen met swing en subdivisions. Gratis kern met optionele eenmalige Pro- en sample packs.`}
        />
        <Info
          title="Wat ik deed"
          text={`Native iOS (Swift) en Android (Kotlin) apps, desktop packaging en gettoka.sonid.app. Groove-engine/sequencer-UX, thema’s, in-app purchases, deep links vanaf Sonids webmetronoom, en store-releases in de gedeelde monorepo.`}
        />
      </article>
    ),
  },

  classroom: {
    title: "Sonid Classroom",
    desc: "Muziekschoolplatform voor leraren & studenten",
    htmlText: () => (
      <article className="content">
        <Info title="Opdrachtgever" text="Eigen product (Sonid)" />
        <Info
          title="Beschrijving"
          text={`Sonid Classroom is een webplatform voor muziekleraren en scholen: klassen, rollen, studentuitnodigingen, opdrachten gekoppeld aan Sonid-oefeningen, rooster, beschikbaarheid, vakanties, facturen, schoolbestanden en een studentenhub. Gratis plan om te starten; betaalde tiers voor groeiende scholen. Live op classroom.sonid.app.`}
        />
        <Info
          title="Wat ik deed"
          text={`Next.js Classroom-app end-to-end in de Sonid-turborepo: auth en multi-tenant schooldata op Firebase, plannen/billing, klas- & rolbeheer, opdrachten, kalenderworkflows, i18n en koppelingen met Sonid practice/curriculum-packages.`}
        />
      </article>
    ),
  },

  meta: {
    title: "Meta: Assembled",
    desc: "Gratis online kaartspel op Steam",
    htmlText: () => (
      <article className="content">
        <Info title="Opdrachtgever" text="Eigen product" />
        <Info
          title="Beschrijving"
          text={`Meta: Assembled is een gratis online kaartspel op Steam, licht geïnspireerd op Magic: The Gathering en Hearthstone. Gemaakt als leerproject om een realtime multiplayer-ervaring te shipten.`}
        />
        <Info
          title="Wat ik deed"
          text={`Realtime gamestate met Firebase, Vue-client en Steam-distributie voor een speelbare gratis titel.`}
        />
      </article>
    ),
  },

  jeruzalemKerk: {
    title: "Jeruzalem Kerk",
    desc: "Kerksite met zelfbeheer van content",
    htmlText: () => (
      <article className="content">
        <Info title="Opdrachtgever" text="Jeruzalemkerk Amsterdam-West" />
        <Info
          title="Beschrijving"
          text={`WordPress-site voor de Jeruzalemkerk in Amsterdam-West: diensten, livestream, activiteiten en gemeente-info. Gebouwd zodat vrijwilligers zelf blogs en events kunnen beheren, met een frissere uitstraling voor een breder publiek.`}
        />
        <Info
          title="Wat ik deed"
          text={`Custom WordPress-theme, contentstructuur voor blog en events, en een setup die vrijwilligers zonder developer kunnen bijwerken.`}
        />
      </article>
    ),
  },

  vincentNiekerk: {
    title: "Vincent Niekerk",
    desc: "Portfolio voor een meubelmaker",
    htmlText: () => (
      <article className="content">
        <Info title="Opdrachtgever" text="Vincent Niekerk Meubelmaker" />
        <Info
          title="Beschrijving"
          text={`Portfoliosite voor een Amsterdamse meubelmaker en vormgever — kasten, keukens, bedden en maatwerk. Bracht nieuwe klanten en scoort goed in Google.`}
        />
        <Info
          title="Wat ik deed"
          text={`WordPress-portfolio met projectgalerijen, over/contact-flows en een SEO-vriendelijke structuur voor lokale zoekopdrachten.`}
        />
      </article>
    ),
  },

  terrybak: {
    title: "Terrybak",
    desc: "Kunstenaarsportfolio (Next.js + Directus)",
    htmlText: () => (
      <article className="content">
        <Info title="Opdrachtgever" text="Terry Vreeburg" />
        <Info
          title="Beschrijving"
          text={`Portfolio voor beeldend kunstenaar Terry Vreeburg: werk per jaar, projectpagina’s en media via een headless CMS. Live op terrybak.com.`}
        />
        <Info
          title="Wat ik deed"
          text={`Next.js-front-end met shadcn/ui, Directus CMS voor uploads en projectcontent, en een heldere gallery-/navigatie-ervaring.`}
        />
      </article>
    ),
  },

  esploraNatura: {
    title: "Esplora Natura",
    desc: "Begeleide wandeltochten (Next.js + Directus)",
    htmlText: () => (
      <article className="content">
        <Info title="Opdrachtgever" text="Esplora Natura" />
        <Info
          title="Beschrijving"
          text={`Website voor begeleide hiking, trekking en e-bike tours in Ligurië en Toscane. Toont aankomende events en de aanpak van de gids voor veilige, bewuste outdoor-ervaringen. Live op esploranatura.com.`}
        />
        <Info
          title="Wat ik deed"
          text={`Next.js-front-end met shadcn/ui, Directus voor events en media, en een boekingsgerichte contentstructuur voor een lokale outdoor-merk.`}
        />
      </article>
    ),
  },

  wms: {
    title: "WMS",
    desc: "Warehouse management webapp",
    htmlText: () => (
      <article className="content">
        <Info title="Opdrachtgever" text="ecBase" />
        <Info
          title="Beschrijving"
          text={`Browsergebaseerde warehouse-management frontend voor een backoffice-ERP. Gebruikers verwerken inkopen en verkopen, doen tellingen en volgen operaties via een statistiekendashboard. Gericht op complexe data-UI en betrouwbare dagelijkse workflows.`}
        />
        <Info
          title="Wat ik deed"
          text={`WMS-flows voor verkoop, voorraad en tellingen; dashboard/charts; state bewust lokaal/globaal/server/storage; herbruikbare componenten voor grote tabellen en filters (Vite, React, TanStack, Chart.js).`}
        />
      </article>
    ),
  },

  starterApp: {
    title: "B2B Bestel App",
    desc: "Whitelabel B2B-bestelapp (Expo)",
    htmlText: () => (
      <article className="content">
        <Info title="Opdrachtgever" text="ecBase" />
        <Info
          title="Beschrijving"
          text={`Whitelabel mobiele bestelapp voor B2B-klanten van aangesloten bedrijven — vooral horeca en wholesale. Assortiment met zoeken/filters, bestellijsten beheren, en klantgegevens zoals orders en facturen inzien of bijwerken.`}
        />
        <Info
          title="Wat ik deed"
          text={`Expo / React Native-app gebouwd, App Store- en Play-releasetracks (dev, preview, staging, production), OTA-updates, en performance op lagere-end toestellen.`}
        />
      </article>
    ),
  },

  starterNext: {
    title: "B2B Bestel Commerce",
    desc: "Whitelabel B2B-bestelsite (Next.js)",
    htmlText: () => (
      <article className="content">
        <Info title="Opdrachtgever" text="ecBase" />
        <Info
          title="Beschrijving"
          text={`Whitelabel B2B-bestelwebsite die aangesloten bedrijven aan hun klanten aanbieden. Modules: producten bestellen, klantprofiel, meest bestelde producten, facturen en bestelstatus. Veel gebruikt in de horeca.`}
        />
        <Info
          title="Wat ik deed"
          text={`Next.js-frontend met auth/sessies, filteren en sorteren van producten, performance (bundle size, image cache) en deploy op Google Cloud Run met Docker.`}
        />
      </article>
    ),
  },
};
