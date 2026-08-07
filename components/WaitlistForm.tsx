"use client";

import { useState } from "react";
import type { Content } from "@/lib/content";

/**
 * Stopgap capture form standing in for the real <BookingWidget /> until the
 * Amenitiz/Smoobu integration lands (cahier des charges §6) — per brief
 * priority 1, a mailto: submission is an intentional, explicitly-sanctioned
 * placeholder ("un simple POST vers Brevo/Mailchimp ou même un mailto:...
 * est suffisant"). Swap WAITLIST_EMAIL for the real address before launch,
 * and consider a proper Brevo/Mailchimp POST once volume justifies it.
 */
const WAITLIST_EMAIL = "reservations@lagemmerie.com";

export function WaitlistForm({ dict }: { dict: Content }) {
  const w = dict.rates.waitlist;
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const lines = [
      `Prénom : ${firstName || "—"}`,
      `E-mail : ${email}`,
      `Dates envisagées : ${dates || "—"}`,
      `Nombre de personnes : ${guests || "—"}`,
    ];
    const subject = encodeURIComponent("Demande d'information réservation — La Gemmerie");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${WAITLIST_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-bronze-500/40 bg-sand-200 px-8 py-10 text-center">
        <p className="font-display text-2xl text-forest-950 italic">{w.successTitle}</p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-forest-800/80">
          {w.successMessage}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-line bg-sand-200 p-8 md:p-10">
      <p className="font-display text-2xl text-forest-950 italic md:text-3xl">{w.title}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-xs tracking-[0.1em] text-forest-800/70 uppercase">
          {w.firstName}
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-line bg-sand-50 px-4 py-3 text-sm text-forest-950 normal-case focus:border-bronze-600 focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-2 text-xs tracking-[0.1em] text-forest-800/70 uppercase">
          {w.email} <span className="text-bronze-700">({w.emailRequiredNote})</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-line bg-sand-50 px-4 py-3 text-sm text-forest-950 normal-case focus:border-bronze-600 focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-2 text-xs tracking-[0.1em] text-forest-800/70 uppercase">
          {w.dates}
          <input
            type="text"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            placeholder={w.datesPlaceholder}
            className="border border-line bg-sand-50 px-4 py-3 text-sm text-forest-950 normal-case placeholder:text-forest-950/30 focus:border-bronze-600 focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-2 text-xs tracking-[0.1em] text-forest-800/70 uppercase">
          {w.guests}
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="border border-line bg-sand-50 px-4 py-3 text-sm text-forest-950 normal-case focus:border-bronze-600 focus:outline-none"
          >
            <option value="">{w.guestsPlaceholder}</option>
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10+"].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="submit"
        className="mt-8 w-full border border-bronze-600 bg-bronze-600 py-3 text-xs font-medium tracking-[0.14em] text-sand-50 uppercase transition-colors hover:bg-bronze-700 sm:w-auto sm:px-10"
      >
        {w.submit}
      </button>

      <p className="mt-4 text-xs text-forest-800/50">{w.reassurance}</p>
    </form>
  );
}
