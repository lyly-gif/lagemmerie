import type { Content } from "@/lib/content";

/**
 * Deliberately decoupled from any availability/payment logic (cahier des
 * charges §6): once the Conciergerie Première Vue confirms its channel
 * manager (Amenitiz, Smoobu, …), swap the placeholder below for that
 * provider's embed/iframe or a server-side API integration.
 */
export function BookingWidget({ dict }: { dict: Content }) {
  return (
    <div className="grain border border-line bg-forest-950 p-8 text-sand-100 md:p-12">
      <p className="font-display text-2xl italic md:text-3xl">{dict.rates.bookingTitle}</p>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-sand-100/70">
        {dict.rates.bookingDescription}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="border border-sand-100/15 px-4 py-3">
          <p className="text-[10px] tracking-[0.18em] text-sand-100/40 uppercase">Arrivée</p>
          <p className="mt-1 text-sand-100/30">— à connecter —</p>
        </div>
        <div className="border border-sand-100/15 px-4 py-3">
          <p className="text-[10px] tracking-[0.18em] text-sand-100/40 uppercase">Départ</p>
          <p className="mt-1 text-sand-100/30">— à connecter —</p>
        </div>
      </div>

      <button
        type="button"
        disabled
        className="mt-8 w-full cursor-not-allowed border border-bronze-500/40 py-3 text-xs font-medium tracking-[0.14em] text-bronze-400/60 uppercase sm:w-auto sm:px-10"
      >
        Module de réservation à venir
      </button>
    </div>
  );
}
