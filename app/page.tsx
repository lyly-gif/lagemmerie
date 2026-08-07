import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Kicker";
import { SpacesPreview } from "@/components/SpacesPreview";
import { getCurrentLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/content";
import { featured } from "@/lib/images";

export const metadata: Metadata = {
  // Absolute: bypasses the "%s — La Gemmerie" template so the brand name
  // leads on the homepage specifically (SEO mapping, tarifs-et-seo-la-gemmerie.md §2).
  title: { absolute: "La Gemmerie — Maison de vacances avec piscine chauffée à Labenne-Océan" },
  description:
    "Maison landaise 10 personnes avec piscine chauffée à Labenne-Océan (Landes). Quiet luxury, 5 espaces de vie, réservation en direct.",
};

export default async function HomePage() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  return (
    <>
      {/* Hero — cahier des charges: shot to be replaced with the night-lit
          pool photo once produced (§3, "photo nocturne piscine à produire") */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-forest-950">
        <Image
          src={featured["hero-piscine-jour"]}
          alt="Piscine chauffée et terrasse en bois de La Gemmerie, Labenne-Océan"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/25 to-forest-950/10" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-24">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.28em] text-sand-100/70 uppercase">
              {dict.home.kicker}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="text-balance mt-5 max-w-3xl font-display text-4xl leading-[1.08] text-sand-100 md:text-6xl">
              {dict.home.title}
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="text-balance mt-6 max-w-lg text-base leading-relaxed text-sand-100/75 md:text-lg">
              {dict.home.subtitle}
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/la-maison"
                className="border border-sand-100/40 px-6 py-3 text-xs font-medium tracking-[0.14em] text-sand-100 uppercase transition-colors hover:border-sand-100 hover:bg-sand-100 hover:text-forest-950"
              >
                {dict.home.ctaPrimary}
              </Link>
              <Link
                href="/tarifs"
                className="border border-bronze-500 bg-bronze-600 px-6 py-3 text-xs font-medium tracking-[0.14em] text-sand-50 uppercase transition-colors hover:bg-bronze-700"
              >
                {dict.home.ctaSecondary}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Manifesto — the name */}
      <section className="mx-auto max-w-4xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <Kicker>{dict.home.manifesto.kicker}</Kicker>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 font-display text-4xl italic text-forest-950 md:text-5xl">
            {dict.home.manifesto.title}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-10">
          {dict.home.manifesto.paragraphs.map((p, i) => (
            <Reveal key={p} delay={160 + i * 100}>
              <p className="text-balance font-display text-lg leading-relaxed text-forest-800 italic md:text-xl">
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Facts band */}
      <section className="grain border-y border-line/60 bg-forest-950 py-16 text-sand-100">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4 md:px-10">
          {dict.house.facts.map((fact, i) => (
            <Reveal key={fact.label} delay={i * 80}>
              <p className="font-display text-3xl text-bronze-400 italic md:text-4xl">
                {fact.value}
              </p>
              <p className="mt-2 text-xs tracking-[0.14em] text-sand-100/50 uppercase">
                {fact.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5 spaces preview */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <Kicker>{dict.home.spacesPreview.kicker}</Kicker>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-4xl text-forest-950 md:text-5xl">
                {dict.home.spacesPreview.title}
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 leading-relaxed text-forest-800/80">
                {dict.home.spacesPreview.intro}
              </p>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <Link
              href="/espaces"
              className="w-fit shrink-0 text-xs font-medium tracking-[0.14em] text-bronze-700 uppercase underline decoration-bronze-500/40 underline-offset-8 hover:text-bronze-800"
            >
              {dict.home.spacesPreview.cta}
            </Link>
          </Reveal>
        </div>

        <div className="mt-14">
          <SpacesPreview dict={dict} />
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-5xl px-6 pb-24 md:px-10 md:pb-32">
        <Reveal>
          <div className="grain flex flex-col items-start justify-between gap-8 border border-line bg-sand-200 p-10 md:flex-row md:items-center md:p-14">
            <p className="text-balance max-w-md font-display text-2xl text-forest-950 md:text-3xl">
              {dict.home.ctaBand.title}
            </p>
            <Link
              href="/tarifs"
              className="shrink-0 border border-bronze-600 bg-bronze-600 px-7 py-3 text-xs font-medium tracking-[0.14em] text-sand-50 uppercase transition-colors hover:bg-bronze-700"
            >
              {dict.home.ctaBand.cta}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
