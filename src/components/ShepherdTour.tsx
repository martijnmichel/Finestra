import { useEffectOnce } from "usehooks-ts";
import React, { useRef } from "react";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import Shepherd from "shepherd.js";
import { useTranslation } from "react-i18next";
export const ShepherdTour = () => {
  const [doIntro, setDoIntro] = useLocalStorage("@shepherd-intro", true);
  const { t } = useTranslation();
  const tour = useRef(
    new Shepherd.Tour({
      useModalOverlay: true,

      defaultStepOptions: {
        scrollTo: false,
        arrow: true,
      },
    })
  );

  const tourStepClasses = "bg-white rounded-lg z-10 p-3 ring-0";

  const init = () => {
    tour.current.addStep({
      id: "step-about",
      text: "Hoi! Welkom bij FinestraOS, mijn online portfolio/cv.",
      attachTo: {
        element: "#step-about",
        on: "top",
      },
      classes: `${tourStepClasses} -translate-x-24 -translate-y-8 focus:outline-none`,
      buttons: [
        {
          text: "Niet meer laten zien",
          action: () => {
            tour.current.complete();
            setDoIntro(false);
          },
          classes: "flat text-red-400",
        },
        {
          text: t("common:next"),
          action: tour.current.next,
        },
      ],
    });

    tour.current.addStep({
      id: "step-vscode",
      text: "Je kan apps openen en gebruiken zoals je gewend bent. VSCode laat bijvoorbeeld de code van dit project zien! :)",
      attachTo: {
        element: "#step-vscode",
        on: "right",
      },
      classes: `${tourStepClasses} ml-3 bottom`,
      buttons: [
        {
          text: t("common:next"),
          action: tour.current.next,
          classes: "ml-auto",
        },
      ],
    });

    tour.current.addStep({
      id: "step-launchpad",
      text: "In de launchpad staan nog meer apps!",
      attachTo: {
        element: "#step-launchpad",
        on: "top",
      },
      classes: `${tourStepClasses} -mt-2`,
      buttons: [
        {
          text: t("common:done"),
          action: tour.current.complete,
          classes: "ml-auto",
        },
      ],
    });

    if (doIntro) tour.current.start();
  };

  useEffectOnce(init);

  return null;
};
