import type { Explanation } from "../explanation-types";
import { cybersicherheit2025Explanations } from "./cybersicherheit-2025";
import { cybersicherheit2025UebungWalkthroughs } from "./cybersicherheit-2025-uebungen";

const ALL: Explanation[] = [
  ...cybersicherheit2025Explanations,
  ...cybersicherheit2025UebungWalkthroughs,
];

export function getExplanation(id: string): Explanation | undefined {
  return ALL.find((e) => e.id === id);
}
