import Image from "next/image";

export function PhotoBanner({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  return (
    <div
      className="scrollbar-none flex gap-1 overflow-x-auto md:grid md:h-[260px] md:grid-cols-[1.4fr_1fr_1fr] md:overflow-visible"
      style={{ scrollSnapType: "x mandatory" }}
    >
      {images.map((img) => (
        <div
          key={img.src}
          className="group relative aspect-[4/5] w-[min(78vw,380px)] shrink-0 overflow-hidden bg-forest-900 md:aspect-auto md:w-auto md:shrink"
          style={{ scrollSnapAlign: "start" }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 768px) 33vw, 78vw"
            className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
          />
        </div>
      ))}
    </div>
  );
}
