import type { Locale, LocalizedText } from "./types";
import { DEFAULT_LOCALE } from "./locales";

/**
 * Resolve a `LocalizedText` into a string for the active locale.
 * Falls back to default locale, then to any available value.
 * Pass a plain string and it's returned unchanged.
 */
export function tr(text: LocalizedText | undefined, locale: Locale): string {
  if (text == null) return "";
  if (typeof text === "string") return text;
  return (
    text[locale] ??
    text[DEFAULT_LOCALE] ??
    Object.values(text).find((v): v is string => typeof v === "string") ??
    ""
  );
}
