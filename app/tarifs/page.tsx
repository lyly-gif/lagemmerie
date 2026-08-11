import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Kicker } from "@/components/Kicker";
import { HostawayCalendarWidget } from "@/components/HostawayCalendarWidget";
import { getCurrentLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/content";
import { featured } from "@/lib/images";
import { createLocalizedMetadata } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n-routing";

export async function generateMetadata() {
  return createLocalizedMetadata(await getCurrentLocale(), "rates");
}

export default async function TarifsPage() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);
  const r = dict.rates;
  const w = r.whyBookDirect;

  return (
    <section className="mx-auto max-w-5xl px-6 pt-16 pb-24 md:px-10 md:pt-20 md:pb-32">
      <Reveal>
        <Kicker>{r.kicker}</Kicker>
      </Reveal>
      <Reveal delay={100}>
        <h1 className="mt-6 font-display text-4xl text-forest-950 md:text-6xl">{r.title}</h1>
      </Reveal>
      <Reveal delay={200}>
        <p className="text-balance mt-6 max-w-xl leading-relaxed text-forest-800/80">{r.intro}</p>
      </Reveal>

      <Reveal delay={280} className="mt-10">
        <p className="mb-6 max-w-md text-sm leading-relaxed text-forest-800/80">
          {r.calendarIntro}
        </p>
        <HostawayCalendarWidget
          locale={locale}
          reserveButtonText={dict.calendar.reserveButton}
          clearButtonText={dict.calendar.clearButton}
          loadingText={dict.calendar.loadingText}
          partnerNote={dict.calendar.partnerNote}
        />
      </Reveal>

      <Reveal className="mt-16">
        <div className="border border-line bg-sand-200/60 p-7 md:p-9">
          <Kicker>{r.bookingJourney.kicker}</Kicker>
          <h2 className="mt-4 font-display text-2xl text-forest-950 md:text-3xl">
            {r.bookingJourney.title}
          </h2>
          <ol className="mt-7 grid gap-6 md:grid-cols-3">
            {r.bookingJourney.steps.map((step, index) => (
              <li key={step} className="flex gap-4 text-sm leading-relaxed text-forest-800/80">
                <span className="font-display text-xl text-bronze-700 italic">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-7 border-t border-line pt-5 text-xs leading-relaxed text-forest-800/65">
            {r.bookingJourney.terms}
          </p>
        </div>
      </Reveal>

      {/* Pourquoi réserver en direct */}
      <div className="mt-20 grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
        <Reveal>
          <Kicker>{w.kicker}</Kicker>
          <p className="mt-5 font-display text-2xl text-forest-950 md:text-3xl">{w.title}</p>
          <ul className="mt-6 flex flex-col gap-4">
            {w.items.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-forest-800/80">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-bronze-600" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <div className="relative aspect-[4/5] overflow-hidden bg-forest-900">
            <Image
              src={featured["rituel-accueil"]}
              alt={`${w.kicker} — ${dict.site.name}`}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-20">
        <p className="text-sm text-forest-800/70">
          {r.footerNote}{" "}
          <Link
            href={localizedPath(locale, "/contact")}
            className="text-bronze-700 underline decoration-bronze-500/40 underline-offset-4 hover:text-bronze-800"
          >
            {r.footerCta}
          </Link>
        </p>
      </Reveal>
    </section>
  );
}
