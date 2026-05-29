import type { Explanation } from "../explanation-types";
import { cybersicherheit2025Explanations } from "./cybersicherheit-2025";
import { cybersicherheit2025UebungWalkthroughs } from "./cybersicherheit-2025-uebungen";
import { buildCybersicherheit2026Explanations } from "../cybersicherheit-2026-learning";
import { buildCybersicherheit2026UebungWalkthroughs } from "./cybersicherheit-2026-uebungen";

const ALL: Explanation[] = [
  ...cybersicherheit2025Explanations,
  ...cybersicherheit2025UebungWalkthroughs,
  ...buildCybersicherheit2026Explanations(),
  ...buildCybersicherheit2026UebungWalkthroughs(),
];

export function getExplanation(id: string): Explanation | undefined {
  return ALL.find((e) => e.id === id);
}
