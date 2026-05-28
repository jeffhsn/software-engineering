import Link from "next/link";
import type { Subject } from "@/lib/subjects/types";
import { ACCENT } from "@/lib/subjects/accents";
import { getNotebook } from "@/lib/notebooks/registry";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  subject: Subject;
}

export function SubjectCard({ subject }: Props) {
  const a = ACCENT[subject.accent];
  // If the subject has a notebook, deep-link straight into chapter 1 — the
  // notebook home is reserved for direct visits, the primary flow is
  // "click subject → start reading".
  const notebook = getNotebook(subject.slug);
  const href = notebook
    ? `/subjects/${subject.slug}?l=1`
    : `/subjects/${subject.slug}`;
  return (
    <Link
      href={href}
      className="group block cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-1"
    >
      <Card
        className={cn(
          "relative h-full min-h-[300px] overflow-hidden p-0 ring-0 border border-border bg-card",
          "shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
          "transition-all duration-300 ease-out",
          "group-hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.25),0_8px_16px_-8px_rgba(0,0,0,0.08)]",
          "dark:group-hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.6)]",
          a.hoverBorder,
        )}
      >
        <span
          aria-hidden
          className={cn("absolute inset-y-0 start-0 w-1.5", a.bg)}
        />
        <span
          aria-hidden
          className="absolute inset-y-0 start-1.5 w-px bg-foreground/5"
        />

        <div className="flex h-full flex-col p-6 ps-8">
          <div className="flex items-start justify-between">
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em]",
                a.badgeBg,
                a.badgeText,
              )}
            >
              {subject.shortTitle}
            </span>
          </div>

          <div className="flex flex-1 items-center justify-center py-6">
            <span
              className="text-7xl transition-transform duration-500 ease-out group-hover:-rotate-3 group-hover:scale-110"
              aria-hidden
            >
              {subject.emoji}
            </span>
          </div>

          <div>
            <div className="mb-3 h-px w-10 bg-border" />
            <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-foreground text-balance">
              {subject.title}
            </h3>
          </div>
        </div>
      </Card>
    </Link>
  );
}
