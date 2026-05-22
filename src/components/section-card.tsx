import Link from "next/link";
import type { AccentColor, SectionKind } from "@/lib/subjects/types";
import { ACCENT } from "@/lib/subjects/accents";
import { cn } from "@/lib/utils";

interface Props {
  subjectSlug: string;
  kind: SectionKind;
  accent: AccentColor;
  label: string;
}

const ICON: Record<SectionKind, string> = {
  lectures: "📖",
  exercises: "✏️",
  exams: "📝",
  summaries: "🗒️",
  flashcards: "🃏",
  cheatsheets: "📋",
  code: "💻",
};

export function SectionCard({ subjectSlug, kind, accent, label }: Props) {
  const a = ACCENT[accent];
  return (
    <Link
      href={`/subjects/${subjectSlug}/${kind}`}
      className={cn(
        "group flex items-center gap-4 rounded-xl border border-border/70 bg-card p-4 transition-all",
        a.hoverBorder,
        "hover:shadow-sm hover:-translate-y-0.5",
      )}
    >
      <div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xl",
          a.badgeBg,
        )}
        aria-hidden
      >
        {ICON[kind]}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-semibold tracking-tight">
          {label}
        </h3>
      </div>
      <span
        aria-hidden
        className="text-muted-foreground transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
      >
        →
      </span>
    </Link>
  );
}
