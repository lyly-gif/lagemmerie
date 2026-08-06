"use client";

import { useTransition } from "react";
import { locales, localeLabels, type Locale } from "@/lib/content";
import { setLocale } from "@/lib/actions";

export function LanguageSwitcher({
  current,
  variant = "light",
}: {
  current: Locale;
  variant?: "light" | "dark";
}) {
  const [isPending, startTransition] = useTransition();

  function switchTo(locale: Locale) {
    if (locale === current) return;
    startTransition(() => setLocale(locale));
  }

  const isDark = variant === "dark";

  return (
    <div
      className={`flex items-center gap-2.5 text-xs tracking-[0.1em] ${isPending ? "opacity-60" : ""}`}
    >
      {locales.map((locale) => {
        const isCurrent = locale === current;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => switchTo(locale)}
            aria-current={isCurrent}
            className={
              "relative pb-0.5 uppercase transition-colors " +
              (isDark
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
          </button>
        );
      })}
    </div>
  );
}
