import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getSubject, getAllSubjectSlugs } from "@/lib/subjects/registry";
import { ACCENT } from "@/lib/subjects/accents";
import type { SectionKind } from "@/lib/subjects/types";
import { cn } from "@/lib/utils";
import { getServerI18n } from "@/lib/i18n/server";

const VALID_SECTIONS: SectionKind[] = [
  "lectures",
  "exercises",
  "exams",
  "summaries",
  "flashcards",
  "cheatsheets",
  "code",
];

export async function generateStaticParams() {
  const params: { slug: string; section: string }[] = [];
  for (const slug of getAllSubjectSlugs()) {
    const subject = getSubject(slug)!;
    for (const section of subject.sections) {
      params.push({ slug, section });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; section: string }>;
}): Promise<Metadata> {
  const { slug, section } = await params;
  const subject = getSubject(slug);
  if (!subject) return { title: "Nicht gefunden" };
  if (!VALID_SECTIONS.includes(section as SectionKind)) {
    return { title: "Nicht gefunden" };
  }
  return { title: `${subject.title}` };
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ slug: string; section: string }>;
}) {
  const { slug, section } = await params;
  const subject = getSubject(slug);
  if (!subject) notFound();
  if (!VALID_SECTIONS.includes(section as SectionKind)) notFound();
  if (!subject.sections.includes(section as SectionKind)) notFound();

  const kind = section as SectionKind;
  const { dict } = await getServerI18n();
  const sectionLabel = dict.sections[kind];
  const a = ACCENT[subject.accent];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
      <Link
        href={`/subjects/${subject.slug}`}
        className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <span aria-hidden className="rtl:rotate-180">←</span>
        <span>{subject.title}</span>
      </Link>

      <header className="mt-6 flex items-center gap-4">
        <span
          aria-hidden
          className={cn("inline-block h-2 w-2 rounded-full", a.bg)}
        />
        <span
          className={cn(
            "text-[11px] font-semibold uppercase tracking-wider",
            a.text,
          )}
        >
          {subject.shortTitle}
        </span>
      </header>

      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        {sectionLabel}
      </h1>

      <section className="mt-10">
        <div className="rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center">
          <div className="mx-auto mb-4 text-4xl" aria-hidden>
            {subject.emoji}
          </div>
          <p className="text-sm font-medium text-foreground">
            {dict.section.emptyTitle}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {dict.section.emptyBody}
          </p>
        </div>
      </section>
    </div>
  );
}
