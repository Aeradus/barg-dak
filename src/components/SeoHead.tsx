import { useEffect } from "react";
import type { Language } from "../i18n/language";
import { ROUTES } from "../routes";

interface SeoHeadProps {
  language: Language;
}

const SITE_URL = import.meta.env.VITE_SITE_URL;
const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, "");

const SEO_COPY = {
  nl: {
    title: "Barg Dak Dordrecht | Dakdekker, Dakreparatie & 24/7 Spoedservice",
    description:
      "Barg Dak is uw dakdekker in Dordrecht voor dakreparatie, dakonderhoud, renovatie en 24/7 spoedservice in Zuid-Holland.",
    path: ROUTES.HOME_NL,
    locale: "nl_NL",
  },
  en: {
    title: "Barg Dak Dordrecht | Roofer, Roof Repair & 24/7 Emergency Service",
    description:
      "Barg Dak is your roofer in Dordrecht for roof repair, roof maintenance, renovation, and 24/7 emergency service in South Holland.",
    path: ROUTES.HOME_EN,
    locale: "en_GB",
  },
} as const;

function getSiteOrigin(): string {
  if (SITE_URL) {
    const normalizedSiteUrl = SITE_URL.replace(/\/$/, "");

    if (BASE_PATH && !normalizedSiteUrl.endsWith(BASE_PATH)) {
      return `${normalizedSiteUrl}${BASE_PATH}`;
    }

    return normalizedSiteUrl;
  }

  return `${window.location.origin}${BASE_PATH}`;
}

function upsertMeta(name: string, content: string): void {
  let meta = document.head.querySelector<HTMLMetaElement>(
    `meta[name="${name}"]`,
  );

  if (!meta) {
    meta = document.createElement("meta");
    meta.name = name;
    document.head.appendChild(meta);
  }

  meta.content = content;
}

function upsertPropertyMeta(property: string, content: string): void {
  let meta = document.head.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`,
  );

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }

  meta.content = content;
}

function upsertLink(rel: string, href: string, hreflang?: string): void {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;

  let link = document.head.querySelector<HTMLLinkElement>(selector);

  if (!link) {
    link = document.createElement("link");
    link.rel = rel;

    if (hreflang) {
      link.hreflang = hreflang;
    }

    document.head.appendChild(link);
  }

  link.href = href;
}

export default function SeoHead({ language }: SeoHeadProps): null {
  useEffect(() => {
    const origin = getSiteOrigin();
    const current = SEO_COPY[language];
    const canonicalUrl = `${origin}${current.path}`;
    const nlUrl = `${origin}${ROUTES.HOME_NL}`;
    const enUrl = `${origin}${ROUTES.HOME_EN}`;

    document.title = current.title;

    upsertMeta("description", current.description);
    upsertMeta("robots", "index, follow");

    upsertPropertyMeta("og:title", current.title);
    upsertPropertyMeta("og:description", current.description);
    upsertPropertyMeta("og:type", "website");
    upsertPropertyMeta("og:url", canonicalUrl);
    upsertPropertyMeta("og:locale", current.locale);

    upsertLink("canonical", canonicalUrl);
    upsertLink("alternate", nlUrl, "nl-NL");
    upsertLink("alternate", enUrl, "en-GB");
    upsertLink("alternate", nlUrl, "x-default");
  }, [language]);

  return null;
}
