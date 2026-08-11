"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/content";

type GalleryImage = { src: string; alt: string; width: number; height: number };

const SWIPE_THRESHOLD = 50;
const galleryLabels: Record<Locale, { close: string; previous: string; next: string; dialog: string; view: string }> = {
  fr: { close: "Fermer", previous: "Précédent", next: "Suivant", dialog: "Visionneuse photo", view: "vue" },
  en: { close: "Close", previous: "Previous", next: "Next", dialog: "Photo viewer", view: "view" },
  de: { close: "Schließen", previous: "Zurück", next: "Weiter", dialog: "Fotogalerie", view: "Ansicht" },
  nl: { close: "Sluiten", previous: "Vorige", next: "Volgende", dialog: "Fotoviewer", view: "beeld" },
  es: { close: "Cerrar", previous: "Anterior", next: "Siguiente", dialog: "Visor de fotos", view: "vista" },
};

export function Gallery({ images, locale, context }: { images: GalleryImage[]; locale: Locale; context?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const labels = galleryLabels[locale];

  const close = useCallback(() => {
    setOpenIndex(null);
    requestAnimationFrame(() => returnFocusRef.current?.focus());
  }, []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeButtonRef.current?.focus());
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button, [href], [tabindex]:not([tabindex='-1'])");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, next, prev]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta < 0) next();
      else prev();
    }
    touchStartX.current = null;
  }

  return (
    <>
      {/* Every tile shares the same wide ratio via object-cover — a single
          harmonious rhythm rather than a jagged mix of portrait/landscape
          spans (reference: Le Collectionist's property galleries). */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={(event) => {
              returnFocusRef.current = event.currentTarget;
              setOpenIndex(i);
            }}
            aria-label={`${context ?? img.alt}, ${labels.view} ${i + 1}`}
            className="group relative block aspect-[3/2] w-full overflow-hidden bg-forest-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-600"
          >
            <Image
              src={img.src}
              alt={context ? `${context} — ${labels.view} ${i + 1}, La Gemmerie` : img.alt}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-forest-950/0 transition-colors group-hover:bg-forest-950/10" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${labels.dialog} — ${context ?? "La Gemmerie"}`}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-950/95 p-4 md:p-10"
          onClick={close}
        >
          <button
            ref={closeButtonRef}
            type="button"
            aria-label={labels.close}
            onClick={close}
            className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center text-2xl text-sand-100/70 hover:text-sand-100"
          >
            ✕
          </button>

          <p className="absolute top-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.14em] text-sand-100/60">
            {openIndex + 1} / {images.length}
          </p>

          <button
            type="button"
            aria-label={labels.previous}
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-1 flex h-11 w-11 items-center justify-center text-3xl text-sand-100/50 hover:text-sand-100 md:left-6"
          >
            ‹
          </button>

          <div
            className="relative h-[80vh] w-full max-w-4xl touch-pan-y"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <Image
              src={images[openIndex].src}
              alt={context ? `${context} — ${labels.view} ${openIndex + 1}, La Gemmerie` : images[openIndex].alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            type="button"
            aria-label={labels.next}
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-1 flex h-11 w-11 items-center justify-center text-3xl text-sand-100/50 hover:text-sand-100 md:right-6"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
