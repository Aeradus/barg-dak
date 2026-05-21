/**
 * Agent C: Contact section — phone CTA, address, hours, and maps link.
 * Data sourced entirely from the Zustand contactStore (Agent B).
 */

import { useContactStore } from "../store/contactStore";
import { useLanguage } from "../i18n/language";

const COPY = {
  nl: {
    section: "Contact",
    heading: "Neem direct contact op",
    sub: "Klaar om te helpen, dag en nacht.",
    callUs: "Bel ons direct",
    sevenDays: "7 dagen per week",
    callNow: "Bel Nu",
    address: "Adres",
    map: "Bekijk op kaart ->",
    serviceArea: "Werkgebied",
  },
  en: {
    section: "Contact",
    heading: "Get in touch directly",
    sub: "Ready to help, day and night.",
    callUs: "Call us directly",
    sevenDays: "7 days a week",
    callNow: "Call Now",
    address: "Address",
    map: "View on map ->",
    serviceArea: "Service area",
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

function MapPinIcon(): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5 shrink-0"
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

function ClockIcon(): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5 shrink-0"
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

interface InfoCardProps {
  icon: React.ReactElement;
  label: string;
  value: string;
  href?: string;
  linkLabel?: string;
}

function InfoCard({
  icon,
  label,
  value,
  href,
  linkLabel,
}: InfoCardProps): React.ReactElement {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-700/50 bg-slate-800/50 p-5">
      <div className="mt-0.5 rounded-lg bg-orange-500/10 p-2 text-orange-500 ring-1 ring-orange-500/20">
        {icon}
      </div>
      <div>
        <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </p>
        <p className="font-semibold text-white">{value}</p>
        {href && linkLabel && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-xs text-orange-400 transition-colors hover:text-orange-300"
          >
            {linkLabel}
          </a>
        )}
      </div>
    </div>
  );
}

export default function ContactSection(): React.ReactElement {
  const contact = useContactStore((s) => s.contact);
  const { language } = useLanguage();
  const copy = COPY[language];
  const tel = `tel:${contact.phone.replace(/\s/g, "")}`;
  const province = language === "en" ? "South Holland" : contact.province;
  const hoursLabel = language === "en" ? "Opening Hours" : contact.hours.label;
  const hoursDescription =
    language === "en" ? "Open 24 hours" : contact.hours.description;

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="bg-slate-950 px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-orange-500">
            {copy.section}
          </p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            {copy.heading}
          </h2>
          <p className="mt-4 text-slate-400">{copy.sub}</p>
        </div>

        {/* Content grid */}
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:items-center">
          {/* Big phone CTA */}
          <div className="text-center lg:text-left">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-slate-500">
              {copy.callUs}
            </p>
            <a
              href={tel}
              className="inline-block text-4xl font-black tracking-tight text-white transition-colors hover:text-orange-400 sm:text-5xl"
            >
              {contact.phone}
            </a>
            <p className="mt-3 text-slate-400">
              {hoursDescription} — {copy.sevenDays}
            </p>
            <a
              href={tel}
              className="mt-6 inline-flex items-center gap-2.5 rounded-xl bg-orange-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:-translate-y-0.5 hover:bg-orange-600 active:translate-y-0"
            >
              <PhoneIcon />
              {copy.callNow}
            </a>
          </div>

          {/* Info cards */}
          <div className="flex flex-col gap-4">
            <InfoCard
              icon={<MapPinIcon />}
              label={copy.address}
              value={`${contact.address}, ${contact.postalCode} ${contact.city}`}
              href={contact.mapsUrl}
              linkLabel={copy.map}
            />
            <InfoCard
              icon={<ClockIcon />}
              label={hoursLabel}
              value={hoursDescription}
            />
            <InfoCard
              icon={<MapPinIcon />}
              label={copy.serviceArea}
              value={
                language === "en"
                  ? `${contact.city} and surrounding area, ${province}`
                  : `${contact.city} & omstreken, ${province}`
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
