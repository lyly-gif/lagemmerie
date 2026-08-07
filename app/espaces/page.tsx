import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Kicker";
import { getCurrentLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/content";
import { featured, type FeaturedKey } from "@/lib/images";

const title = "Grande maison pour plusieurs familles dans les Landes";
const description =
  "5 espaces de vie pensés pour recevoir plusieurs familles ou un groupe d'amis en toute intimité, à Labenne-Océan (Landes).";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { title, description },
};

export default async function EspacesPage() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);
  const s = dict.spaces;
  const [signature, ...rest] = s.items;

  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-16 md:px-10 md:pt-28 md:pb-20">
        <Reveal>
          <Kicker>{s.kicker}</Kicker>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-6 font-display text-4xl text-forest-950 md:text-6xl">{s.title}</h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="text-balance mt-6 max-w-2xl leading-relaxed text-forest-800/80 md:text-lg">
            {s.intro}
          </p>
        </Reveal>
      </section>

      {/* Signature space — full-bleed treatment, deliberately not part of the
          grid rhythm below: THE differentiator, not item 1 of 5. */}
      <Reveal className="relative flex min-h-[70vh] items-end overflow-hidden bg-forest-950">
        <Image
          src={featured[signature.imageKey as FeaturedKey]}
          alt={signature.title}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/25 to-forest-950/10" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 md:px-10 md:pb-20">
          <p className="font-display text-6xl text-bronze-400/70 italic md:text-7xl">
            {signature.number}
          </p>
          <h2 className="mt-4 font-display text-3xl text-sand-100 md:text-5xl">
            {signature.title}
          </h2>
          <p className="text-balance mt-5 max-w-lg leading-relaxed text-sand-100/80">
            {signature.description}
          </p>
        </div>
      </Reveal>

      <div>
        {rest.map((item, i) => {
          const reversed = i % 2 === 1;
          return (
            <section
              key={item.number}
              className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:gap-16 md:px-10 md:py-20"
            >
              <Reveal className={reversed ? "md:order-2" : "order-2 md:order-1"}>
                <p className="font-display text-6xl text-bronze-500/50 italic md:text-7xl">
                  {item.number}
                </p>
                <h2 className="mt-4 font-display text-3xl text-forest-950 md:text-4xl">
                  {item.title}
                </h2>
                <p className="mt-5 max-w-md leading-relaxed text-forest-800/80">
                  {item.description}
                </p>
              </Reveal>
              <Reveal
                delay={120}
                className={reversed ? "md:order-1" : "order-1 md:order-2"}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-forest-900">
                  <Image
                    src={featured[item.imageKey as FeaturedKey]}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </section>
          );
        })}
      </div>
    </>
  );
}
