"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export function Gallery({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className={`group relative aspect-[4/5] overflow-hidden bg-forest-900 ${
              i % 7 === 0 ? "md:col-span-2 md:row-span-2 md:aspect-square" : ""
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
            className="absolute top-6 right-6 text-2xl text-sand-100/70 hover:text-sand-100"
          >
            ✕
          </button>
          <button
            type="button"
            aria-label="Précédent"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 text-3xl text-sand-100/50 hover:text-sand-100 md:left-8"
          >
            ‹
          </button>
          <div
            className="relative h-[80vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
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
            className="absolute right-3 text-3xl text-sand-100/50 hover:text-sand-100 md:right-8"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
