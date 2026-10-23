"use client";

import { useState, type FormEvent } from "react";
import type { Content } from "@/lib/content";

// Booking request sent by e-mail to the concierge (Séren Conciergerie).
// Replaces the former Première Vue / Hostaway calendar widget (Oct. 2026).
// No backend: the form builds a pre-filled mailto: so the request lands in
// the concierge inbox with dates and guest count already structured.
// To be swapped for a synced calendar (Airbnb iCal or a channel manager
// widget) once the concierge's tooling is confirmed.

const MAX_GUESTS = 8;

const fieldClass =
  "mt-2 block min-h-11 w-full border border-line bg-sand-50 px-3 py-2.5 text-sm text-forest-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-700";
const labelClass = "text-xs font-medium tracking-[0.14em] text-bronze-700 uppercase";

export function StayRequestForm({
  dict,
  showPartnerNote = true,
}: {
  dict: Content;
  showPartnerNote?: boolean;
}) {
  const c = dict.calendar;
  const email = dict.contact.contactEmail;
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [guests, setGuests] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().slice(0, 10);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!arrival || !departure || departure <= arrival) {
      setError(c.dateError);
      return;
    }
    if (!guests) {
      setError(c.guestError);
      return;
    }
    setError(null);

    const lines = [
      c.mailGreeting,
      "",
      c.mailIntro,
      `- ${c.arrivalLabel} : ${arrival}`,
      `- ${c.departureLabel} : ${departure}`,
      `- ${c.guestLabel} : ${guests}`,
    ];
    if (message.trim()) lines.push("", message.trim());
    if (name.trim()) lines.push("", name.trim());

    const href =
      `mailto:${email}` +
      `?subject=${encodeURIComponent(c.mailSubject)}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = href;
  }

  return (
    <div>
      <form
        onSubmit={onSubmit}
        noValidate
        className="grid gap-5 border border-line bg-sand-200 p-6 sm:grid-cols-2 md:p-8"
      >
        <label className="block">
          <span className={labelClass}>{c.arrivalLabel}</span>
          <input
            type="date"
            required
            min={today}
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className={labelClass}>{c.departureLabel}</span>
          <input
            type="date"
            required
            min={arrival || today}
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className={labelClass}>{c.guestLabel}</span>
          <select
            required
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className={fieldClass}
          >
            <option value="">{c.guestPlaceholder}</option>
            {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <span className="mt-1.5 block text-xs text-forest-800/60">{c.guestHelp}</span>
        </label>
        <label className="block">
          <span className={labelClass}>{c.nameLabel}</span>
          <input
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className={labelClass}>{c.messageLabel}</span>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${fieldClass} min-h-24`}
          />
        </label>

        <div className="sm:col-span-2">
          {error && (
            <p role="alert" className="mb-4 text-sm text-bronze-800">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center border border-bronze-600 bg-bronze-600 px-6 py-3 text-xs font-medium tracking-[0.14em] text-sand-50 uppercase transition-colors hover:bg-bronze-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-700"
          >
            {c.reserveButton}
          </button>
          <p className="mt-3 text-xs leading-relaxed text-forest-800/60">
            {c.mailHint}{" "}
            <a
              href={`mailto:${email}`}
              className="text-bronze-700 underline decoration-bronze-500/40 underline-offset-4 hover:text-bronze-800"
            >
              {email}
            </a>
          </p>
        </div>
      </form>
      {showPartnerNote && (
        <p className="mt-5 max-w-2xl text-[13px] leading-relaxed text-forest-800/65">
          {c.partnerNote}
        </p>
      )}
    </div>
  );
}
