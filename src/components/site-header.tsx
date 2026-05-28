"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useI18n } from "@/lib/i18n/client";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { SUBJECTS } from "@/lib/subjects/registry";
import {
  getAllNotebooks,
  getNotebook,
  getNotebooksForSubject,
} from "@/lib/notebooks/registry";
import { YearPicker } from "@/components/year-picker";
import { ChapterPicker } from "@/components/chapter-picker";
import { NotebookSearch } from "@/components/notebook-search";
import { clampedIndex } from "@/lib/notebooks/nav";
import { cn } from "@/lib/utils";

const SUBJECT_RE = /^\/subjects\/([^/]+)(?:\/([^/]+))?\/?$/;

/**
 * 3-column header.
 *
 *  - **Left**: brand → subject crumb → year picker.
 *  - **Middle**: chapter picker (in chapter view), notebook search (on
 *    subject home), or empty on `/`.
 *  - **Right**: theme + language switchers.
 *
 * The three slots are equally weighted grid tracks so the middle stays
 * centered no matter how wide the breadcrumb gets.
 */
export function SiteHeader() {
  const { dict } = useI18n();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const match = pathname.match(SUBJECT_RE);
  const slug = match?.[1];
  const subject = slug ? SUBJECTS.find((s) => s.slug === slug) : undefined;
  const notebook = subject ? getNotebook(subject.slug) : undefined;

  const rawL = searchParams.get("l");
  const inChapter = Boolean(notebook && rawL && rawL !== "0");
  const lessonIndex =
    inChapter && notebook
      ? clampedIndex(parseInt(rawL ?? "1") - 1, notebook.lessons.length)
      : -1;
  const currentLesson =
    lessonIndex >= 0 && notebook ? notebook.lessons[lessonIndex] : undefined;
  const onSubjectHome = Boolean(subject && !inChapter);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--rule)]/70 bg-background/90 backdrop-blur-xl">
      <div className="grid h-14 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-4 sm:px-8 lg:px-12">
        <div className="flex min-w-0 items-center gap-2">
          <Link
            href="/"
            aria-label={dict.brand}
            className="group inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-lg px-2 py-1 font-serif text-[15px] font-semibold transition-colors hover:bg-foreground/5"
          >
            <span className="text-base leading-none transition-transform group-hover:-rotate-6">
              💻
            </span>
            {!subject && <span>{dict.brand}</span>}
          </Link>

          {subject && (
            <>
              <span aria-hidden className="text-foreground/30">
                /
              </span>
              <Link
                href={`/subjects/${subject.slug}`}
                className={cn(
                  "group inline-flex min-w-0 items-center gap-2 rounded-lg px-2 py-1",
                  "font-serif text-[15px] font-semibold",
                  "transition-colors hover:bg-foreground/5",
                )}
              >
                <span aria-hidden className="text-base leading-none">
                  {subject.emoji}
                </span>
                <span className="truncate">{subject.title}</span>
              </Link>
              {notebook && (
                <YearPicker
                  current={notebook}
                  available={getNotebooksForSubject(notebook.subject)}
                />
              )}
            </>
          )}
        </div>

        <div className="flex min-w-0 items-center justify-center">
          {currentLesson && notebook ? (
            <ChapterPicker notebook={notebook} currentLesson={currentLesson} />
          ) : onSubjectHome && notebook ? (
            <NotebookSearch notebooks={[notebook]} scope="single" />
          ) : !subject ? (
            <NotebookSearch notebooks={getAllNotebooks()} scope="all" />
          ) : null}
        </div>

        <div className="flex items-center justify-end gap-1.5">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
