"use client";

import { usePathname } from "next/navigation";
import { locales, localeLabels, translatedLocales, type Locale } from "@/lib/content";
import { localizedPath } from "@/lib/i18n-routing";

export function LanguageSwitcher({
  current,
  variant = "light",
}: {
  current: Locale;
  variant?: "light" | "dark";
}) {
  const pathname = usePathname();
  const isDark = variant === "dark";
  const languageLabels: Record<Locale, string> = {
    fr: "Langues",
    en: "Languages",
    de: "Sprachen",
    nl: "Talen",
    es: "Idiomas",
  };

  return (
    <div
      aria-label={languageLabels[current]}
      className="flex items-center gap-1 text-xs tracking-[0.1em]"
    >
      {locales.map((locale) => {
        const isCurrent = locale === current;
        const isAvailable = (translatedLocales as readonly string[]).includes(locale);
        return (
          <a
            key={locale}
            href={isAvailable ? localizedPath(locale, pathname) : pathname}
            hrefLang={locale}
            aria-current={isCurrent ? "page" : undefined}
            aria-label={
              isAvailable
                ? localeLabels[locale]
                : `${localeLabels[locale]} — traduction en préparation`
            }
            title={isAvailable ? undefined : "Traduction en préparation"}
            className={
              "relative flex min-h-9 min-w-9 items-center justify-center uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-600 " +
              (!isAvailable
                ? isDark
                  ? "cursor-not-allowed text-sand-100/25"
                  : "cursor-not-allowed text-forest-950/25"
                : isDark
                ? isCurrent
                  ? "text-sand-100"
                  : "text-sand-100/50 hover:text-sand-100"
                : isCurrent
                  ? "text-forest-950"
                  : "text-forest-950/40 hover:text-forest-950")
            }
          >
            {localeLabels[locale]}
            {isCurrent && (
              <span
                className={
                  "absolute -bottom-0.5 left-0 h-px w-full " +
                  (isDark ? "bg-bronze-400" : "bg-bronze-600")
                }
              />
            )}
          </a>
        );
      })}
    </div>
  );
}
