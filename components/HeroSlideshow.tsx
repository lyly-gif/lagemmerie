"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/content";

const SLIDE_MS = 5000;
// Swipe past this many pixels and it counts as a deliberate gesture, not a
// tap or scroll wobble — mirrors the threshold most native carousels use.
const SWIPE_THRESHOLD_PX = 40;

const controls: Record<Locale, { next: string }> = {
  fr: { next: "Photo suivante" },
  en: { next: "Next photo" },
  de: { next: "Nächstes Foto" },
  nl: { next: "Volgende foto" },
  es: { next: "Siguiente foto" },
};

export function HeroSlideshow({
  images,
  locale,
}: {
  images: { src: string; alt: string }[];
  locale: Locale;
}) {
  const [current, setCurrent] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const dragStartX = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // A plain setTimeout re-armed on every `current` change (rather than a
  // free-running setInterval) means a manual advance — swipe, the next
  // button — restarts the countdown instead of the auto-advance firing
  // right on top of it.
  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setTimeout(() => {
      setCurrent((i) => (i + 1) % images.length);
    }, SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [current, images.length, reducedMotion]);

  function goTo(index: number) {
    setCurrent((index + images.length) % images.length);
  }

  function handlePointerDown(e: React.PointerEvent) {
    dragStartX.current = e.clientX;
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    goTo(current + (delta < 0 ? 1 : -1));
  }

  return (
    <div
      className="absolute inset-0 touch-pan-y"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        dragStartX.current = null;
      }}
    >
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            loading={i === 0 ? "eager" : "lazy"}
            sizes="100vw"
            className="pointer-events-none object-cover"
          />
        </div>
      ))}

      {/* Swipe changes the photo; this single button does the same for
          anyone not swiping (owner: no dots, no pause — just a way to move
          on to the next photo). */}
      <button
        type="button"
        onClick={() => goTo(current + 1)}
        aria-label={controls[locale].next}
        className="absolute right-4 bottom-10 z-10 flex h-11 w-11 items-center justify-center border border-sand-100/40 text-sand-100 focus-visible:outline-2 focus-visible:outline-sand-50 md:right-8 md:bottom-16"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="h-4 w-4">
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
