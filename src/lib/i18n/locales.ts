import type { Locale, LocaleMeta } from "./types";

export const DEFAULT_LOCALE: Locale = "de";

export const LOCALES: LocaleMeta[] = [
  { code: "de", label: "German", nativeLabel: "Deutsch", dir: "ltr", flag: "🇩🇪" },
  { code: "en", label: "English", nativeLabel: "English", dir: "ltr", flag: "🇬🇧" },
  { code: "tr", label: "Turkish", nativeLabel: "Türkçe", dir: "ltr", flag: "🇹🇷" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", dir: "rtl", flag: "🇵🇸" },
  { code: "ru", label: "Russian", nativeLabel: "Русский", dir: "ltr", flag: "🇷🇺" },
  { code: "it", label: "Italian", nativeLabel: "Italiano", dir: "ltr", flag: "🇮🇹" },
  { code: "es", label: "Spanish", nativeLabel: "Español", dir: "ltr", flag: "🇪🇸" },
  { code: "fr", label: "French", nativeLabel: "Français", dir: "ltr", flag: "🇫🇷" },
  { code: "zh", label: "Chinese (Simplified)", nativeLabel: "中文", dir: "ltr", flag: "🇨🇳" },
  { code: "pl", label: "Polish", nativeLabel: "Polski", dir: "ltr", flag: "🇵🇱" },
  { code: "pt", label: "Portuguese", nativeLabel: "Português", dir: "ltr", flag: "🇵🇹" },
  { code: "uk", label: "Ukrainian", nativeLabel: "Українська", dir: "ltr", flag: "🇺🇦" },
  { code: "fa", label: "Persian", nativeLabel: "فارسی", dir: "rtl", flag: "🇮🇷" },
  { code: "ja", label: "Japanese", nativeLabel: "日本語", dir: "ltr", flag: "🇯🇵" },
  { code: "ko", label: "Korean", nativeLabel: "한국어", dir: "ltr", flag: "🇰🇷" },
  { code: "vi", label: "Vietnamese", nativeLabel: "Tiếng Việt", dir: "ltr", flag: "🇻🇳" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", dir: "ltr", flag: "🇮🇳" },
  { code: "ur", label: "Urdu", nativeLabel: "اردو", dir: "rtl", flag: "🇵🇰" },
  { code: "nl", label: "Dutch", nativeLabel: "Nederlands", dir: "ltr", flag: "🇳🇱" },
  { code: "el", label: "Greek", nativeLabel: "Ελληνικά", dir: "ltr", flag: "🇬🇷" },
  { code: "cs", label: "Czech", nativeLabel: "Čeština", dir: "ltr", flag: "🇨🇿" },
  { code: "hu", label: "Hungarian", nativeLabel: "Magyar", dir: "ltr", flag: "🇭🇺" },
  { code: "ro", label: "Romanian", nativeLabel: "Română", dir: "ltr", flag: "🇷🇴" },
  { code: "sq", label: "Albanian", nativeLabel: "Shqip", dir: "ltr", flag: "🇦🇱" },
  { code: "sr", label: "Serbian", nativeLabel: "Српски", dir: "ltr", flag: "🇷🇸" },
  { code: "hr", label: "Croatian", nativeLabel: "Hrvatski", dir: "ltr", flag: "🇭🇷" },
  { code: "bg", label: "Bulgarian", nativeLabel: "Български", dir: "ltr", flag: "🇧🇬" },
  { code: "sv", label: "Swedish", nativeLabel: "Svenska", dir: "ltr", flag: "🇸🇪" },
  { code: "fi", label: "Finnish", nativeLabel: "Suomi", dir: "ltr", flag: "🇫🇮" },
  { code: "id", label: "Indonesian", nativeLabel: "Bahasa Indonesia", dir: "ltr", flag: "🇮🇩" },
  { code: "th", label: "Thai", nativeLabel: "ไทย", dir: "ltr", flag: "🇹🇭" },
  { code: "sw", label: "Swahili", nativeLabel: "Kiswahili", dir: "ltr", flag: "🇰🇪" },
];

export const LOCALE_CODES = LOCALES.map((l) => l.code);

export function getLocaleMeta(code: Locale): LocaleMeta {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALE_CODES as string[]).includes(value);
}
