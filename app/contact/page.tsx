import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Kicker";
import { getCurrentLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/content";
import { featured } from "@/lib/images";

const title = "Contact & accès — La Gemmerie, Labenne-Océan";
const description =
  "Comment rejoindre La Gemmerie à Labenne-Océan (Landes) : accès, distance à la plage, contact direct.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
  twitter: { title, description },
};

export default async function ContactPage() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);
  const c = dict.contact;

  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 pt-20 pb-24 md:grid-cols-2 md:px-10 md:pt-28 md:pb-32">
      <div>
        <Reveal>
          <Kicker>{c.kicker}</Kicker>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-6 font-display text-4xl text-forest-950 md:text-6xl">{c.title}</h1>
        </Reveal>

        <Reveal delay={200} className="mt-12">
          <h2 className="font-display text-2xl text-forest-950 italic">{c.location.title}</h2>
          <p className="mt-3 leading-relaxed text-forest-800/80">{c.location.description}</p>
          <p className="mt-2 font-display text-lg text-bronze-700 italic">
            {c.location.beachDistance}
          </p>
        </Reveal>

        <Reveal delay={280} className="mt-10">
          <h2 className="font-display text-2xl text-forest-950 italic">{c.access.title}</h2>
          <p className="mt-3 leading-relaxed text-forest-800/80">{c.access.description}</p>
        </Reveal>

        <Reveal delay={360} className="mt-10">
          <h2 className="font-display text-2xl text-forest-950 italic">{c.contactTitle}</h2>
          <p className="mt-3 leading-relaxed text-forest-800/80">{c.contactDescription}</p>
          <a
            href={`mailto:${c.contactEmail}`}
            className="mt-3 inline-block text-bronze-700 underline decoration-bronze-500/40 underline-offset-4 hover:text-bronze-800"
          >
            {c.contactEmail}
          </a>
        </Reveal>
      </div>

      <Reveal delay={160}>
        <div className="relative aspect-[4/5] overflow-hidden bg-forest-900 md:sticky md:top-24">
          <Image
            src={featured["piscine-oliviers"]}
            alt="Jardin et terrasse de La Gemmerie, Labenne-Océan"
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}
