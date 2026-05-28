import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSubjectSlugs, getSubject } from "@/lib/subjects/registry";
import { getNotebook } from "@/lib/notebooks/registry";
import { ACCENT } from "@/lib/subjects/accents";
import { splitSections } from "@/lib/subjects/section-columns";
import type { SectionKind } from "@/lib/subjects/types";
import { NotebookView } from "@/components/notebook-view";
import { SHELL_GRID, ShellContainer } from "@/components/app-shell";
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
  const notebook = getNotebook(subject.slug);

  // Subjects with a real notebook get the three-column reading shell.
  if (notebook && notebook.lessons.length > 0) {
    return <NotebookView notebook={notebook} />;
  }

  // Subjects without notebooks still adopt the shell so the header
  // columns line up visually. Side columns hold the read/practice
  // section indicators; the middle column shows the empty state.
  const { read, practice } = splitSections(subject.sections);
  return (
    <ShellContainer className="py-10 sm:py-12">
      <div className={cn("gap-6 lg:gap-8", SHELL_GRID)}>
        <SideSections
          label={dict.subject.read}
          accentBg={a.bg}
          sections={read}
          sectionLabels={dict.sections}
        />
        <div className="min-w-0">
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
        </div>
        <SideSections
          label={dict.subject.practice}
          accentBg={a.bg}
          sections={practice}
          sectionLabels={dict.sections}
        />
      </div>
    </ShellContainer>
  );
}

function SideSections({
  label,
  accentBg,
  sections,
  sectionLabels,
}: {
  label: string;
  accentBg: string;
  sections: SectionKind[];
  sectionLabels: Record<SectionKind, string>;
}) {
  return (
    <aside className="hidden flex-col gap-6 lg:flex">
      <div className="flex items-center gap-2">
        <span
          aria-hidden
          className={cn("inline-block h-1.5 w-1.5 rounded-full", accentBg)}
        />
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </h2>
      </div>
      <ul className="space-y-3 text-sm">
        {sections.map((kind) => (
          <li key={kind} className="flex items-center gap-2.5 text-muted-foreground">
            <span aria-hidden className="text-lg leading-none">
              {SECTION_ICON[kind]}
            </span>
            <span>{sectionLabels[kind]}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
