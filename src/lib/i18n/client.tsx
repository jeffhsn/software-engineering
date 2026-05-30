"use client";

import { createContext, useContext, useMemo, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  // Locale lives in client state so switching is instant: all bundled UI
  // strings (nav, chips, dict) re-resolve in place with no page reload. The
  // cookie is updated for the next server render, and router.refresh() lets the
  // server components catch up without a hard navigation (preserves scroll +
  // client state). The old window.location.reload() was the source of the lag.
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      writeLocaleCookie(next);
      // Apply the direction/lang to <html> immediately so RTL flips without
      // waiting for the server round-trip.
      const meta = getLocaleMeta(next);
      const root = document.documentElement;
      root.lang = next;
      root.dir = meta.dir;
      setLocaleState(next);
      router.refresh();
    },
    [locale, router],
  );

  const value = useMemo<I18nContextValue>(() => {
    const dict = getDict(locale);
    const meta = getLocaleMeta(locale);
    return {
      locale,
      dict,
      dir: meta.dir,
      setLocale,
      tr: (text) => resolveTr(text, locale),
    };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
