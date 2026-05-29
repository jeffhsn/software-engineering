"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useI18n } from "@/lib/i18n/client";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ReadingSettings } from "@/components/reading-settings";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { SUBJECTS } from "@/lib/subjects/registry";
import {
  getAllNotebooks,
  getNotebookForYear,
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
  const router = useRouter();
  const searchParams = useSearchParams();

  const match = pathname.match(SUBJECT_RE);
  const slug = match?.[1];
  const subject = slug ? SUBJECTS.find((s) => s.slug === slug) : undefined;
  const rawY = searchParams.get("y");
  const notebook = subject
    ? getNotebookForYear(subject.slug, rawY ? Number(rawY) : undefined)
    : undefined;

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
    <header className="fixed inset-x-0 top-0 z-40 h-14 bg-background shadow-[0_4px_18px_-2px_rgba(0,0,0,0.2)] dark:shadow-[0_6px_22px_-2px_rgba(0,0,0,0.7)]">
      <div className="grid h-14 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-4 sm:px-8 lg:px-12">
        <div className="flex min-w-0 items-center gap-2">
          {!subject ? (
            <Link
              href="/"
              aria-label={dict.brand}
              className="group inline-flex h-9 shrink-0 cursor-pointer items-center gap-2 rounded-full bg-foreground/[0.05] px-2.5 pe-3.5 transition-colors hover:bg-foreground/[0.1]"
            >
              <span className="text-[16px] leading-none transition-transform group-hover:-rotate-6">
                💻
              </span>
              <span className="font-serif text-[13.5px] font-semibold">
                {dict.brand}
              </span>
            </Link>
          ) : (
            <>
              {/* Home logo button — icon only, its own pill. */}
              <Link
                href="/"
                aria-label={dict.brand}
                className="group inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground/[0.05] transition-colors hover:bg-foreground/[0.1]"
              >
                <span className="text-[16px] leading-none transition-transform group-hover:-rotate-6">
                  💻
                </span>
              </Link>
              {/* Current subject — its own pill. */}
              <Link
                href={`/subjects/${subject.slug}`}
                className="group inline-flex h-9 min-w-0 items-center gap-2 rounded-full bg-foreground/[0.05] px-3.5 transition-colors hover:bg-foreground/[0.1]"
              >
                <span className="shrink-0 text-[16px] leading-none transition-transform group-hover:-rotate-6">
                  {subject.emoji}
                </span>
                <span className="truncate font-serif text-[13.5px] font-medium text-foreground">
                  {subject.title}
                </span>
              </Link>
              {notebook && (
                <YearPicker
                  current={notebook}
                  available={getNotebooksForSubject(notebook.subject)}
                  onSelect={(n) =>
                    router.push(`/subjects/${notebook.subject}?y=${n.year}&l=1`)
                  }
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
          <ReadingSettings />
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
