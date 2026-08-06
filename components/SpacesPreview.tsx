import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { featured, type FeaturedKey } from "@/lib/images";
import type { Content } from "@/lib/content";

export function SpacesPreview({ dict }: { dict: Content }) {
  const items = dict.spaces.items;

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.slice(0, 3).map((item, i) => (
        <Reveal key={item.title} delay={i * 100}>
          <Link href="/espaces" className="group block">
            <div className="relative aspect-[3/4] overflow-hidden bg-forest-900">
              <Image
                src={featured[item.imageKey as FeaturedKey]}
                alt={item.title}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-forest-950/0 to-forest-950/0" />
              <span className="absolute top-4 left-4 font-display text-sm italic text-sand-100/80">
                {item.number}
              </span>
              <span className="absolute bottom-4 left-4 font-display text-lg text-sand-100 md:text-xl">
                {item.title}
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
