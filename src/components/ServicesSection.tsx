/**
 * Agent C: Three-card services grid highlighting Barg Dak's core offering.
 */

import { useLanguage } from "../i18n/language";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactElement;
}

function ClockIcon(): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

function ShieldCheckIcon(): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
      />
    </svg>
  );
}

function MapPinIcon(): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  );
}

const COPY = {
  nl: {
    aria: "Onze Diensten",
    eyebrow: "Onze Diensten",
    heading: "Alles voor uw dak, altijd",
    intro:
      "Van spoedklus tot grootschalig project — wij regelen het vakkundig en op tijd.",
    services: [
      {
        id: "emergency",
        title: "24/7 Nooddienst",
        description:
          "Dakschade kan altijd op het verkeerde moment slaan. Wij zijn dag en nacht bereikbaar voor spoedgevallen — geen wachtrij, geen uitstel. Wij komen direct.",
        icon: <ClockIcon />,
      },
      {
        id: "roofing",
        title: "Dakdekken & Onderhoud",
        description:
          "Van plat dak tot pannendak: wij voeren alle dakwerkzaamheden uit. Reparatie, volledige vervanging, isolatie en preventief onderhoud voor de lange termijn.",
        icon: <ShieldCheckIcon />,
      },
      {
        id: "local",
        title: "Lokale Expertise",
        description:
          "Al meer dan 15 jaar actief in Dordrecht en de regio. Wij kennen de lokale daken, het klimaat en de eisen. Persoonlijk contact en korte lijntjes — altijd.",
        icon: <MapPinIcon />,
      },
    ] satisfies Service[],
  },
  en: {
    aria: "Our Services",
    eyebrow: "Our Services",
    heading: "Everything for your roof, always",
    intro:
      "From emergency repairs to larger projects — we handle it professionally and on time.",
    services: [
      {
        id: "emergency",
        title: "24/7 Emergency Service",
        description:
          "Roof damage never comes at a good time. We are available day and night for emergencies — no queue, no delay. We come immediately.",
        icon: <ClockIcon />,
      },
      {
        id: "roofing",
        title: "Roofing & Maintenance",
        description:
          "From flat roofs to tiled roofs: we handle all roofing work. Repairs, full replacement, insulation, and preventive maintenance for long-term protection.",
        icon: <ShieldCheckIcon />,
      },
      {
        id: "local",
        title: "Local Expertise",
        description:
          "Active in Dordrecht and the region for over 15 years. We know local roofs, weather conditions, and requirements. Personal contact and short lines, always.",
        icon: <MapPinIcon />,
      },
    ] satisfies Service[],
  },
} as const;

export default function ServicesSection(): React.ReactElement {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <section
      id="diensten"
      aria-label={copy.aria}
      className="bg-slate-950 px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-orange-500">
            {copy.eyebrow}
          </p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            {copy.heading}
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-slate-400">{copy.intro}</p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {copy.services.map((service) => (
            <div
              key={service.id}
              className="group rounded-2xl border border-slate-700/50 bg-slate-800/50 p-8 transition-all hover:border-orange-500/40 hover:bg-slate-800"
            >
              <div className="mb-5 inline-flex rounded-xl bg-orange-500/10 p-3 text-orange-500 ring-1 ring-orange-500/20 transition-colors group-hover:bg-orange-500/15">
                {service.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">
                {service.title}
              </h3>
              <p className="leading-relaxed text-slate-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
