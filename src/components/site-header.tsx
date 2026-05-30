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
import { SubjectPicker } from "@/components/subject-picker";
import { ChapterPicker } from "@/components/chapter-picker";
import { ChapterSidebar } from "@/components/chapter-sidebar";
import { SettingsMenu } from "@/components/settings-menu";
import { NotebookSearch } from "@/components/notebook-search";
import { clampedIndex } from "@/lib/notebooks/nav";
import { ACCENT_INK } from "@/lib/subjects/accents";
import { useChromeHidden } from "@/lib/chrome-visibility";
import { ChevronLeft } from "lucide-react";
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
  const { dict, tr } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const chromeHidden = useChromeHidden();

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
  const accent = subject ? ACCENT_INK[subject.accent] : "var(--ink)";

  // On the home page the header sits in normal flow — no fixed positioning and
  // no drop shadow. In a notebook it's the fixed, shadowed reading bar, and it
  // renders its own h-14 spacer so the content below clears it.
  const isHome = !subject;

  return (
    <>
    <header
      className={cn(
        "z-40 h-14 bg-background",
        isHome
          ? "relative"
          : "fixed inset-x-0 top-0 shadow-[0_4px_18px_-2px_rgba(0,0,0,0.2)] dark:shadow-[0_6px_22px_-2px_rgba(0,0,0,0.7)]",
        // Slide up out of the way while scrolling a notebook on mobile.
        "transition-transform duration-300",
        !isHome && chromeHidden && "-translate-y-full",
        "lg:translate-y-0",
      )}
    >
      {/* Mobile: the MIDDLE track is the flexible/truncating one (chapter title
          or search), with intrinsic side tracks (☰ / brand on the left, the
          gear on the right) — so a long title truncates instead of growing into
          the buttons. lg+: a symmetric 3-track grid keeps the middle centered. */}
      <div className="grid h-14 grid-cols-[minmax(0,auto)_minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:px-12">
        <div className="flex min-w-0 items-center gap-2">
          {!subject ? (
            <Link
              href="/"
              aria-label={dict.brand}
              className="group inline-flex h-9 min-w-0 cursor-pointer items-center gap-2 rounded-full bg-foreground/[0.05] px-2.5 pe-3.5 transition-colors hover:bg-foreground/[0.1]"
            >
              <span className="shrink-0 text-[16px] leading-none transition-transform group-hover:-rotate-6">
                💻
              </span>
              <span className="truncate font-serif text-[13.5px] font-semibold">
                {dict.brand}
              </span>
            </Link>
          ) : (
            <>
              {/* Mobile: a back chevron to the library (home) — not a logo,
                  not a home button, just "go back" like leaving a book. */}
              <Link
                href="/"
                aria-label="Zurück zur Bibliothek"
                title="Zurück zur Bibliothek"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground/[0.05] transition-colors hover:bg-foreground/[0.1] lg:hidden"
              >
                <ChevronLeft className="h-[20px] w-[20px] text-muted-foreground" strokeWidth={2} />
              </Link>
              {/* Mobile: chapter drawer (☰) replaces the in-header pickers. */}
              {notebook && (
                <span className="lg:hidden">
                  <ChapterSidebar
                    notebook={notebook}
                    currentLesson={currentLesson}
                  />
                </span>
              )}
              {/* Home logo button — desktop only; on mobile the ☰ drawer
                  carries the "Alle Notizbücher" link instead. */}
              <Link
                href="/"
                aria-label={dict.brand}
                className="group hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground/[0.05] transition-colors hover:bg-foreground/[0.1] lg:inline-flex"
              >
                <span className="text-[16px] leading-none transition-transform group-hover:-rotate-6">
                  💻
                </span>
              </Link>
              {/* Desktop: subject + year pickers (mobile uses the drawer). */}
              <span className="hidden min-w-0 items-center gap-2 lg:flex">
                <SubjectPicker current={subject} />
                {notebook && (
                  <YearPicker
                    current={notebook}
                    available={getNotebooksForSubject(notebook.subject)}
                    onSelect={(n) =>
                      router.push(`/subjects/${notebook.subject}?y=${n.year}&l=1`)
                    }
                  />
                )}
              </span>
            </>
          )}
        </div>

        <div className="flex min-w-0 items-center justify-center">
          {currentLesson && notebook ? (
            <>
              {/* Desktop: jump-to-chapter dropdown. */}
              <span className="hidden lg:block">
                <ChapterPicker notebook={notebook} currentLesson={currentLesson} />
              </span>
              {/* Mobile: read-only "where am I" label (the ☰ drawer jumps). */}
              <span className="flex min-w-0 items-center gap-1.5 lg:hidden">
                <span
                  aria-hidden
                  className="shrink-0 font-serif text-[14px] font-semibold italic tabular-nums"
                  style={{ color: accent }}
                >
                  {String(currentLesson.number).padStart(2, "0")}
                </span>
                <span className="truncate font-serif text-[13.5px] font-medium text-foreground">
                  {tr(currentLesson.title)}
                </span>
              </span>
            </>
          ) : onSubjectHome && notebook ? (
            <NotebookSearch notebooks={[notebook]} scope="single" />
          ) : !subject ? (
            <NotebookSearch notebooks={getAllNotebooks()} scope="all" />
          ) : null}
        </div>

        <div className="flex items-center justify-end gap-1.5">
          {/* Desktop: the controls stay split out as separate pills. */}
          <span className="hidden items-center gap-1.5 lg:flex">
            {subject && <ReadingSettings />}
            <ThemeSwitcher />
            <LanguageSwitcher />
          </span>
          {/* Mobile: one gear bundles theme + language + text settings. */}
          <span className="lg:hidden">
            <SettingsMenu showReading={Boolean(subject)} />
          </span>
        </div>
      </div>
    </header>
    {/* Spacer the fixed notebook header sits on. It collapses on mobile when
        the header slides away, so the reading area below grows into the space. */}
    {!isHome && (
      <div
        aria-hidden
        className={cn(
          "transition-[height] duration-300",
          chromeHidden ? "h-0" : "h-14",
          "lg:h-14",
        )}
      />
    )}
    </>
  );
}
