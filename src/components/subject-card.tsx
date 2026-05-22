import Link from "next/link";
import type { Subject } from "@/lib/subjects/types";
import { ACCENT } from "@/lib/subjects/accents";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  subject: Subject;
}

export function SubjectCard({ subject }: Props) {
  const a = ACCENT[subject.accent];
  return (
    <Link
      href={`/subjects/${subject.slug}`}
      className="group block transition-transform duration-300 ease-out hover:-translate-y-1"
    >
      <Card
        className={cn(
          "relative h-full min-h-[280px] overflow-hidden p-0 ring-0 border border-border/60 bg-card",
          "shadow-[0_1px_0_0_rgba(0,0,0,0.04),0_1px_2px_-1px_rgba(0,0,0,0.06)]",
          "transition-all duration-300 ease-out",
          "group-hover:shadow-[0_12px_24px_-12px_rgba(0,0,0,0.18),0_4px_8px_-4px_rgba(0,0,0,0.08)]",
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

        <div className="flex h-full flex-col p-5 ps-7">
          <div className="flex items-start justify-between">
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                a.badgeBg,
                a.badgeText,
              )}
            >
              {subject.shortTitle}
            </span>
          </div>

          <div className="flex flex-1 items-center justify-center py-4">
            <span
              className="text-6xl drop-shadow-sm transition-transform duration-500 ease-out group-hover:-rotate-3 group-hover:scale-110"
              aria-hidden
            >
              {subject.emoji}
            </span>
          </div>

          <div>
            <div className="mb-3 h-px w-8 bg-border" />
            <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-foreground text-balance">
              {subject.title}
            </h3>
          </div>
        </div>
      </Card>
    </Link>
  );
}
