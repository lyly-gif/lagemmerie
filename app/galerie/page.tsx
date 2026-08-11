import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Kicker";
import { Gallery } from "@/components/Gallery";
import { GallerySideNav } from "@/components/GallerySideNav";
import { getCurrentLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/content";
import { galleryCategories } from "@/lib/images";
import { createLocalizedMetadata } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n-routing";

export async function generateMetadata() {
  return createLocalizedMetadata(await getCurrentLocale(), "gallery");
}

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
        <GallerySideNav items={navItems} label={g.title} />

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
                <Gallery
                  images={category.images}
                  locale={locale}
                  context={g.categories[category.key as keyof typeof g.categories]}
                />
              </div>
              {category.subsections?.map((sub) => (
                <div key={sub.key} className="mt-10">
                  <p className="mb-4 text-xs font-medium tracking-[0.14em] text-bronze-700 uppercase">
                    {g.categories[sub.key as keyof typeof g.categories]}
                  </p>
                  <Gallery
                    images={sub.images}
                    locale={locale}
                    context={g.categories[sub.key as keyof typeof g.categories]}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-10">
        <p className="font-display text-2xl text-forest-950">{dict.home.ctaBand.title}</p>
        <Link href={localizedPath(locale, "/tarifs")} className="border border-bronze-600 bg-bronze-600 px-6 py-3 text-xs font-medium tracking-[0.12em] text-sand-50 uppercase hover:bg-bronze-700">
          {dict.home.ctaSecondary}
        </Link>
      </div>
    </section>
  );
}
import Link from "next/link";
