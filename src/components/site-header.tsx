"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useI18n } from "@/lib/i18n/client";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { SUBJECTS } from "@/lib/subjects/registry";
import { getNotebook, getNotebooksForSubject } from "@/lib/notebooks/registry";
import type { Notebook } from "@/lib/notebooks/types";
import { setLessonInUrl } from "@/lib/notebooks/nav";
import { tr as trText } from "@/lib/i18n/translatable";
import type { Locale } from "@/lib/i18n/types";
import { YearPicker } from "@/components/year-picker";
import { cn } from "@/lib/utils";
import { ACCENT } from "@/lib/subjects/accents";

const SUBJECT_RE = /^\/subjects\/([^/]+)(?:\/([^/]+))?\/?$/;

export function SiteHeader() {
  const { dict, locale } = useI18n();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const match = pathname.match(SUBJECT_RE);
  const slug = match?.[1];
  const sectionKind = match?.[2];
  const subject = slug ? SUBJECTS.find((s) => s.slug === slug) : undefined;
  const notebook = subject ? getNotebook(subject.slug) : undefined;
  const sectionLabel =
    subject && sectionKind && sectionKind in dict.sections
      ? dict.sections[sectionKind as keyof typeof dict.sections]
      : undefined;

  const lessonIndex = notebook
    ? clamp(parseInt(searchParams.get("l") ?? "1") - 1, 0, notebook.lessons.length - 1)
    : -1;
  const activeLesson = notebook && lessonIndex >= 0 ? notebook.lessons[lessonIndex] : undefined;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 sm:px-6">
        {/* LEFT */}
        <nav className="flex min-w-0 items-center gap-1.5 justify-self-start text-sm">
          <Link
            href="/"
            aria-label={dict.brand}
            className={cn(
              "group inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-lg px-2 py-1 font-bold tracking-tight",
              "transition-colors hover:bg-accent",
            )}
          >
            <span className="text-base leading-none transition-transform group-hover:-rotate-6">
              💻
            </span>
            {!subject && <span>{dict.brand}</span>}
          </Link>

          {subject && (
            <>
              <Separator />
              <SubjectCrumb subject={subject} notebook={notebook} />
              {sectionLabel && (
                <>
                  <Separator />
                  <span className="truncate rounded-lg px-2 py-1 text-muted-foreground">
                    {sectionLabel}
                  </span>
                </>
              )}
            </>
          )}
        </nav>

        {/* CENTER */}
        <div className="justify-self-center">
          {notebook && activeLesson ? (
            <LessonNav
              notebook={notebook}
              lessonIndex={lessonIndex}
              lectureLabel={dict.subject.lecture}
              previousLabel={dict.subject.previous}
              nextLabel={dict.subject.next}
              locale={locale}
            />
          ) : null}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-1.5 justify-self-end">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

function SubjectCrumb({
  subject,
  notebook,
}: {
  subject: (typeof SUBJECTS)[number];
  notebook?: Notebook;
}) {
  const a = ACCENT[subject.accent];
  const allYears = notebook ? getNotebooksForSubject(subject.slug) : [];
  return (
    <div className="flex min-w-0 items-center gap-2">
      <Link
        href={`/subjects/${subject.slug}`}
        className={cn(
          "group flex min-w-0 cursor-pointer items-center gap-2 rounded-lg px-2 py-1 font-bold tracking-tight",
          "transition-colors hover:bg-accent",
        )}
      >
        <span className="text-base leading-none" aria-hidden>
          {subject.emoji}
        </span>
        <span className="flex min-w-0 items-center gap-1.5">
          <span
            aria-hidden
            className={cn("inline-block h-1.5 w-1.5 shrink-0 rounded-full", a.bg)}
          />
          <span className="truncate">{subject.title}</span>
        </span>
      </Link>
      {notebook && (
        <YearPicker current={notebook} available={allYears} />
      )}
    </div>
  );
}

function LessonNav({
  notebook,
  lessonIndex,
  lectureLabel,
  previousLabel,
  nextLabel,
  locale,
}: {
  notebook: Notebook;
  lessonIndex: number;
  lectureLabel: string;
  previousLabel: string;
  nextLabel: string;
  locale: Locale;
}) {
  const total = notebook.lessons.length;
  const lesson = notebook.lessons[lessonIndex];
  const goPrev = () => {
    if (lessonIndex > 0) setLessonInUrl(notebook.lessons[lessonIndex - 1].number);
  };
  const goNext = () => {
    if (lessonIndex < total - 1)
      setLessonInUrl(notebook.lessons[lessonIndex + 1].number);
  };

  return (
    <div className="hidden items-center gap-2 md:flex">
      <Chevron
        onClick={goPrev}
        disabled={lessonIndex === 0}
        label={previousLabel}
      >
        <span aria-hidden className="rtl:rotate-180">
          ‹
        </span>
      </Chevron>
      <div className="flex min-w-0 max-w-md flex-col items-center text-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {lectureLabel} {String(lesson.number).padStart(2, "0")} · {lessonIndex + 1}/{total}
        </span>
        <span className="w-full truncate text-sm font-semibold tracking-tight">
          {trText(lesson.title, locale)}
        </span>
      </div>
      <Chevron
        onClick={goNext}
        disabled={lessonIndex === total - 1}
        label={nextLabel}
      >
        <span aria-hidden className="rtl:rotate-180">
          ›
        </span>
      </Chevron>
    </div>
  );
}

function Chevron({
  children,
  onClick,
  disabled,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-xl font-semibold leading-none text-foreground",
        "transition-all hover:scale-105 hover:border-foreground/30 hover:bg-accent",
        "disabled:pointer-events-none disabled:opacity-20",
      )}
    >
      {children}
    </button>
  );
}

function Separator() {
  return (
    <span aria-hidden className="text-muted-foreground/50">
      /
    </span>
  );
}

function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value) || value < min) return min;
  if (value > max) return max;
  return value;
}
