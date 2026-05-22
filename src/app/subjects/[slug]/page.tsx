import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllSubjectSlugs, getSubject } from "@/lib/subjects/registry";
import { ACCENT } from "@/lib/subjects/accents";
import { SectionCard } from "@/components/section-card";
import { cn } from "@/lib/utils";
import { getServerI18n } from "@/lib/i18n/server";

export async function generateStaticParams() {
  return getAllSubjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const subject = getSubject(slug);
  if (!subject) return { title: "Nicht gefunden" };
  return { title: `${subject.title} — Software Engineering BSc` };
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const subject = getSubject(slug);
  if (!subject) notFound();

  const { dict } = await getServerI18n();
  const a = ACCENT[subject.accent];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
      <Link
        href="/"
        className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <span aria-hidden className="rtl:rotate-180">←</span>
        <span>{dict.nav.allSubjects}</span>
      </Link>

      <header className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
        <div
          className={cn(
            "relative flex h-28 w-24 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-card",
            "shadow-[0_8px_20px_-12px_rgba(0,0,0,0.2)]",
          )}
        >
          <span
            aria-hidden
            className={cn("absolute inset-y-0 start-0 w-1 rounded-s-xl", a.bg)}
          />
          <span className="text-5xl" aria-hidden>
            {subject.emoji}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span
            className={cn(
              "self-start rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
              a.badgeBg,
              a.badgeText,
            )}
          >
            {subject.shortTitle}
          </span>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {subject.title}
          </h1>
        </div>
      </header>

      <section className="mt-12">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {dict.subject.notebook}
          </h2>
          <span className="text-xs text-muted-foreground">
            {dict.subject.areasCount(subject.sections.length)}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subject.sections.map((kind) => (
            <SectionCard
              key={kind}
              subjectSlug={subject.slug}
              kind={kind}
              accent={subject.accent}
              label={dict.sections[kind]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
