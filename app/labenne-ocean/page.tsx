import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Kicker";
import { PhotoBanner } from "@/components/PhotoBanner";
import { LineIcon, type IconName } from "@/components/icons/LineIcon";
import { getCurrentLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/content";
import { featured } from "@/lib/images";

const title = "Labenne-Océan : plage, activités et environnement";
const description =
  "La plage centrale de Labenne-Océan à 400 m, ses activités (surf, vélo, nature) et sa position dans les Landes — l'environnement de La Gemmerie.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { title, description },
};

const bannerImages = [
  {
    src: featured["labenne-ocean-plage-dunes"],
    alt: "Vue aérienne de la plage et des dunes de Labenne-Océan",
  },
  {
    src: featured["labenne-ocean-plage-coucher-soleil-clotures"],
    alt: "Coucher de soleil sur la plage de Labenne-Océan, ganivelles des dunes",
  },
  {
    src: featured["labenne-ocean-plage-coucher-soleil-vagues"],
    alt: "Vagues et reflets au coucher de soleil, plage de Labenne-Océan",
  },
];

export default async function LabenneOceanPage() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);
  const l = dict.labenneOcean;

  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-16 md:px-10 md:pt-28 md:pb-20">
        <Reveal>
          <Kicker>{l.kicker}</Kicker>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-6 font-display text-4xl text-forest-950 md:text-6xl">{l.title}</h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-balance mt-6 max-w-2xl leading-relaxed text-forest-800/80 md:text-lg">
            {l.intro}
          </p>
        </Reveal>
      </section>

      <PhotoBanner images={bannerImages} />

      {/* La plage à 400 m — bande forest-950, même famille visuelle que la
          bande stats de /espaces (owner brief: distance déjà validée). */}
      <section className="border-y border-line/60 bg-forest-950 px-6 py-16 text-sand-100 md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Kicker tone="sand">{l.beach.kicker}</Kicker>
            <h2 className="mt-3.5 max-w-xl font-display text-3xl md:text-4xl">
              {l.beach.title}
            </h2>
            <p className="text-balance mt-5 max-w-2xl leading-relaxed text-sand-100/75">
              {l.beach.intro}
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-10 grid gap-8 md:grid-cols-2">
            {l.beach.facts.map((fact: { title: string; description: string }) => (
              <div key={fact.title} className="border-t border-sand-100/15 pt-5">
                <p className="font-display text-xl text-bronze-400">{fact.title}</p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-sand-100/70">
                  {fact.description}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Activités & loisirs — même logique icône + label que la grille
          équipements, avec une description courte en plus par carte. */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <Reveal>
          <Kicker>{l.activities.kicker}</Kicker>
          <h2 className="mt-3.5 max-w-xl font-display text-3xl text-forest-950 md:text-4xl">
            {l.activities.title}
          </h2>
          <p className="text-balance mt-5 max-w-2xl leading-relaxed text-forest-800/80">
            {l.activities.intro}
          </p>
        </Reveal>
        <Reveal delay={120} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {l.activities.items.map((item: { icon: string; title: string; description: string }) => (
            <div key={item.title} className="flex flex-col gap-3 border border-line p-6">
              <LineIcon name={item.icon as IconName} className="h-7 w-7 text-bronze-600" />
              <p className="font-display text-lg text-forest-950">{item.title}</p>
              <p className="text-sm leading-relaxed text-forest-800/70">{item.description}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Dans la région — même traitement que la bande stats de la home. */}
      <section className="border-y border-line/60 bg-sand-200 py-10">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <Kicker>{l.region.kicker}</Kicker>
            <h2 className="mt-3.5 font-display text-2xl text-forest-950 md:text-3xl">
              {l.region.title}
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {l.region.facts.map((fact: { value: string; label: string }) => (
              <div key={fact.label}>
                <p className="font-display text-2xl text-bronze-700 italic md:text-3xl">
                  {fact.value}
                </p>
                <p className="mt-1 text-xs tracking-[0.1em] text-forest-800/60 uppercase">
                  {fact.label}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="grain flex flex-col items-start justify-between gap-8 border border-line bg-sand-200 p-10 md:flex-row md:items-center md:p-14">
            <p className="text-balance max-w-md font-display text-2xl text-forest-950 md:text-3xl">
              {l.cta.title}
            </p>
            <Link
              href="/tarifs"
              className="shrink-0 border border-bronze-600 bg-bronze-600 px-7 py-3 text-xs font-medium tracking-[0.14em] text-sand-50 uppercase transition-colors hover:bg-bronze-700"
            >
              {dict.home.ctaSecondary}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
