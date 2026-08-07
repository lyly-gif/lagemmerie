"use client";

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

// Real availability from the Conciergerie Première Vue's Hostaway account —
// replaces the illustrative calendar (cahier des charges §6 is now resolved
// for this listing). Colors/font matched to the site's forest/bronze/sand
// palette instead of Hostaway's red/black/green sample values.
function initWidget() {
  window.hostawayCalendarWidget?.({
    baseUrl: "https://premierevue.holidayfuture.com/",
    listingId: 577024,
    numberOfMonths: 2,
    openInNewTab: true,
    font: "Karla",
    rounded: false,
    button: { action: "checkout", text: "Réserver" },
    clearButtonText: "Effacer les dates",
    color: {
      mainColor: "#a47c4f",
      frameColor: "#0f1d15",
      textColor: "#1f3327",
    },
  });
}

export function HostawayCalendarWidget() {
  return (
    <>
      <div id="hostaway-calendar-widget" />
      <Script src={WIDGET_SRC} strategy="afterInteractive" onLoad={initWidget} />
    </>
  );
}
