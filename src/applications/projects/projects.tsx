import React, { ReactNode } from "react";

import Sonid from "../../icons/sonid.png";
import WMS from "../../icons/wms.png";
import StarterApp from "../../icons/starterApp.png";
export type Project = {
  title: string;
  desc: string;
  text?: JSX.Element;
  icon: ReactNode;
  frameworks: string;
};

export const projects: { [x: string]: Project } = {
  sonid: {
    title: "Learn music theory with Sonid",
    desc: "an app to learn and practice music theory in a fun and structured manner!",
    icon: Sonid,
    text: (
      <article>
        <p>
          Sonid is één van de eigen projecten van Tocado Vision. Naast de liefde
          voor programmeren heeft Martijn een grote liefde voor muziek. Hij
          heeft het conservatorium afgerond en geeft gitaarles. Zijn liefde voor
          lesgeven en programmeren heeft hij gecombineerd in de creatie van de
          app Sonid, een app voor iOS en Android waarmee je muziektheorie kunt
          leren.
        </p>
        <p>
          Sonid ontstond uit reactie en noodzaak om gitaar studenten wat
          elementaire muziektheorie te leren. Tijdens het gebruik van een aantal
          van de bestaande web-apps voor het oefenen groeide de behoefte aan een
          methode die op een meer gestructureerde manier kennis opbouwt.
        </p>
        <p>Ook de website is verzorgd door Tocado Vision.</p>
      </article>
    ),
    frameworks: `Vue, Cordova, Firebase`,
  },

  wms: {
    title: "WMS",
    desc: "ecBase WMS as a Warehouse Management System available to our private clients in addition to our backoffice.",
    icon: WMS,
    text: <article></article>,
    frameworks: `Redux, Tanstack React (Query/Location/Table), ChartJS`,
  },

  starterApp: {
    title: "ecBase Bestel",
    desc: "Een React Native boilerplate voor het bestellen van producten.",
    icon: StarterApp,
    text: (
      <article>
        <p>
          Apps zijn in bedrijfsvoering en procesoptimalisatie niet meer weg te
          denken. De voordelen zijn evident: Een goede app kan het bestelproces
          aanzienlijk versnellen en vergemakkelijken. App is de afgekorte versie
          van applicatie; een programma dus. Het gemak van zo’n applicatie is
          dat iedereen die altijd en overal kan openen en gebruiken. Bij een
          bestel app maakt u het plaatsen van bestellingen voor uw producten een
          stuk makkelijker.{" "}
        </p>
        <p>
          De ecBase bestelapp kunt u geheel naar eigen wens aanpassen om een
          vertrouwde omgeving te creëren voor u en uw eindgebruikers. Daarnaast
          geeft u de app een eigen, unieke naam. Zo bent u gemakkelijker te
          vinden in de verschillende appstores en straalt u met uw bedrijf meer
          professionaliteit uit.
        </p>
      </article>
    ),
    frameworks: `Expo, Tanstack React (Query/Location/Table), ChartJS`,
  },
};
