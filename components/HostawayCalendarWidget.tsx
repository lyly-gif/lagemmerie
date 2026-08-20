"use client";

import { useEffect, useRef, useState } from "react";
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
  // The home page shows this same sentence higher up, right under the
  // section intro, instead of below the calendar (owner: wanted it read
  // before the widget, not after) — so it renders it itself and asks the
  // widget not to repeat it.
  showPartnerNote?: boolean;
};

export function HostawayCalendarWidget({
  locale,
  reserveButtonText,
  clearButtonText,
  loadingText,
  partnerNote,
  showPartnerNote = true,
}: HostawayCalendarWidgetProps) {
  const [loaded, setLoaded] = useState(false);
  const [loadFallback, setLoadFallback] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loaded) return;
    const timer = window.setTimeout(() => setLoadFallback(true), 8000);
    return () => window.clearTimeout(timer);
  }, [loaded]);

  useEffect(() => {
    // The vendor bundle only renders correctly the first time it runs in a
    // given browser session. After a client-side route change (e.g.
    // /tarifs -> /), Next's <Script strategy="afterInteractive"> reuses the
    // already-loaded script and never re-executes it, so
    // window.hostawayCalendarWidget() silently produces an empty container
    // on the second page — no console error, just a blank gap where the
    // calendar should be. Injecting a fresh <script> tag on every mount
    // forces the vendor code to re-run from scratch instead of reusing
    // whatever internal state broke the second render.
    let cancelled = false;

    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;
    script.onload = () => {
      if (cancelled) return;
      const root = containerRef.current;
      if (!root || !window.hostawayCalendarWidget) {
        setLoadFallback(true);
        return;
      }
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
      // The vendor call above can fail silently (no throw, no console
      // output) — confirm something actually rendered before declaring
      // success, otherwise surface the fallback link instead of a blank gap.
      window.setTimeout(() => {
        if (cancelled) return;
        if (root.children.length > 0) {
          setLoaded(true);
          setLoadFallback(false);
        } else {
          setLoadFallback(true);
        }
      }, 500);
    };
    script.onerror = () => {
      if (!cancelled) setLoadFallback(true);
    };
    document.body.appendChild(script);

    return () => {
      cancelled = true;
      document.body.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- config values are stable per render tree; only re-run on real remount
  }, []);

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
      <div
        id="hostaway-calendar-widget"
        ref={containerRef}
        className={loaded ? undefined : "hidden"}
      />
      {showPartnerNote && (
        <p className="mt-5 max-w-2xl text-xs leading-relaxed text-forest-800/65">{partnerNote}</p>
      )}
    </div>
  );
}
