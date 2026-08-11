"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import type { Locale } from "@/lib/content";

const WIDGET_SRC = "https://d2q3n06xhbi0am.cloudfront.net/calendar.js";

type HostawayWidgetConfig = {
  baseUrl: string;
  listingId: number;
  numberOfMonths: 1 | 2;
  openInNewTab: boolean;
  font: string;
  rounded: boolean;
  button: { action: "checkout" | "inquiry"; text: string };
  clearButtonText: string;
  color: { mainColor: string; frameColor: string; textColor: string };
};

declare global {
  interface Window {
    hostawayCalendarWidget?: (config: HostawayWidgetConfig) => void;
  }
}

const fallbackCopy: Record<Locale, { text: string; cta: string }> = {
  fr: { text: "Le calendrier met plus de temps que prévu à se charger.", cta: "Ouvrir les disponibilités sur Première Vue" },
  en: { text: "The calendar is taking longer than expected to load.", cta: "Open availability on Première Vue" },
  de: { text: "Der Kalender benötigt länger als erwartet.", cta: "Verfügbarkeit bei Première Vue öffnen" },
  nl: { text: "Het laden van de kalender duurt langer dan verwacht.", cta: "Beschikbaarheid openen bij Première Vue" },
  es: { text: "El calendario tarda más de lo previsto en cargar.", cta: "Abrir disponibilidad en Première Vue" },
};

type HostawayCalendarWidgetProps = {
  locale: Locale;
  reserveButtonText: string;
  clearButtonText: string;
  loadingText: string;
  partnerNote: string;
};

export function HostawayCalendarWidget({
  locale,
  reserveButtonText,
  clearButtonText,
  loadingText,
  partnerNote,
}: HostawayCalendarWidgetProps) {
  const [loaded, setLoaded] = useState(false);
  const [loadFallback, setLoadFallback] = useState(false);

  useEffect(() => {
    if (loaded) return;
    const timer = window.setTimeout(() => setLoadFallback(true), 8000);
    return () => window.clearTimeout(timer);
  }, [loaded]);

  function initWidget() {
    const root = document.getElementById("hostaway-calendar-widget");
    if (!root || !window.hostawayCalendarWidget) return;

    root.replaceChildren();
    window.hostawayCalendarWidget({
      baseUrl: `https://premierevue.holidayfuture.com/${locale === "en" || locale === "nl" ? "" : `${locale}/`}`,
      listingId: 577024,
      numberOfMonths: window.matchMedia("(max-width: 767px)").matches ? 1 : 2,
      openInNewTab: false,
      font: "Karla",
      rounded: false,
      button: { action: "checkout", text: reserveButtonText },
      clearButtonText,
      color: {
        mainColor: "#a47c4f",
        frameColor: "#0f1d15",
        textColor: "#1f3327",
      },
    });
    setLoaded(true);
    setLoadFallback(false);
  }

  return (
    <div>
      {!loaded && (
        <div
          role="status"
          className="flex min-h-[300px] flex-col items-center justify-center gap-4 border border-line/60 bg-sand-200/40 px-6 text-center text-sm text-forest-800/70"
        >
          <span className="animate-pulse">{loadingText}</span>
          {loadFallback && (
            <>
              <span className="text-xs">{fallbackCopy[locale].text}</span>
              <a
                href={`https://premierevue.holidayfuture.com/${locale === "en" || locale === "nl" ? "" : `${locale}/`}listings/577024`}
                className="border border-bronze-600 px-4 py-2 text-xs font-medium tracking-[0.08em] text-bronze-700 uppercase hover:bg-bronze-600 hover:text-sand-50"
              >
                {fallbackCopy[locale].cta}
              </a>
            </>
          )}
        </div>
      )}
      <div id="hostaway-calendar-widget" className={loaded ? undefined : "hidden"} />
      <p className="mt-5 max-w-2xl text-xs leading-relaxed text-forest-800/65">{partnerNote}</p>
      <Script
        src={WIDGET_SRC}
        strategy="afterInteractive"
        onReady={initWidget}
        onError={() => setLoadFallback(true)}
      />
    </div>
  );
}
