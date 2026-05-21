import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "nl" | "en";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
}

const STORAGE_KEY = "barg-language";

function getNormalizedPathname(pathname: string): string {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

  if (!basePath) {
    return pathname;
  }

  if (!pathname.startsWith(basePath)) {
    return pathname;
  }

  const stripped = pathname.slice(basePath.length);
  return stripped.length > 0 ? stripped : "/";
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [language, setLanguage] = useState<Language>(() => {
    const pathname = getNormalizedPathname(window.location.pathname);

    if (pathname.startsWith("/en")) {
      return "en";
    }

    if (pathname.startsWith("/nl")) {
      return "nl";
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "en" ? "en" : "nl";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
