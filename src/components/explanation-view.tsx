"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Explanation } from "@/lib/notebooks/explanation-types";
import { useI18n } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";

interface Props {
  explanation: Explanation;
  /** Optional eyebrow above the title (e.g. "Übung 2 · Walkthrough"). Defaults to "Erklärung". */
  eyebrow?: string;
}

/**
 * Long-form lecture walkthrough. The title is rendered as the h1 anchor
 * above the markdown body so authors can start their content at h2 and
 * still get a full visible hierarchy.
 */
export function ExplanationView({ explanation, eyebrow = "Erklärung" }: Props) {
  const [mode, setMode] = useState<"deep" | "simple">("deep");
  const { tr } = useI18n();
  const hasSimple = Boolean(explanation.simpleContent);
  const body = mode === "simple" && explanation.simpleContent
    ? tr(explanation.simpleContent)
    : tr(explanation.content);
  const title = tr(explanation.title);

  return (
    <div className="h-full overflow-y-auto bg-background">
      <article className="prose-notebook mx-auto max-w-[68ch] px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
        <header className="mb-10">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {eyebrow}
          </p>
          <h1>{title}</h1>
          {hasSimple && (
            <div className="not-prose mt-6 inline-flex rounded-full border border-border bg-card p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setMode("deep")}
                className={cn(
                  "rounded-full px-3 py-1.5 transition-colors",
                  mode === "deep"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Tiefe Erklärung
              </button>
              <button
                type="button"
                onClick={() => setMode("simple")}
                className={cn(
                  "rounded-full px-3 py-1.5 transition-colors",
                  mode === "simple"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Einfach erklärt
              </button>
            </div>
          )}
        </header>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </article>
    </div>
  );
}
