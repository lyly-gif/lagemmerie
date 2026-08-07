"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroSlideshow({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((i) => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(id);
  }, [images.length]);

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
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      <div className="absolute right-6 bottom-14 z-10 flex gap-2 md:right-10 md:bottom-20">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            aria-label={`Photo ${i + 1}`}
            aria-current={i === current}
            onClick={() => setCurrent(i)}
            className={`h-[3px] w-[26px] transition-colors ${
              i === current ? "bg-bronze-400" : "bg-sand-100/35"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
