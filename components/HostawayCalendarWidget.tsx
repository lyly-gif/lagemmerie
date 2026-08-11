"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

const localeText: Record<Locale, { days: string[]; months: string[]; select: string; checkIn: string; checkOut: string; person: [string, string] }> = {
  fr: { days: ["Di","Lu","Ma","Me","Je","Ve","Sa"], months: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"], select: "Sélectionnez les dates d’arrivée et de départ", checkIn: "Arrivée :", checkOut: "Départ :", person: ["personne","personnes"] },
  en: { days: ["Su","Mo","Tu","We","Th","Fr","Sa"], months: ["January","February","March","April","May","June","July","August","September","October","November","December"], select: "Select check-in and check-out dates", checkIn: "Check-in:", checkOut: "Check-out:", person: ["guest","guests"] },
  de: { days: ["So","Mo","Di","Mi","Do","Fr","Sa"], months: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"], select: "An- und Abreisedatum wählen", checkIn: "Anreise:", checkOut: "Abreise:", person: ["Gast","Gäste"] },
  nl: { days: ["Zo","Ma","Di","Wo","Do","Vr","Za"], months: ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"], select: "Kies aankomst- en vertrekdatum", checkIn: "Aankomst:", checkOut: "Vertrek:", person: ["gast","gasten"] },
  es: { days: ["Do","Lu","Ma","Mi","Ju","Vi","Sá"], months: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"], select: "Seleccione las fechas de llegada y salida", checkIn: "Llegada:", checkOut: "Salida:", person: ["huésped","huéspedes"] },
};
const englishDays = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const englishMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const fallbackCopy: Record<Locale, { text: string; cta: string }> = {
  fr: { text: "Le calendrier met plus de temps que prévu à se charger.", cta: "Ouvrir les disponibilités sur Première Vue" },
  en: { text: "The calendar is taking longer than expected to load.", cta: "Open availability on Première Vue" },
  de: { text: "Der Kalender benötigt länger als erwartet.", cta: "Verfügbarkeit bei Première Vue öffnen" },
  nl: { text: "Het laden van de kalender duurt langer dan verwacht.", cta: "Beschikbaarheid openen bij Première Vue" },
  es: { text: "El calendario tarda más de lo previsto en cargar.", cta: "Abrir disponibilidad en Première Vue" },
};

function localizeWidget(root: HTMLElement, locale: Locale) {
  const copy = localeText[locale];
  const labels: Record<string, string> = {
    ...Object.fromEntries(englishDays.map((day, index) => [day, copy.days[index]])),
    "Select check-in and check-out dates": copy.select,
    "Check-in:": copy.checkIn,
    "Check-out:": copy.checkOut,
  };
  root.querySelectorAll<HTMLElement>("*").forEach((element) => {
    if (element.children.length > 0) return;
    const label = element.textContent?.trim();
    if (!label) return;

    const directTranslation = labels[label];
    if (directTranslation) {
      element.textContent = directTranslation;
      return;
    }

    const monthYear = label.match(
      /^(January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})$/,
    );
    if (monthYear) element.textContent = `${copy.months[englishMonths.indexOf(monthYear[1])]} ${monthYear[2]}`;
  });
}

type HostawayCalendarWidgetProps = {
  locale: Locale;
  reserveButtonText: string;
  clearButtonText: string;
  guestLabel: string;
  guestPlaceholder: string;
  guestHelp: string;
  guestError: string;
  loadingText: string;
  partnerNote: string;
};

// Real availability from the Conciergerie Première Vue's Hostaway account —
// replaces the illustrative calendar (cahier des charges §6 is now resolved
// for this listing). Colors/font matched to the site's forest/bronze/sand
// palette instead of Hostaway's red/black/green sample values.
// openInNewTab: false — keeps the booking flow in the same tab, matching the
// low-friction, direct-booking positioning the widget exists to serve.
export function HostawayCalendarWidget({
  locale,
  reserveButtonText,
  clearButtonText,
  guestLabel,
  guestPlaceholder,
  guestHelp,
  guestError,
  loadingText,
  partnerNote,
}: HostawayCalendarWidgetProps) {
  const [loaded, setLoaded] = useState(false);
  const [guestCount, setGuestCount] = useState("");
  const [showGuestError, setShowGuestError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loadFallback, setLoadFallback] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const guestCountRef = useRef(guestCount);
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    guestCountRef.current = guestCount;
  }, [guestCount]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || shouldLoad) return;
    if (!("IntersectionObserver" in window)) {
      const timer = globalThis.setTimeout(() => setShouldLoad(true), 0);
      return () => globalThis.clearTimeout(timer);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad || loaded) return;
    const timer = window.setTimeout(() => setLoadFallback(true), 8000);
    return () => window.clearTimeout(timer);
  }, [loaded, shouldLoad]);

  // Hostaway's widget currently hard-codes numberOfGuests=1. Patch only
  // outgoing URLs to the authorised booking domain so the visitor's explicit
  // selection is preserved. All unrelated window.open calls pass through.
  useEffect(() => {
    const originalOpen = window.open;
    const patchedOpen = function (url?: string | URL, target?: string, features?: string) {
      if (url) {
        const destination = new URL(url.toString(), window.location.href);
        if (
          destination.hostname === "premierevue.holidayfuture.com" &&
          destination.pathname.includes("577024")
        ) {
          if (!guestCountRef.current) {
            setShowGuestError(true);
            return null;
          }
          destination.searchParams.set("numberOfGuests", guestCountRef.current);
          return originalOpen.call(window, destination.toString(), target, features);
        }
      }
      return originalOpen.call(window, url, target, features);
    } as typeof window.open;

    window.open = patchedOpen;
    return () => {
      if (window.open === patchedOpen) window.open = originalOpen;
    };
  }, []);

  useEffect(
    () => () => {
      observerRef.current?.disconnect();
    },
    [],
  );

  const initWidget = useCallback(() => {
    const root = document.getElementById("hostaway-calendar-widget");
    if (!root || !window.hostawayCalendarWidget) return;

    observerRef.current?.disconnect();
    setLoaded(false);
    const revealWhenReady = () => {
      localizeWidget(root, locale);
      if (root.querySelector(".CalendarDay")) {
        if (root.dataset.calendarReady !== "true") {
          root.dataset.calendarReady = "true";
          setLoaded(true);
        }
      }
    };
    observerRef.current = new MutationObserver(revealWhenReady);
    observerRef.current.observe(root, { childList: true, subtree: true });

    window.hostawayCalendarWidget?.({
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
    revealWhenReady();
  }, [clearButtonText, locale, reserveButtonText]);

  return (
    <div ref={containerRef}>
      <div className="mb-6 max-w-xs">
        <label
          htmlFor="hostaway-guests"
          className="mb-2 block text-xs font-medium tracking-[0.12em] text-forest-900 uppercase"
        >
          {guestLabel}
        </label>
        <select
          id="hostaway-guests"
          value={guestCount}
          onChange={(event) => {
            setGuestCount(event.target.value);
            setShowGuestError(false);
          }}
          aria-describedby={showGuestError ? "hostaway-guests-error" : "hostaway-guests-help"}
          className="w-full border border-line bg-sand-50 px-4 py-3 text-sm text-forest-950 transition-colors focus:border-bronze-600"
        >
          <option value="">{guestPlaceholder}</option>
          {Array.from({ length: 8 }, (_, index) => index + 1).map((count) => (
            <option key={count} value={count}>
              {count} {count === 1 ? localeText[locale].person[0] : localeText[locale].person[1]}
            </option>
          ))}
        </select>
        <p id="hostaway-guests-help" className="mt-2 text-xs text-forest-800/60">
          {guestHelp}
        </p>
        {showGuestError && (
          <p id="hostaway-guests-error" role="alert" className="mt-2 text-sm text-red-800">
            {guestError}
          </p>
        )}
      </div>

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
      {shouldLoad && (
        <Script
          src={WIDGET_SRC}
          strategy="afterInteractive"
          onReady={initWidget}
          onError={() => setLoadFallback(true)}
        />
      )}
    </div>
  );
}
