import React from "react";
import { Info } from "../../components/Info";
export default {


  sonid: {
    title: "Leer muziektheorie met Sonid",
    desc: "educatieapp voor Android en iOS",
    htmlText: () => (
      <article className="content">
        <Info title="Opdrachtgever" text="Eigen beheer" />

        <Info
          title="Beschrijving"
          text={`Sonid is één van mijn hobbyprojecten. Ik heb een grote liefde voor programmeren én muziek. Toen ik gitaarles gaf, kwam ik erachter dat mijn studenten behoefte hadden aan een leuke manier om muziektheorie te leren. Daarom heb ik Sonid gemaakt. Sonid is een app waarmee je muziektheorie leert, op een leuke en gestructureerde manier.          `}
        />

        <Info
          title="Wat heeft het mij gebracht?"
          text={`Door Sonid heb ik veel geleerd, zoals hoe je code modulair opbouwt. Ik heb diverse code libaries beter leren kennen. Sonid is wereldwijd meer dan 40.000 keer gedownload en een waar succes te noemen!`}
        />
      </article>
    ),
  },
  meta: {
    title: "Meta: Assembled",
    desc: "online game voor Steam",
    htmlText: () => (
      <article className="content">
        <Info title="Opdrachtgever" text="Eigen beheer" />

        <Info
          title="Beschrijving"
          text={`Meta: assembled maakte ik als hobbyproject om mijn kennis uit te breiden. Het spel staat nog steeds op STEAM en kan gratis gespeeld worden. Het is een kaartspel dat op Magic  the Gathering en Hearthstone lijkt. Het speelt zich af in de ruimte.`}
        />

        <Info
          title="Wat heeft het mij gebracht?"
          text={`Ik heb geleerd om reatime data te verwerken met de Firebase database.`}
        />
      </article>
    ),
  },

  sites: {
    title: "WordPress",
    desc: "diverse Wordpress websites",
    htmlText: () => (
      <article className="content">
        <Info
          title="Jeruzalem Kerk"
          text={'Voor de Jeruzalem Kerk Amsterdam maakte ik een nieuwe website, waarmee ze nieuwe doelgroepen willen aantrekken. De aanwezigheid van de Jeruzalem Kerk is erg belangrijk voor Amsterdam-West en dat draagt de website ook uit. Op de website kunnen de vrijwilligers van de kerk makkelijk nieuwe evenementen en nieuwsberichten plaatsen.'}
        />
        <Info
          title="Bartoon"
          text={'Bart Kranenburg is striptekenaar en cartoonist. Voor hem zeggen beelden meer dan woorden. Daarom maakte ik voor hem een compacte website, waarop zijn werk direct te zien is. '}
        />
        <Info
          title="Vincent Niekerk"
          text={'Vincent is meubelmaker in Amsterdam. Hij wilde een website waarop hij zijn projecten kan laten zien. Door de website heeft hij veel nieuwe opdrachten binnengekregen. Na meerdere jaren staat hij nog steeds in de hoogste zoekresultaten van Google.'}
        />
      </article>
    ),
  },

  wms: {
    title: "WMS",
    desc: "Warehouse management system",
    htmlText: () => (
      <article className="content">
        <Info title="Opdrachtgever" text="ecBase" />
        <Info
          title="Beschrijving"
          text={'WMS is een grote applicatie voor de browser die werkt als frontend voor het backoffice pakket. In de web-app kunnen klanten inkopen en verkopen verwerken, tellingen uitvoeren en er is een mooi dashboard met statistieken.'}
        />

        <Info
          title="Opgedane kennis"
          text={'Ik heb geleerd om keuzes te maken in waar ik de {state} bijhou. Doe ik dit lokaal, globaal, via local storage of browserurl? Daarnaast heb ik mijn component gerelateerd denken verder ontwikkeld. Hoe hou je componenten zo onafhankelijk mogelijk, makkelijk leesbaar, klein en met een duidelijke opdracht?'}
        />
      </article>
    ),
  },

  starterApp: {
    title: "ECBase Bestel App",
    desc: "Whitelabel bestel applicatie, B2B model",
    htmlText: () => (
      <article className="content">
        <Info title="Opdrachtgever" text="ecBase" />

        <Info
          title="Beschrijving"
          text={`Via de app kunnen klanten van aangesloten bedrijven producten bestellen, bestellijsten bewerken en klantgegevens bekijken/bewerken. Assortiment pagina's van producten met oa filters en zoekfunctie. Klantgegevens zoals facturen en bestellingen inzien. Aanpassen van klantgegevens.`}
        />

        <Info
          title="Wat heeft het mij gebracht"
          text={`In dit project heb ik veel geleerd over React Native en Expo. Daarnaast heb ik intensief gewerkt met Appstore en Play Console, specifiek het bijhouden van verschillende release tracks met builds voor development/preview/staging en production.
            Plus het uitgeven van OTA updates. Ook de performance van react-native bleek voor lower-end toestellen een goede leerschool.`}
        />
      </article>
    ),
  },

  starterNext: {
    title: "ECBase Bestel Commerce",
    desc: "Whitelabel bestel website, B2B model",
    htmlText: () => (
      <article>
        <Info title="Opdrachtgever" text="ecBase" />

        <Info
          title="Beschrijving"
          text={`Dit is de bestel website voor het B2B model van ecBase. Deze dienst als frontend voor bedrijven die zijn aangesloten aan het backoffice pakket. Zij leveren deze website aan hun klanten, zodat deze bestellingen kunnen plaatsen en klantgegevens kunnen bekijken/bewerken. De website wordt veel gebruikt in de horeca. Er zijn diverse modules, zoals: “bestellen van producten”, “klantgegevens”, “meest bestelde producten”, “facturen” en “bestelstatus”. `}
        />

        <Info
          title="Wat heeft het mij gebracht"
          text={`In dit project heb ik veel geleerd over React Native en Expo. Daarnaast heb ik intensief gewerkt met Appstore en Play Console, specifiek het bijhouden van verschillende release tracks met builds voor development/preview/staging en production.
           Plus het uitgeven van OTA updates. Ook de performance van react-native bleek voor lower-end toestellen een goede leerschool.`}
        />


        <Info
          title="Belangrijk om te weten"
          text="Cold-start van de site is traag door lage instellingen GCR"
        />
      </article>
    ),
  },
};
