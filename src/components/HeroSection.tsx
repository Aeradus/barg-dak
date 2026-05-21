/**
 * Agent C: Full-screen hero section with headline, sub-copy, dual CTAs and
 * a stats bar. Orange radial gradient gives an energetic premium feel.
 */

import { useContactStore } from "../store/contactStore";
import { useLanguage } from "../i18n/language";

const COPY = {
  nl: {
    aria: "Welkom",
    liveNow: "Nu bereikbaar",
    headingTop: "Uw Dakspecialist",
    headingIn: "in",
    sub: "Vakkundige dakdekkers voor reparatie, onderhoud en volledige dakrenovatie. Dag en nacht bereikbaar voor spoedreparaties in heel Zuid-Holland.",
    callDirect: "Bel Direct",
    services: "Onze Diensten",
    stats: {
      rating: "Google rating",
      available: "Bereikbaar",
      experience: "Jaar ervaring",
    },
  },
  en: {
    aria: "Welcome",
    liveNow: "Available now",
    headingTop: "Your Roofing Specialist",
    headingIn: "in",
    sub: "Expert roofers for repairs, maintenance, and complete roof renovations. Available day and night for emergency repairs across South Holland.",
    callDirect: "Call Directly",
    services: "Our Services",
    stats: {
      rating: "Google rating",
      available: "Available",
      experience: "Years experience",
    },
  },
} as const;

function PhoneIcon(): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-5 shrink-0"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 16.352V17.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronDownIcon(): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function StatItem({
  value,
  label,
}: {
  value: string;
  label: string;
}): React.ReactElement {
  return (
    <div className="flex flex-col items-center gap-1 px-4 py-5">
      <span className="text-xl font-bold text-white">{value}</span>
      <span className="text-xs uppercase tracking-wider text-slate-400">
        {label}
      </span>
    </div>
  );
}

export default function HeroSection(): React.ReactElement {
  const { phone, city } = useContactStore((s) => s.contact);
  const { language } = useLanguage();
  const copy = COPY[language];
  const tel = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <section
      id="hero"
      aria-label={copy.aria}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center"
      style={{
        background:
          "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(249,115,22,0.18) 0%, #0f172a 65%)",
      }}
    >
      {/* Live status badge */}
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-400">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />
        {copy.liveNow} · {city}
      </div>

      {/* Headline */}
      <h1 className="mb-6 max-w-4xl text-5xl font-black leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
        {copy.headingTop}
        <br />
        <span className="text-orange-500">
          {copy.headingIn} {city}
        </span>
      </h1>

      {/* Sub-copy */}
      <p className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
        {copy.sub}
      </p>

      {/* CTAs */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <a
          href={tel}
          className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-orange-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:-translate-y-0.5 hover:bg-orange-600 active:translate-y-0"
        >
          <PhoneIcon />
          {copy.callDirect}: {phone}
        </a>
        <a
          href="#diensten"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-8 py-4 text-base font-semibold text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-800 hover:text-white"
        >
          {copy.services}
          <ChevronDownIcon />
        </a>
      </div>

      {/* Stats bar */}
      <div className="mt-16 grid w-full max-w-md grid-cols-3 divide-x divide-slate-700/60 overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm">
        <StatItem value="5.0 ★" label={copy.stats.rating} />
        <StatItem value="24/7" label={copy.stats.available} />
        <StatItem value="15+" label={copy.stats.experience} />
      </div>
    </section>
  );
}
