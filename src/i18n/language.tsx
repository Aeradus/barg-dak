import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "nl" | "en";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
}

const STORAGE_KEY = "barg-language";

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [language, setLanguage] = useState<Language>(() => {
    const pathname = window.location.pathname;

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
