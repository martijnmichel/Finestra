import React, { useEffect, useRef } from "react";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import { AppButton } from "./application/AppButton";
import { Applications } from "../applications";
import { useWindowManager } from "../services/WindowManager";
import Shepherd from "shepherd.js";
import { useTranslation } from "react-i18next";
export const Desktop = () => {
  const { width, height } = useWindowSize();

  const { startApp } = useWindowManager();

  const { t } = useTranslation("common");

  const [doIntro, setDoIntro] = useLocalStorage("@shepherd-intro", true);

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
      text: "Hoi! Klik op een programma om deze te openen..",
      attachTo: {
        element: "#step-about",
        on: "right",
      },
      classes: `${tourStepClasses} ml-3`,
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
      text: "VSCode laat bijvoorbeeld de code van dit project zien! :)",
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

  useEffect(init, []);

  return (
    <div className="mt-[32px] p-5 flex flex-col gap-4 relative">
      <AppButton
        id="step-about"
        size={"80px"}
        appIcon={Applications.About.icon()}
        appName={Applications.About.name}
        onClick={() => startApp(Applications.About.name)}
      />
      <AppButton
        id="step-vscode"
        size={"80px"}
        appIcon={Applications.VSCode.icon()}
        appName={Applications.VSCode.name}
        onClick={() => startApp(Applications.VSCode.name)}
      />
      <AppButton
        size={"80px"}
        appIcon={Applications.Terminal.icon()}
        appName={Applications.Terminal.name}
        onClick={() => startApp(Applications.Terminal.name)}
      />
      <AppButton
        size={"80px"}
        appIcon={Applications.Sonid.icon()}
        appName={Applications.Sonid.name}
        onClick={() => startApp(Applications.Sonid.name)}
      />
    </div>
  );
};
