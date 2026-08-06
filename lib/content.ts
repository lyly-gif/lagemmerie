import fr from "@/content/fr.json";
import en from "@/content/en.json";
import de from "@/content/de.json";
import nl from "@/content/nl.json";

export const locales = ["fr", "en", "de", "nl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const localeLabels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  de: "DE",
  nl: "NL",
};

const dictionaries = { fr, en, de, nl };

export type Content = typeof fr;

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: string): Content {
  return isLocale(locale) ? (dictionaries[locale] as Content) : dictionaries[defaultLocale];
}
