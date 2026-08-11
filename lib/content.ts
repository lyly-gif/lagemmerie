import fr from "@/content/fr.json";
import en from "@/content/en.json";
import de from "@/content/de.json";
import nl from "@/content/nl.json";
import es from "@/content/es.json";

export const locales = ["fr", "en", "de", "nl", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale = "fr" as const satisfies Locale;

// Add a locale here only once its complete dictionary has been reviewed.
// The switcher keeps every planned language visible without exposing the
// placeholder files currently stored in content/.
export const translatedLocales = locales;

export const localeLabels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  de: "DE",
  nl: "NL",
  es: "ES",
};

const dictionaries = { fr, en, de, nl, es };

export type Content = typeof fr;

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function isTranslatedLocale(value: string | undefined): value is Locale {
  return !!value && (translatedLocales as readonly string[]).includes(value);
}

export function getDictionary(locale: string): Content {
  return isTranslatedLocale(locale)
    ? (dictionaries[locale] as Content)
    : dictionaries[defaultLocale];
}
