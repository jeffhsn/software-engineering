import type { Dict, Locale } from "./types";
import { DEFAULT_LOCALE } from "./locales";

import { de } from "./dict/de";
import { en } from "./dict/en";
import { tr } from "./dict/tr";
import { ar } from "./dict/ar";
import { ru } from "./dict/ru";
import { it } from "./dict/it";
import { es } from "./dict/es";
import { fr } from "./dict/fr";
import { zh } from "./dict/zh";
import { pl } from "./dict/pl";
import { pt } from "./dict/pt";
import { uk } from "./dict/uk";
import { fa } from "./dict/fa";
import { ja } from "./dict/ja";
import { ko } from "./dict/ko";
import { vi } from "./dict/vi";
import { hi } from "./dict/hi";
import { ur } from "./dict/ur";
import { nl } from "./dict/nl";
import { el } from "./dict/el";
import { cs } from "./dict/cs";
import { hu } from "./dict/hu";
import { ro } from "./dict/ro";
import { sq } from "./dict/sq";
import { sr } from "./dict/sr";
import { hr } from "./dict/hr";
import { bg } from "./dict/bg";
import { sv } from "./dict/sv";
import { fi } from "./dict/fi";
import { id } from "./dict/id";
import { th } from "./dict/th";
import { sw } from "./dict/sw";

export const DICTIONARIES: Record<Locale, Dict> = {
  de, en, tr, ar, ru, it, es, fr, zh,
  pl, pt, uk, fa, ja, ko, vi, hi, ur,
  nl, el, cs, hu, ro, sq, sr, hr, bg,
  sv, fi, id, th, sw,
};

export function getDict(locale: Locale): Dict {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}
