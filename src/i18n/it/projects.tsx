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

  capo: {
    title: "Capo",
    desc: "Tastiera interattiva per accordi, scale e teoria",
    htmlText: () => (
      <article className="content">
        <Info title="Cliente" text="Prodotto proprio (Sonid)" />
        <Info
          title="Descrizione"
          text={`Capo porta la libreria di accordi e scale di Sonid su un manico interattivo per chitarra, basso, ukulele, mandolino e altro. I musicisti esplorano voicing, vista a manico intero, accordature alternative e articoli di teoria collegati allo stesso catalogo di sonid.app — con deep link condivisibili tra web e mobile.`}
        />
        <Info
          title="Cosa ho fatto"
          text={`App native iOS (Swift) e Android (Kotlin) più sito marketing Next.js (getcapo.sonid.app). UX del manico, layout strumento/accordatura, integrazione libreria Sonid, temi, deep link e release store nel turborepo Sonid.`}
        />
      </article>
    ),
  },

  toka: {
    title: "Toka",
    desc: "Metronomo di pratica con groove di batteria reali",
    htmlText: () => (
      <article className="content">
        <Info title="Cliente" text="Prodotto proprio (Sonid)" />
        <Info
          title="Descrizione"
          text={`Toka è un metronomo di pratica e step sequencer con feel di batteria reali — non solo un click. Imposta BPM e metro, scegli groove di genere (pop, rock, jazz, boom-bap, reggae, bossa, samba e altro), disegna i passi e pratica con swing e suddivisioni. Nucleo gratuito con Pro e sample pack opzionali una tantum.`}
        />
        <Info
          title="Cosa ho fatto"
          text={`App native iOS (Swift) e Android (Kotlin), packaging desktop e sito gettoka.sonid.app. Motore groove/sequencer, temi, acquisti in-app, deep link dal metronomo web di Sonid e release store nel monorepo condiviso.`}
        />
      </article>
    ),
  },

  classroom: {
    title: "Sonid Classroom",
    desc: "Piattaforma per scuole di musica, docenti e studenti",
    htmlText: () => (
      <article className="content">
        <Info title="Cliente" text="Prodotto proprio (Sonid)" />
        <Info
          title="Descrizione"
          text={`Sonid Classroom è una piattaforma web per insegnanti e scuole di musica: classi, ruoli, inviti studenti, compiti collegati agli esercizi Sonid, orari, disponibilità, vacanze, fatture, file scolastici e hub studenti. Piano Free per iniziare; tier a pagamento per scuole in crescita. Live su classroom.sonid.app.`}
        />
        <Info
          title="Cosa ho fatto"
          text={`App Next.js Classroom end-to-end nel turborepo Sonid: auth e dati multi-tenant su Firebase, piani/billing, gestione classi e ruoli, compiti, workflow calendario, i18n e integrazioni con i package practice/curriculum di Sonid.`}
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

  jeruzalemKerk: {
    title: "Jeruzalem Kerk",
    desc: "Sito della chiesa con contenuti autogestiti",
    htmlText: () => (
      <article className="content">
        <Info title="Cliente" text="Jeruzalemkerk Amsterdam-West" />
        <Info
          title="Descrizione"
          text={`Sito WordPress per la Jeruzalemkerk di Amsterdam Ovest: culti, livestream, attività e info sulla comunità. Pensato perché i volontari gestiscano blog ed eventi in autonomia, con un look più fresco per un pubblico più ampio.`}
        />
        <Info
          title="Cosa ho fatto"
          text={`Tema WordPress custom, struttura contenuti per blog ed eventi, e un setup aggiornabile dai volontari senza uno sviluppatore.`}
        />
      </article>
    ),
  },

  vincentNiekerk: {
    title: "Vincent Niekerk",
    desc: "Portfolio per un falegname su misura",
    htmlText: () => (
      <article className="content">
        <Info title="Cliente" text="Vincent Niekerk Meubelmaker" />
        <Info
          title="Descrizione"
          text={`Sito portfolio per un falegname e designer di Amsterdam — armadi, cucine, letti e pezzi su misura. Ha portato nuovi clienti e posiziona bene su Google.`}
        />
        <Info
          title="Cosa ho fatto"
          text={`Portfolio WordPress con gallerie progetti, flussi about/contatto e struttura SEO-friendly per la ricerca locale.`}
        />
      </article>
    ),
  },

  terrybak: {
    title: "Terrybak",
    desc: "Portfolio d’artista (Next.js + Directus)",
    htmlText: () => (
      <article className="content">
        <Info title="Cliente" text="Terry Vreeburg" />
        <Info
          title="Descrizione"
          text={`Portfolio per l’artista visivo Terry Vreeburg: opere per anno, pagine progetto e media gestiti da un CMS headless. Live su terrybak.com.`}
        />
        <Info
          title="Cosa ho fatto"
          text={`Front end Next.js con shadcn/ui, CMS Directus per upload e contenuti progetto, e un’esperienza gallery/navigazione chiara.`}
        />
      </article>
    ),
  },

  esploraNatura: {
    title: "Esplora Natura",
    desc: "Escursioni guidate (Next.js + Directus)",
    htmlText: () => (
      <article className="content">
        <Info title="Cliente" text="Esplora Natura" />
        <Info
          title="Descrizione"
          text={`Sito per escursioni, trekking e tour e-bike guidati in Liguria e Toscana. Mostra gli eventi in programma e l’approccio della guida a esperienze outdoor sicure e consapevoli. Live su esploranatura.com.`}
        />
        <Info
          title="Cosa ho fatto"
          text={`Front end Next.js con shadcn/ui, Directus per eventi e media, e una struttura contenuti orientata alla prenotazione per un brand outdoor locale.`}
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
