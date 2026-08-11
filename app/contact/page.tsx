import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Kicker";
import { getCurrentLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/content";
import { featured } from "@/lib/images";
import { createLocalizedMetadata } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n-routing";

export async function generateMetadata() {
  return createLocalizedMetadata(await getCurrentLocale(), "contact");
}

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
          <div>
            <Link
              href={localizedPath(locale, "/tarifs")}
              className="mt-6 inline-flex border border-bronze-600 bg-bronze-600 px-5 py-3 text-xs font-medium tracking-[0.12em] text-sand-50 uppercase hover:bg-bronze-700"
            >
              {dict.home.ctaSecondary}
            </Link>
          </div>
        </Reveal>
      </div>

      <Reveal delay={160}>
        <div className="relative aspect-[4/5] overflow-hidden bg-forest-900 md:sticky md:top-24">
          <Image
            src={featured["piscine-oliviers"]}
            alt={`${c.location.title} — ${dict.site.name}`}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}
