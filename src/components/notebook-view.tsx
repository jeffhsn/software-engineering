"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { LessonResource, Notebook } from "@/lib/notebooks/types";
import { clampedIndex, setVariantInUrl } from "@/lib/notebooks/nav";
import { cn } from "@/lib/utils";

// react-pdf pulls in browser-only APIs (DOMMatrix, Worker, etc.). Loading
// the viewer dynamically with ssr disabled keeps the rest of the tree
// renderable on the server.
const PdfViewer = dynamic(
  () => import("./pdf-viewer").then((m) => m.PdfViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Loading PDF…
      </div>
    ),
  },
);

interface Props {
  notebook: Notebook;
}

export function NotebookView({ notebook }: Props) {
  const searchParams = useSearchParams();
  const lessonIndex = clampedIndex(
    parseInt(searchParams.get("l") ?? "1") - 1,
    notebook.lessons.length,
  );
  const lesson = notebook.lessons[lessonIndex];

  const readIdx = clampedIndex(
    parseInt(searchParams.get("rv") ?? "1") - 1,
    lesson.read.length,
  );
  const practiceIdx = clampedIndex(
    parseInt(searchParams.get("pv") ?? "1") - 1,
    lesson.practice.length,
  );

  // Warm the browser cache for adjacent lessons so jumping with the
  // chevrons is instant. Range-request friendly: pdfjs will reuse the
  // bytes already in the HTTP cache when it actually loads the doc.
  useEffect(() => {
    const adjacent = [
      notebook.lessons[lessonIndex - 1],
      notebook.lessons[lessonIndex + 1],
    ].filter(Boolean);
    const urls = new Set<string>();
    for (const adj of adjacent) {
      for (const r of [...adj.read, ...adj.practice]) {
        if (r.kind === "pdf") urls.add(r.src);
      }
    }
    const controllers: AbortController[] = [];
    for (const url of urls) {
      const c = new AbortController();
      // `low` keeps prefetch from competing with the current PDF's bytes.
      fetch(url, { signal: c.signal, priority: "low" as RequestPriority }).catch(
        () => {},
      );
      controllers.push(c);
    }
    return () => controllers.forEach((c) => c.abort());
  }, [notebook, lessonIndex]);

  return (
    <div className="grid h-[calc(100dvh-3.5rem)] grid-cols-1 md:grid-cols-2 md:divide-x md:divide-border/60 rtl:md:divide-x-reverse">
      <NotebookSide
        resources={lesson.read}
        activeIdx={readIdx}
        onChange={(i) => setVariantInUrl("rv", i + 1)}
      />
      <NotebookSide
        resources={lesson.practice}
        activeIdx={practiceIdx}
        onChange={(i) => setVariantInUrl("pv", i + 1)}
      />
    </div>
  );
}

function NotebookSide({
  resources,
  activeIdx,
  onChange,
}: {
  resources: LessonResource[];
  activeIdx: number;
  onChange: (i: number) => void;
}) {
  const active = resources[activeIdx];
  return (
    <div className="flex min-h-0 flex-col">
      {resources.length > 1 && (
        <div className="flex shrink-0 flex-wrap gap-1.5 border-b border-border/60 px-4 py-2 sm:px-6">
          {resources.map((r, i) => (
            <Chip
              key={`${i}-${r.label}`}
              active={i === activeIdx}
              onClick={() => onChange(i)}
            >
              {r.label}
            </Chip>
          ))}
        </div>
      )}
      <div className="min-h-0 flex-1">
        {active?.kind === "pdf" && (
          <PdfViewer key={active.src} src={active.src} />
        )}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex cursor-pointer items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
