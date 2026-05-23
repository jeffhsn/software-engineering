import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSubjectSlugs, getSubject } from "@/lib/subjects/registry";
import { ACCENT } from "@/lib/subjects/accents";
import { splitSections } from "@/lib/subjects/section-columns";
import type { SectionKind } from "@/lib/subjects/types";
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

const SECTION_ICON: Record<SectionKind, string> = {
  lectures: "📖",
  exercises: "✏️",
  exams: "📝",
  summaries: "🗒️",
  flashcards: "🃏",
  cheatsheets: "📋",
  code: "💻",
};

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
  const { read, practice } = splitSections(subject.sections);

  return (
    <div className="grid min-h-[calc(100dvh-3.5rem)] grid-cols-1 md:grid-cols-2 md:divide-x md:divide-border/60 rtl:md:divide-x-reverse">
      <NotebookColumn
        label={dict.subject.read}
        accentBg={a.bg}
        sections={read}
        subjectSlug={subject.slug}
        sectionLabels={dict.sections}
        emptyText={dict.section.emptyTitle}
      />
      <NotebookColumn
        label={dict.subject.practice}
        accentBg={a.bg}
        sections={practice}
        subjectSlug={subject.slug}
        sectionLabels={dict.sections}
        emptyText={dict.section.emptyTitle}
      />
    </div>
  );
}

function NotebookColumn({
  label,
  accentBg,
  sections,
  subjectSlug,
  sectionLabels,
  emptyText,
}: {
  label: string;
  accentBg: string;
  sections: SectionKind[];
  subjectSlug: string;
  sectionLabels: Record<SectionKind, string>;
  emptyText: string;
}) {
  return (
    <div className="px-6 py-12 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
      <div className="mb-10 flex items-center gap-2">
        <span
          aria-hidden
          className={cn("inline-block h-1.5 w-1.5 rounded-full", accentBg)}
        />
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </h2>
      </div>

      <div className="space-y-10">
        {sections.map((kind) => (
          <SubSection
            key={kind}
            subjectSlug={subjectSlug}
            kind={kind}
            label={sectionLabels[kind]}
            emptyText={emptyText}
          />
        ))}
      </div>
    </div>
  );
}

function SubSection({
  subjectSlug,
  kind,
  label,
  emptyText,
}: {
  subjectSlug: string;
  kind: SectionKind;
  label: string;
  emptyText: string;
}) {
  void subjectSlug;
  return (
    <div>
      <div className="mb-3 flex items-center gap-2.5">
        <span className="text-lg leading-none" aria-hidden>
          {SECTION_ICON[kind]}
        </span>
        <h3 className="text-[15px] font-semibold tracking-tight">{label}</h3>
      </div>
      <p className="text-sm text-muted-foreground">— {emptyText}</p>
    </div>
  );
}
