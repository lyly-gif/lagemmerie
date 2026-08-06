import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Kicker";
import { Gallery } from "@/components/Gallery";
import { getCurrentLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/content";
import { galleryImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "La maison landaise et le pool house de La Gemmerie en images — Labenne-Océan, Landes.",
};

export default async function GaleriePage() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);
  const g = dict.gallery;

  return (
    <section className="mx-auto max-w-7xl px-6 pt-20 pb-24 md:px-10 md:pt-28 md:pb-32">
      <Reveal>
        <Kicker>{g.kicker}</Kicker>
      </Reveal>
      <Reveal delay={100}>
        <h1 className="mt-6 font-display text-4xl text-forest-950 md:text-6xl">{g.title}</h1>
      </Reveal>
      <Reveal delay={200}>
        <p className="text-balance mt-6 max-w-xl leading-relaxed text-forest-800/80">
          {g.intro}
        </p>
      </Reveal>

      <div className="mt-14">
        <Gallery images={galleryImages} />
      </div>

      <Reveal className="mt-14">
        <div className="border border-bronze-500/30 bg-sand-200 px-6 py-5 text-sm text-forest-800/80">
          {g.note}
        </div>
      </Reveal>
    </section>
  );
}
