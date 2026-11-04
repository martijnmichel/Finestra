import React from "react";
import { Info } from "../../components/Info";

export default {
  directusMobile: {
    title: "Directus Mobile",
    desc: "App CMS di produzione iOS e Android per Directus",
    htmlText: () => (
      <article className="content">
        <Info title="Cliente" text="Prodotto proprio" />
        <Info
          title="Descrizione"
          text={`Directus Mobile è un’app iOS e Android di produzione per gestire contenuti e media Directus in mobilità. Gli utenti collegano più istanze Directus, sfogliano e modificano le collection, caricano asset, ricevono push notification e aggiungono widget alla home. Supporta molte interfacce Directus, inclusi campi relazionali (M2O, O2M, M2M, M2A), traduzioni, file/immagini e input comuni. Costruita con Expo / React Native e Directus SDK; pubblicata su App Store e Google Play.`}
        />
        <Info
          title="Cosa ho fatto"
          text={`Prodotto e engineering end-to-end: auth multi-server, CRUD contenuti, editor relazionali, upload media, push, widget, release store e manutenzione in produzione.`}
        />
      </article>
    ),
  },

  sonid: {
    title: "Sonid",
    desc: "App e web per imparare la teoria musicale",
    htmlText: () => (
      <article className="content">
        <Info title="Cliente" text="Prodotto proprio" />
        <Info
          title="Descrizione"
          text={`Sonid è un prodotto di teoria musicale per musicisti e studenti che vogliono praticare in modo strutturato — non solo consultare schede. Insegna intervalli, accordi, scale, tonalità e progressioni con esercizi guidati su iOS e Android, con sito multilingue e contenuti educativi. Dallo stesso monorepo sono nati tool di pratica e flussi per scuole.`}
        />
        <Info
          title="Cosa ho fatto"
          text={`Come founder e sviluppatore principale: direzione prodotto, app native (Swift / Kotlin), web (Next.js), backend (Firebase, Postgres, Google Cloud), i18n, release store e iterazione a lungo termine da MVP a produzione.`}
        />
      </article>
    ),
  },

  meta: {
    title: "Meta: Assembled",
    desc: "Gioco di carte online gratuito su Steam",
    htmlText: () => (
      <article className="content">
        <Info title="Cliente" text="Prodotto proprio" />
        <Info
          title="Descrizione"
          text={`Meta: Assembled è un gioco di carte online gratuito su Steam, leggermente ispirato a Magic: The Gathering e Hearthstone. Nato come progetto per imparare a pubblicare un’esperienza multiplayer realtime.`}
        />
        <Info
          title="Cosa ho fatto"
          text={`Stato di gioco realtime con Firebase, client Vue e distribuzione su Steam.`}
        />
      </article>
    ),
  },

  sites: {
    title: "WordPress",
    desc: "Siti per clienti",
    htmlText: () => (
      <article className="content">
        <Info
          title="Jeruzalem Kerk"
          text={
            "Nuovo sito WordPress per Jeruzalem Kerk Amsterdam, così i volontari possono gestire blog ed eventi in autonomia, con un look più fresco per un pubblico più ampio."
          }
        />
        <Info
          title="Bartoon"
          text={
            "Piccolo sito portfolio per il fumettista olandese Bart Kranenburg."
          }
        />
        <Info
          title="Vincent Niekerk"
          text={
            "Sito portfolio per un falegname di Amsterdam. Ha portato nuovi clienti e posiziona bene su Google."
          }
        />
      </article>
    ),
  },

  wms: {
    title: "WMS",
    desc: "Web app di warehouse management",
    htmlText: () => (
      <article className="content">
        <Info title="Cliente" text="ecBase" />
        <Info
          title="Descrizione"
          text={`Frontend web di warehouse management per un ERP di backoffice. Gli utenti gestiscono acquisti e vendite, fanno inventari e monitorano le operazioni da una dashboard statistica. Focus su UI dati complesse e flussi quotidiani affidabili.`}
        />
        <Info
          title="Cosa ho fatto"
          text={`Flussi WMS per vendite, stock e conteggi; dashboard/grafici; state client (locale vs globale vs server vs storage); componenti riusabili per tabelle e filtri (Vite, React, TanStack, Chart.js).`}
        />
      </article>
    ),
  },

  starterApp: {
    title: "B2B Order App",
    desc: "App ordini B2B whitelabel (Expo)",
    htmlText: () => (
      <article className="content">
        <Info title="Cliente" text="ecBase" />
        <Info
          title="Descrizione"
          text={`App mobile whitelabel per ordini B2B dei clienti di aziende affiliate — soprattutto ristorazione e wholesale. Catalogo con ricerca/filtri, liste ordini, e dati cliente come ordini e fatture.`}
        />
        <Info
          title="Cosa ho fatto"
          text={`App Expo / React Native, track di release App Store e Play (dev, preview, staging, production), OTA update e performance su dispositivi entry-level.`}
        />
      </article>
    ),
  },

  starterNext: {
    title: "B2B Order Commerce",
    desc: "Sito ordini B2B whitelabel (Next.js)",
    htmlText: () => (
      <article className="content">
        <Info title="Cliente" text="ecBase" />
        <Info
          title="Descrizione"
          text={`Sito whitelabel di ordini B2B che le aziende affiliate offrono ai propri clienti. Moduli: ordinare prodotti, profilo cliente, prodotti più ordinati, fatture e stato ordine. Molto usato nella ristorazione.`}
        />
        <Info
          title="Cosa ho fatto"
          text={`Frontend Next.js con auth/sessioni, filtri e ordinamento prodotti, performance (bundle, image cache) e deploy su Google Cloud Run con Docker.`}
        />
      </article>
    ),
  },
};
