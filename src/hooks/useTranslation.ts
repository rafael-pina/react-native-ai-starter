import { en } from "@/translations/en";
import { es } from "@/translations/es";
import { de } from "@/translations/de";
import { useLanguage } from "@/ctx/LanguageProvider";

type TranslationKeys = typeof en;

type InterpolationValues = {
  amount?: number;
  [key: string]: any;
};

export type Language = "en" | "es" | "de";

const translations = {
  en,
  es,
  de,
};

export const useTranslation = () => {
  const { language: currentLanguage, setLanguage: changeLanguage } =
    useLanguage();

  const translate = (
    key: keyof TranslationKeys["home"],
    values?: InterpolationValues
  ) => {
    let text =
      translations[currentLanguage as keyof typeof translations].home[key];

    if (values) {
      Object.keys(values).forEach((key) => {
        text = text.replace(`{{${key}}}`, values[key].toString());
      });
    }

    return text;
  };

  return { t: translate, currentLanguage, changeLanguage };
};
