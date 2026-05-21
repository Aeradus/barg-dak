/**
 * Agent C: Minimal branded footer.
 */

import { useContactStore } from "../store/contactStore";
import { useLanguage } from "../i18n/language";

export default function SiteFooter(): React.ReactElement {
  const { name, city, province, phone } = useContactStore((s) => s.contact);
  const { language } = useLanguage();
  const tel = `tel:${phone.replace(/\s/g, "")}`;
  const provinceLabel = language === "en" ? "South Holland" : province;
  const rightsText =
    language === "en" ? "All rights reserved." : "Alle rechten voorbehouden.";

  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-10 text-center text-sm text-slate-500">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-1 font-semibold text-slate-300">
          <span className="font-black text-white">BARG</span>
          <span className="font-black text-orange-500">DAK</span>
          {" — "}
          {city}, {provinceLabel}
        </p>
        <p className="mb-4">
          <a href={tel} className="transition-colors hover:text-orange-400">
            {phone}
          </a>
        </p>
        <p>
          &copy; {new Date().getFullYear()} {name}. {rightsText}
        </p>
      </div>
    </footer>
  );
}
