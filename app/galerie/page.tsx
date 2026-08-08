import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Kicker";
import { Gallery } from "@/components/Gallery";
import { GallerySideNav } from "@/components/GallerySideNav";
import { getCurrentLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/content";
import { galleryCategories } from "@/lib/images";

const title = "Galerie photo — La Gemmerie, Labenne-Océan";
const description =
  "La maison landaise et le pool house de La Gemmerie en images — Labenne-Océan, Landes.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { title, description },
};

export default async function GaleriePage() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);
  const g = dict.gallery;
  const navItems = galleryCategories.map((category) => ({
    key: category.key,
    label: g.categories[category.key as keyof typeof g.categories],
  }));

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

      <div className="mt-14 md:flex md:items-start md:gap-16">
        <GallerySideNav items={navItems} />

        <div className="flex flex-1 flex-col gap-16">
          {galleryCategories.map((category, i) => (
            <div key={category.key} id={category.key} className="scroll-mt-28">
              <Reveal>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-sm text-bronze-600 italic">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-2xl text-forest-950 md:text-3xl">
                    {g.categories[category.key as keyof typeof g.categories]}
                  </h2>
                </div>
              </Reveal>
              <div className="mt-6">
                <Gallery images={category.images} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Reveal className="mt-14">
        <div className="border border-bronze-500/30 bg-sand-200 px-6 py-5 text-sm text-forest-800/80">
          {g.note}
        </div>
      </Reveal>
    </section>
  );
}
