import { useTranslation } from "react-i18next";
import React, {
  JSXElementConstructor,
  ReactElement,
  isValidElement,
} from "react";
export const TranslationElement = ({
  i18nKey,
  ...rest
}: { i18nKey: string } & Partial<HTMLDivElement>) => {
  const { t } = useTranslation();
  const Comp = t(i18nKey, {
    returnObjects: true,
    interpolation: { escapeValue: false },
  }) as JSXElementConstructor<any>;

  return isValidElement(<Comp />) ? <Comp {...rest} /> : null;
};
