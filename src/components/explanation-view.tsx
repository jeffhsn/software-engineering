"use client";

import type { ReactNode, UIEvent } from "react";
import { useMemo, useState } from "react";
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
  const [progress, setProgress] = useState(0);
  const { tr } = useI18n();
  const hasSimple = Boolean(explanation.simpleContent);
  const body = mode === "simple" && explanation.simpleContent
    ? tr(explanation.simpleContent)
    : tr(explanation.content);
  const title = tr(explanation.title);
  const headings = useMemo(() => extractHeadings(body), [body]);
  const readingMinutes = useMemo(() => {
    const words = body.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 180));
  }, [body]);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max <= 0 ? 0 : Math.round((el.scrollTop / max) * 100));
  };

  return (
    <div className="relative h-full overflow-y-auto bg-background" onScroll={handleScroll}>
      <div className="sticky top-0 z-10 h-1 bg-border/40">
        <div
          className="h-full bg-foreground transition-[width]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_15rem] lg:px-10 lg:py-14">
        <article className="prose-notebook min-w-0 max-w-[78ch] rounded-3xl border border-border/60 bg-card/45 px-6 py-9 shadow-sm sm:px-9 sm:py-12 lg:px-12">
          <header className="mb-10 border-b border-border/60 pb-8">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {eyebrow}
            </p>
            <h1>{title}</h1>
            <div className="not-prose mt-5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full border border-border bg-background px-3 py-1 font-semibold">
                ca. {readingMinutes} Min. Lesezeit
              </span>
              <span className="rounded-full border border-border bg-background px-3 py-1 font-semibold">
                {headings.length} Abschnitte
              </span>
            </div>
            {hasSimple && (
              <div className="not-prose mt-6 inline-flex rounded-full border border-border bg-background p-1 text-xs font-semibold">
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
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => {
                const text = textFromChildren(children);
                return <h2 id={slugify(text)}>{children}</h2>;
              },
            }}
          >
            {body}
          </ReactMarkdown>
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-8 rounded-3xl border border-border/60 bg-card/70 p-4 shadow-sm">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Fortschritt {progress}%
            </p>
            <nav className="flex max-h-[calc(100dvh-8rem)] flex-col gap-1 overflow-y-auto text-sm">
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className="rounded-2xl px-3 py-2 leading-snug text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {heading.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}

function extractHeadings(markdown: string): { id: string; title: string }[] {
  return [...markdown.matchAll(/^##\s+(.+)$/gm)].map((match) => {
    const title = match[1].replace(/\*\*/g, "").trim();
    return { id: slugify(title), title };
  });
}

function textFromChildren(children: ReactNode): string {
  if (Array.isArray(children)) {
    return children.map(textFromChildren).join("");
  }
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  return "";
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9äöüß]+/gi, "-")
    .replace(/^-|-$/g, "");
}
