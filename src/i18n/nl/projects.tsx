import React from "react";
export default {
  sonid: {
    title: "Leer muziektheorie met Sonid",
    htmlText: () => (
      <article>
        <p>
          Sonid is één van mijn hobbyprojecten. Ik heb een grote liefde voor
          programmeren én muziek. Toen ik gitaarles gaf, kwam ik erachter dat
          mijn studenten behoefte hadden aan een leuke manier om muziektheorie
          te leren. Daarom heb ik Sonid gemaakt. Sonid is een app waarmee je
          muziektheorie leert, op een leuke en gestructureerde manier.
        </p>

        <p>
          geleerd: opbouw map structuur en code structuur, werken/bijhouden van
          een complexe database. het uitsplitsen van component - acties - api -
          data{" "}
        </p>
        <p>
          Door Sonid heb ik veel geleerd, zoals hoe je code modulair opbouwt. Ik
          heb diverse code libaries beter leren kennen. Sonid is wereldwijd meer
          dan 40.000 keer gedownload en een waar succes te noemen!
        </p>
      </article>
    ),
  },

  meta: {
    title: "Meta: Assembled",
    htmlText: () => (
      <article>
        <p>hobby project, vertel wat leuks</p>

        <p>geleerd: realtime data verwerking met firebase database</p>
      </article>
    ),
  },

  sites: {
    title: "WordPress",
    htmlText: () => (
      <article>
        <p>hobby project, vertel wat leuks</p>

        <p>geleerd: realtime data verwerking met firebase database</p>
      </article>
    ),
  },

  wms: {
    title: "WMS",
    htmlText: () => (
      <article>
        <ul>
          <li>gemaakt voor ecbase</li>
          <li>warehouse management system (wms)</li>
          <li>
            grote applicatie voor de browser als frontend voor ons backoffice
            pakket
          </li>
          <li>
            verschillend modules zoals: inkoop/verkoop verwerking, tellingen en
            dashboard met statistieken
          </li>
          <li>
            veel geleerd over waar bijhouden van {"{ state }"}, globaal, lokaal,
            via localstorage of browserurl. Component gerelateerd denken, hoe
            hou je componenten zo onafhankelijk mogelijk, makkelijk leesbaar,
            klein en met een duidelijke opdracht.
          </li>
        </ul>
      </article>
    ),
  },

  starterApp: {
    title: "ECBase Bestel App",
    htmlText: () => (
      <article>
        <ul>
          <li>gemaakt voor ecbase</li>
          <li>bestel applicatie (native) voor b2b model</li>
          <li>
            de bestel app dient als frontend voor de klanten van ons backoffice
            pakket, deze kunnen zij in plaats van hun website leveren aan
            klanten om hun producten te bestellen en klantgegevens te
            bekijken/bewerken
          </li>
          <li>
            verschillend modules zoals: bestellen van producten, klant gegevens
            (& wijzigen), meest besteld producten, facturen, bestellingstatus.
          </li>
          <li>
            veel geleerd over: specifiek react-native, react-navigation en expo.
            werken met appstores intern, invoeren gegevens, builds, tests en
            releases met verschillende app environments. over-the-air updates
            (OTA)
          </li>
        </ul>
      </article>
    ),
  },

  starterNext: {
    title: "ECBase Bestel Commerce",
    htmlText: () => (
      <article>
        <ul>
          <li>gemaakt voor ecbase</li>
          <li>bestel website voor b2b model</li>
          <li>
            de bestel website dient als frontend voor de klanten van ons
            backoffice pakket, deze kunnen zij in plaats van hun website leveren
            aan klanten om hun producten te bestellen en klantgegevens te
            bekijken/bewerken
          </li>
          <li>
            verschillend modules zoals: bestellen van producten, klant gegevens
            (& wijzigen), meest besteld producten, facturen, bestellingstatus.
          </li>
          <li>
            veel geleerd over: nextjs interne api, authenticatie/bijhouden van
            sessies, verminderen van bundle-size, imports en uitvoeren van
            scripts op het juiste moment voor snelle page-load, wanneer
            data-fetching client of server-side en de daaruit komende state.
            filteren/sorteren producten. docker image met google filestore mount
            voor nextjs image cache en deploy op google cloud run.
          </li>
        </ul>

        <p className="text-xs">
          *** cold-start van de site is traag door lage instellingen GCR
        </p>
      </article>
    ),
  },
};
