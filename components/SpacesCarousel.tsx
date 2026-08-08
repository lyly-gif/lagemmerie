"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { featured, type FeaturedKey } from "@/lib/images";

const AUTO_CROSSFADE_MS = 3200;

type SpaceItem = {
  number: string;
  slug: string;
  title: string;
  imageKey: string;
  galleryNumbers: number[];
};

export function SpacesCarousel({
  items,
  differentiatorTag,
}: {
  items: SpaceItem[];
  differentiatorTag: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  // Hover alone never shows the second photo on touch devices — there is no
  // hover there — so every card also crossfades on its own timer. A hover
  // still forces the alt photo immediately for mouse users.
  const [autoAlt, setAutoAlt] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setAutoAlt((v) => !v), AUTO_CROSSFADE_MS);
    return () => clearInterval(id);
  }, []);

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
          aria-label="Précédent"
          onClick={() => scrollByCard(-1)}
          className="flex h-[42px] w-[42px] items-center justify-center border border-bronze-500 text-bronze-700 transition-colors hover:bg-bronze-600 hover:text-sand-50"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Suivant"
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
          // galleryNumbers[0] is frequently the exact same photo as the
          // "featured" image already shown as the base (that's usually how
          // the featured shot was chosen in the first place) — swapping a
          // photo for an identical copy of itself reads as "nothing
          // happened". [1] is reliably a different shot.
          const hoverNumber = item.galleryNumbers?.[1] ?? item.galleryNumbers?.[0];
          const hoverSrc = hoverNumber
            ? `/images/gallery/${String(hoverNumber).padStart(2, "0")}.jpg`
            : null;
          const showAlt = !!hoverSrc && (hovered === i || (hovered === null && autoAlt));
          return (
          <Link
            key={item.number}
            href={`/espaces#${item.slug}`}
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
            {i === 0 && (
              <span className="absolute top-4 left-4 bg-bronze-600 px-2.5 py-1.5 text-[10px] tracking-[0.1em] text-sand-50 uppercase">
                {differentiatorTag}
              </span>
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
