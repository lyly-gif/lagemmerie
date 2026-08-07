import Image from "next/image";

export function PhotoBanner({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-1 md:h-[260px] md:grid-cols-[1.4fr_1fr_1fr]">
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`group relative aspect-[3/4] overflow-hidden bg-forest-900 md:aspect-auto ${
            i === 0 ? "col-span-2 aspect-[16/9] md:col-span-1 md:aspect-auto" : ""
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
          />
        </div>
      ))}
    </div>
  );
}
