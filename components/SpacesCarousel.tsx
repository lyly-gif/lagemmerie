"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { featured, type FeaturedKey } from "@/lib/images";
import type { Locale } from "@/lib/content";
import { localizedPath } from "@/lib/i18n-routing";

const AUTO_CROSSFADE_MS = 3200;
const arrowLabels: Record<Locale, [string, string]> = {
  fr: ["Précédent", "Suivant"],
  en: ["Previous", "Next"],
  de: ["Zurück", "Weiter"],
  nl: ["Vorige", "Volgende"],
  es: ["Anterior", "Siguiente"],
};

type SpaceItem = {
  number: string;
  slug: string;
  title: string;
  imageKey: string;
  hoverSrc: string | null;
};

export function SpacesCarousel({
  items,
  locale,
}: {
  items: SpaceItem[];
  locale: Locale;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  // Hover alone never shows the second photo on touch devices — there is no
  // hover there — so every card also crossfades on its own timer. A hover
  // still forces the alt photo immediately for mouse users.
  const [autoAlt, setAutoAlt] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setAutoAlt((v) => !v), AUTO_CROSSFADE_MS);
    return () => clearInterval(id);
  }, [reducedMotion]);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-card]");
    if (!track || !card) return;
    track.scrollBy({ left: direction * (card.offsetWidth + 18), behavior: "smooth" });
  }

  return (
    <div>
      <div className="mb-6 flex justify-end gap-2">
        <button
          type="button"
          aria-label={arrowLabels[locale][0]}
          onClick={() => scrollByCard(-1)}
          className="flex h-[42px] w-[42px] items-center justify-center border border-bronze-500 text-bronze-700 transition-colors hover:bg-bronze-600 hover:text-sand-50"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label={arrowLabels[locale][1]}
          onClick={() => scrollByCard(1)}
          className="flex h-[42px] w-[42px] items-center justify-center border border-bronze-500 text-bronze-700 transition-colors hover:bg-bronze-600 hover:text-sand-50"
        >
          ›
        </button>
      </div>

      <div
        ref={trackRef}
        className="scrollbar-none flex gap-[18px] overflow-x-auto pb-3"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {items.map((item, i) => {
          const hoverSrc = item.hoverSrc;
          const showAlt = !!hoverSrc && (hovered === i || (hovered === null && autoAlt));
          return (
          <Link
            key={item.number}
            href={`${localizedPath(locale, "/espaces")}#${item.slug}`}
            data-card
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ scrollSnapAlign: "start" }}
            className={`group relative aspect-[3/4] w-[min(78vw,380px)] shrink-0 overflow-hidden bg-forest-900 ${
              i === 0 ? "w-[min(84vw,440px)]" : ""
            }`}
          >
            <Image
              src={featured[item.imageKey as FeaturedKey]}
              alt={item.title}
              fill
              sizes="(min-width: 768px) 40vw, 80vw"
              className={`object-cover transition-opacity duration-700 ${
                showAlt ? "opacity-0" : "opacity-100"
              }`}
            />
            {hoverSrc && (
              <Image
                src={hoverSrc}
                alt={item.title}
                fill
                sizes="(min-width: 768px) 40vw, 80vw"
                className={`object-cover transition-opacity duration-700 ${
                  showAlt ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-forest-950/85 via-forest-950/10 to-transparent p-5">
              <span className="font-display text-sm text-bronze-400 italic">{item.number}</span>
              <span className="font-display text-xl text-sand-50">{item.title}</span>
            </div>
          </Link>
          );
        })}
      </div>
    </div>
  );
}
