/**
 * Agent C: Sticky site header with brand logo, anchor navigation, and phone CTA.
 */

import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContactStore } from "../store/contactStore";
import { useLanguage } from "../i18n/language";
import { ROUTES } from "../routes";

const COPY = {
  nl: {
    nav: [
      { label: "Diensten", href: "#diensten" },
      { label: "Reviews", href: "#reviews" },
      { label: "Contact", href: "#contact" },
    ],
    navAria: "Hoofdnavigatie",
    callNow: "Bel Nu",
    languageLabel: "Taal",
    dutch: "Nederlands",
    english: "Engels",
  },
  en: {
    nav: [
      { label: "Services", href: "#diensten" },
      { label: "Reviews", href: "#reviews" },
      { label: "Contact", href: "#contact" },
    ],
    navAria: "Main navigation",
    callNow: "Call now",
    languageLabel: "Language",
    dutch: "Dutch",
    english: "English",
  },
} as const;

function PhoneIcon(): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="size-4 shrink-0"
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

export default function SiteHeader(): React.ReactElement {
  const phone = useContactStore((s) => s.contact.phone);
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const copy = COPY[language];
  const menuRef = useRef<HTMLDetailsElement>(null);
  const tel = `tel:${phone.replace(/\s/g, "")}`;

  const selectLanguage = (nextLanguage: "nl" | "en"): void => {
    const nextPath = nextLanguage === "en" ? ROUTES.HOME_EN : ROUTES.HOME_NL;

    navigate({
      pathname: nextPath,
      hash: location.hash,
    });
    setLanguage(nextLanguage);
    menuRef.current?.removeAttribute("open");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-6">
        {/* Brand */}
        <a
          href={
            language === "en"
              ? `${ROUTES.HOME_EN}#hero`
              : `${ROUTES.HOME_NL}#hero`
          }
          className="select-none text-xl font-black tracking-tight text-white"
        >
          BARG<span className="text-orange-500">DAK</span>
        </a>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label={copy.navAria}
        >
          {copy.nav.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-orange-400"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <details ref={menuRef} className="relative">
            <summary className="list-none cursor-pointer rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-sm text-slate-200">
              <span className="sr-only">{copy.languageLabel}</span>
              {language === "nl" ? "🇳🇱" : "🇬🇧"}
            </summary>
            <div className="absolute right-0 top-10 min-w-36 rounded-lg border border-slate-700 bg-slate-900 p-1 shadow-lg">
              <button
                type="button"
                onClick={() => selectLanguage("nl")}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-slate-200 transition-colors hover:bg-slate-800"
              >
                <span>🇳🇱 {copy.dutch}</span>
                {language === "nl" ? "✓" : ""}
              </button>
              <button
                type="button"
                onClick={() => selectLanguage("en")}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-slate-200 transition-colors hover:bg-slate-800"
              >
                <span>🇬🇧 {copy.english}</span>
                {language === "en" ? "✓" : ""}
              </button>
            </div>
          </details>

          {/* CTA */}
          <a
            href={tel}
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-orange-600 active:bg-orange-700"
          >
            <PhoneIcon />
            <span className="hidden sm:inline">{phone}</span>
            <span className="sm:hidden">{copy.callNow}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
