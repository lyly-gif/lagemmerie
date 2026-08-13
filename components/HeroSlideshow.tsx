"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/content";

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

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = setInterval(() => {
      setCurrent((i) => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(id);
  }, [images.length, paused, reducedMotion]);

  return (
    <div className="absolute inset-0">
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
            className="object-cover"
          />
        </div>
      ))}

      <div className="absolute right-4 bottom-10 z-10 flex items-center gap-2 md:right-8 md:bottom-16 md:gap-1">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            aria-label={`${controls[locale].photo} ${i + 1}`}
            aria-current={i === current}
            onClick={() => setCurrent(i)}
            className="flex h-11 w-11 items-center justify-center focus-visible:outline-2 focus-visible:outline-sand-50 md:w-10"
          >
            <span className={`h-1 w-8 transition-colors md:h-[3px] md:w-[26px] ${i === current ? "bg-bronze-400" : "bg-sand-100/35"}`} />
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
