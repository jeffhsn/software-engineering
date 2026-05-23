import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSubject, getAllSubjectSlugs } from "@/lib/subjects/registry";
import type { SectionKind } from "@/lib/subjects/types";
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
  return { title: subject.title };
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

  const { dict } = await getServerI18n();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
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
  );
}
