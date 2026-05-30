import type { Explanation } from "../explanation-types";
import { cybersicherheit2025Explanations } from "./cybersicherheit-2025";
import { cybersicherheit2025UebungWalkthroughs } from "./cybersicherheit-2025-uebungen";
import { buildCybersicherheit2026Explanations } from "../cybersicherheit-2026-learning";
import { buildCybersicherheit2026UebungWalkthroughs } from "./cybersicherheit-2026-uebungen";

// The full set of explanations across all notebooks. This pulls in every
// notebook's long-form German prose, so it must only be imported on the SERVER
// (content-server.ts). Client components get just the current notebook's
// objects via props + seedContentObjects (content-objects-client) — that's
// what stops the client bundle from growing with each notebook added.
export const ALL_EXPLANATIONS: Explanation[] = [
  ...cybersicherheit2025Explanations,
  ...cybersicherheit2025UebungWalkthroughs,
  ...buildCybersicherheit2026Explanations(),
  ...buildCybersicherheit2026UebungWalkthroughs(),
];

export function getExplanation(id: string): Explanation | undefined {
  return ALL_EXPLANATIONS.find((e) => e.id === id);
}
