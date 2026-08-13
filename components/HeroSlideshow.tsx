"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/content";

const SLIDE_MS = 5000;
// Swipe past this many pixels and it counts as a deliberate gesture, not a
// tap or scroll wobble — mirrors the threshold most native carousels use.
const SWIPE_THRESHOLD_PX = 40;

const controls: Record<Locale, { photo: string; pause: string; play: string }> = {
  fr: { photo: "Photo", pause: "Mettre le diaporama en pause", play: "Relancer le diaporama" },
  en: { photo: "Photo", pause: "Pause slideshow", play: "Play slideshow" },
  de: { photo: "Foto", pause: "Diashow anhalten", play: "Diashow fortsetzen" },
  nl: { photo: "Foto", pause: "Diavoorstelling pauzeren", play: "Diavoorstelling hervatten" },
  es: { photo: "Foto", pause: "Pausar presentación", play: "Reanudar presentación" },
};

export function HeroSlideshow({
  images,
  locale,
}: {
  images: { src: string; alt: string }[];
  locale: Locale;
}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
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
  // free-running setInterval) keeps the auto-advance perfectly in sync with
  // the progress bar's animation below — both restart from zero the moment
  // a slide changes, whether that change came from the timer, a swipe, or a
  // tap on a segment.
  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = window.setTimeout(() => {
      setCurrent((i) => (i + 1) % images.length);
    }, SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [current, images.length, paused, reducedMotion]);

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

      {/* Swipe changes the photo; this small dot row just marks where you
          are and lets you jump straight to a photo (owner: wanted a small
          symbol at the bottom instead of a bar up top). */}
      <div className="absolute right-4 bottom-10 z-10 flex items-center gap-2.5 md:right-8 md:bottom-16">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            aria-label={`${controls[locale].photo} ${i + 1}`}
            aria-current={i === current}
            onClick={() => goTo(i)}
            className="flex h-11 w-8 items-center justify-center focus-visible:outline-2 focus-visible:outline-sand-50"
          >
            <span
              className={`rounded-full transition-all duration-300 ${
                i === current ? "h-2 w-2 bg-sand-100" : "h-[6px] w-[6px] bg-sand-100/40"
              }`}
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? controls[locale].play : controls[locale].pause}
          className="ml-1 flex h-11 w-11 items-center justify-center border border-sand-100/40 text-sm text-sand-100 focus-visible:outline-2 focus-visible:outline-sand-50"
        >
          {paused ? "▶" : "Ⅱ"}
        </button>
      </div>
    </div>
  );
}
