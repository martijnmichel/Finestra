import { useTranslation } from "react-i18next";
import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import { uniqueId } from "lodash";
export const TranslationElement = ({ i18nKey }: { i18nKey: string }) => {
  const { t } = useTranslation();
  const Comp = t("projects:sites.htmlText", {
    returnObjects: true,
    interpolation: { escapeValue: false },
  }) as any;

  const id = uniqueId("translation-comp");
  ReactDOM.render(Comp, document.getElementById(id));
  return <div id={id} />;
};
