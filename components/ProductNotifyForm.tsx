"use client";

import { useState } from "react";
import type { Content } from "@/lib/content";

// Same mailto stopgap as WaitlistForm, scoped to product-launch interest
// rather than stay dates (audit-complet-la-gemmerie.md §1).
const NOTIFY_EMAIL = "contact@lagemmerie.com";

export function ProductNotifyForm({ dict }: { dict: Content }) {
  const n = dict.shop.notify;
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("Être averti·e — La Gemmerie côté produits");
    const body = encodeURIComponent(`E-mail : ${email}`);
    window.location.href = `mailto:${NOTIFY_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-bronze-500/40 bg-sand-200 px-8 py-8 text-center">
        <p className="font-display text-xl text-forest-950 italic">{n.successTitle}</p>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-forest-800/80">
          {n.successMessage}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 border border-line bg-sand-200 p-6 sm:flex-row sm:items-end"
    >
      <label className="flex flex-1 flex-col gap-2 text-xs tracking-[0.1em] text-forest-800/70 uppercase">
        {n.emailLabel}
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-line bg-sand-50 px-4 py-3 text-sm text-forest-950 normal-case focus:border-bronze-600 focus:outline-none"
        />
      </label>
      <button
        type="submit"
        className="border border-bronze-600 bg-bronze-600 px-6 py-3 text-xs font-medium tracking-[0.14em] text-sand-50 uppercase transition-colors hover:bg-bronze-700"
      >
        {n.submit}
      </button>
      <p className="basis-full text-xs text-forest-800/50">{n.reassurance}</p>
    </form>
  );
}
