"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type GalleryImage = { src: string; alt: string; width: number; height: number };

const SWIPE_THRESHOLD = 50;

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
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
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
      {/* True masonry via CSS columns: each tile keeps its real aspect
          ratio and packs against its shortest neighbor, instead of a fixed
          grid forcing empty gaps under shorter images in the same row. */}
      <div className="columns-2 gap-3 md:columns-3 md:gap-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative mb-3 block w-full overflow-hidden bg-forest-900 md:mb-4"
            style={{ breakInside: "avoid" }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(min-width: 768px) 33vw, 50vw"
              className="block w-full transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-forest-950/0 transition-colors group-hover:bg-forest-950/10" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-950/95 p-4 md:p-10"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Fermer"
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
            aria-label="Précédent"
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
              alt={images[openIndex].alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            type="button"
            aria-label="Suivant"
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
