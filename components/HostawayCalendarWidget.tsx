"use client";

import { useState } from "react";
import Script from "next/script";

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

type HostawayCalendarWidgetProps = {
  reserveButtonText: string;
  clearButtonText: string;
};

// Real availability from the Conciergerie Première Vue's Hostaway account —
// replaces the illustrative calendar (cahier des charges §6 is now resolved
// for this listing). Colors/font matched to the site's forest/bronze/sand
// palette instead of Hostaway's red/black/green sample values.
// openInNewTab: false — keeps the booking flow in the same tab, matching the
// low-friction, direct-booking positioning the widget exists to serve.
export function HostawayCalendarWidget({
  reserveButtonText,
  clearButtonText,
}: HostawayCalendarWidgetProps) {
  const [loaded, setLoaded] = useState(false);

  function initWidget() {
    window.hostawayCalendarWidget?.({
      baseUrl: "https://premierevue.holidayfuture.com/",
      listingId: 577024,
      numberOfMonths: 2,
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
  }

  return (
    <>
      {!loaded && (
        <div aria-hidden className="min-h-[420px] animate-pulse bg-sand-200/40" />
      )}
      <div id="hostaway-calendar-widget" className={loaded ? undefined : "hidden"} />
      <Script src={WIDGET_SRC} strategy="afterInteractive" onLoad={initWidget} />
    </>
  );
}
