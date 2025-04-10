import React from "react";
import { Info } from "../../components/Info";
export default {

  directusMobile: {
    title: "Directus Mobile",
    desc: "Gestisci i contenuti in movimento con l'app mobile Directus.",
    htmlText: () => (
      <article className="content">
        <Info title="Cliente" text="Progetto personale" />
        <Info
          title="Descrizione" 
          text={`Directus Mobile è un progetto open source personale. È un'app mobile che permette di gestire i contenuti in movimento con Directus. È sviluppata con React Native, Expo e React Query e utilizza l'API Directus per recuperare e gestire i contenuti.`}
        />
      </article>
    ),
  },
  
  sonid: {
    title: "Learn music theory with Sonid",
    htmlText: () => (
      <article>
        <p>Sonid is an app, questo e la prova italiana.</p>
        <p>
          Sonid ontstond uit reactie en noodzaak om gitaar studenten wat
          elementaire muziektheorie te leren. Tijdens het gebruik van een aantal
          van de bestaande web-apps voor het oefenen groeide de behoefte aan een
          methode die op een meer gestructureerde manier kennis opbouwt.
        </p>
        <p>Ook de website is verzorgd door Tocado Vision.</p>
      </article>
    ),
  },
};
