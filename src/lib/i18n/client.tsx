"use client";

import { createContext, useContext, useMemo, useCallback } from "react";
import type { Dict, Locale, LocalizedText } from "./types";
import { getDict } from "./dictionaries";
import { getLocaleMeta } from "./locales";
import { tr as resolveTr } from "./translatable";

interface I18nContextValue {
  locale: Locale;
  dict: Dict;
  dir: "ltr" | "rtl";
  setLocale: (next: Locale) => void;
  tr: (text: LocalizedText | undefined) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export const LOCALE_COOKIE = "se-bsc-locale";

function writeLocaleCookie(locale: Locale) {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${maxAge}; samesite=lax`;
}

export function I18nProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const setLocale = useCallback((next: Locale) => {
    writeLocaleCookie(next);
    window.location.reload();
  }, []);

  const value = useMemo<I18nContextValue>(() => {
    const dict = getDict(initialLocale);
    const meta = getLocaleMeta(initialLocale);
    return {
      locale: initialLocale,
      dict,
      dir: meta.dir,
      setLocale,
      tr: (text) => resolveTr(text, initialLocale),
    };
  }, [initialLocale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
