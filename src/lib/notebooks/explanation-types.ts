import type { LocalizedText } from "@/lib/i18n/types";

/**
 * A long-form, non-summary walkthrough of a lecture. Written in Markdown
 * (GitHub-Flavored). The goal is depth, intuition, and connections — not
 * brevity.
 */
export interface Explanation {
  id: string;
  lesson: number;
  title: LocalizedText;
  /** Full markdown body, localized. */
  content: LocalizedText;
  /** Optional simpler retelling of the same lecture, localized. */
  simpleContent?: LocalizedText;
}
