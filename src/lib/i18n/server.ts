import { cookies } from "next/headers";
import { DEFAULT_LOCALE, isLocale, getLocaleMeta } from "./locales";
import { getDict } from "./dictionaries";
import type { Locale } from "./types";

export const LOCALE_COOKIE = "se-bsc-locale";

export async function getServerLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export async function getServerI18n() {
  const locale = await getServerLocale();
  const dict = getDict(locale);
  const meta = getLocaleMeta(locale);
  return { locale, dict, dir: meta.dir };
}
