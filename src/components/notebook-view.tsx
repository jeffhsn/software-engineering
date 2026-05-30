"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { figureComponents } from "@/components/prose-figure";
import { PageSkeleton } from "@/components/pdf-skeleton";
import type {
  Lesson,
  Notebook,
  PdfRef,
} from "@/lib/notebooks/types";
import type { LocalizedText } from "@/lib/i18n/types";
import { clampedIndex, setLessonInUrl } from "@/lib/notebooks/nav";
import { setChromeHidden, useChromeHidden } from "@/lib/chrome-visibility";
import { useI18n } from "@/lib/i18n/client";
import {
  useContentText,
  notebookOf,
  contentKey,
  seedContent,
} from "@/lib/i18n/content-client";
import {
  getExplanation,
  getQuizSet,
  seedContentObjects,
} from "@/lib/notebooks/content-objects-client";
import type { Explanation } from "@/lib/notebooks/explanation-types";
import type { QuizSet } from "@/lib/notebooks/quiz-types";
import { LBL } from "@/lib/notebooks/labels-i18n";
import { QuizPlayer } from "@/components/quiz-player";
import { getSubject } from "@/lib/subjects/registry";
import { ACCENT_INK } from "@/lib/subjects/accents";
import {
  ChevronLeft,
  ChevronRight,
  PenLine,
  PlayCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PdfViewer = dynamic(
  () => import("./pdf-viewer").then((m) => m.PdfViewer),
  {
    ssr: false,
    loading: () => (
      // Shown only while the viewer chunk first loads. Full-width slide shape
      // (16:9) so it matches the placeholder the viewer keeps showing — no
      // fixed-pixel box that resizes a frame later.
      <div className="w-full px-4 py-4 sm:px-6">
        <PageSkeleton aspect={0.5625} srLabel="Wird geladen" />
      </div>
    ),
  },
);

interface Props {
  notebook: Notebook;
  /**
   * This notebook's heavy content objects, resolved on the server so the
   * client bundle never imports the all-notebooks registries. Seeded into
   * content-objects-client for synchronous by-id lookups in the panels + the
   * overlay.
   */
  content?: { explanations: Explanation[]; quizSets: QuizSet[] };
  /**
   * The active locale's deep-content map, read on the server and embedded in
   * the HTML so explanations/quizzes render instantly (no post-paint fetch).
   * Absent for German (the bundled fallback) and while translations are empty.
   */
  initialContent?: { key: string; locale: string; map: Record<string, string> };
}

/**
 * NotebookView always opens straight into a chapter — there is no
 * separate notebook home. `?l=N` selects the chapter; with no param it
 * defaults to chapter 1 (the subject route also redirects bare URLs to
 * `?l=1` server-side so the header stays in sync).
 */
export function NotebookView({ notebook, content, initialContent }: Props) {
  // Seed synchronously during render so the child panes (and the layout-level
  // overlay, which renders after this) resolve content + translations on their
  // very first render. Both are idempotent.
  if (content) {
    seedContentObjects(content.explanations, content.quizSets);
  }
  if (initialContent) {
    seedContent(initialContent.key, initialContent.locale, initialContent.map);
  }
  const searchParams = useSearchParams();
  const rawL = searchParams.get("l");
  const index = clampedIndex(parseInt(rawL ?? "1") - 1, notebook.lessons.length);
  return <ChapterView notebook={notebook} lessonIndex={index} />;
}

/* ─────────────────────── Chapter View ─────────────────────── */

type LeftKey = "lecture" | `uebung-${number}`;
type RightLectureKey = "tief" | "einfach" | "quiz";
type RightUebungKey = "loesung" | "walkthrough";

/**
 * One material can hold several sources that all belong to the SAME chip —
 * e.g. a lecture with slides + a video recording, or an Übung with a German
 * and an English Aufgaben sheet. A small secondary chip row switches between
 * them and only the selected one renders, so loading stays identical to a
 * single-source material regardless of notebook or year.
 */
type LeftVariant =
  | { key: string; label: LocalizedText; kind: "pdf"; src: string }
  | { key: string; label: LocalizedText; kind: "video"; url: string };

function ChapterView({
  notebook,
  lessonIndex,
}: {
  notebook: Notebook;
  lessonIndex: number;
}) {
  const { tr } = useI18n();
  const lesson = notebook.lessons[lessonIndex];
  const prev = lessonIndex > 0 ? notebook.lessons[lessonIndex - 1] : undefined;
  const next =
    lessonIndex + 1 < notebook.lessons.length
      ? notebook.lessons[lessonIndex + 1]
      : undefined;

  const exercises = lesson.exercises.filter(
    (e) => (e.aufgaben?.length ?? 0) > 0 || e.solutions.length > 0,
  );

  const [leftKey, setLeftKey] = useState<LeftKey>("lecture");
  const [rightLecture, setRightLecture] = useState<RightLectureKey>("tief");
  const [rightUebung, setRightUebung] =
    useState<RightUebungKey>("loesung");
  const [solutionIdx, setSolutionIdx] = useState(0);
  // Mobile only: which column page the swipe track is on (0 = material,
  // 1 = help). On lg+ both columns show and this is ignored.
  const [mobilePage, setMobilePage] = useState(0);
  // Which source (slides/video, DE/EN, …) of the active left material shows.
  // null = the first/default variant.
  const [leftVariant, setLeftVariant] = useState<string | null>(null);
  const leftScrollRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  // Reset to lecture chip + scroll each column to top on chapter change.
  const lastSeen = useRef<number | null>(null);
  useEffect(() => {
    if (lastSeen.current !== lesson.number) {
      lastSeen.current = lesson.number;
      setLeftKey("lecture");
      setRightLecture("tief");
      setRightUebung("loesung");
      setSolutionIdx(0);
      setMobilePage(0);
      setChromeHidden(false);
      leftScrollRef.current?.scrollTo({ top: 0 });
      rightScrollRef.current?.scrollTo({ top: 0 });
      mobileTrackRef.current?.scrollTo({ left: 0 });
    }
  }, [lesson.number]);

  // Switching the primary material (Vorlesung ↔ Übung, or between Übungen)
  // always starts at that material's first variant.
  useEffect(() => {
    setLeftVariant(null);
    leftScrollRef.current?.scrollTo({ top: 0 });
  }, [leftKey]);

  // ← / → keyboard navigation between chapters. Skip when typing.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowLeft" && prev) {
        e.preventDefault();
        setLessonInUrl(prev.number);
      } else if (e.key === "ArrowRight" && next) {
        e.preventDefault();
        setLessonInUrl(next.number);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  // Immersive reading on mobile: hide the chrome (header, chips, bottom nav)
  // while scrolling down, bring it back when scrolling up or when the scroll
  // settles — like the X app. Desktop is never affected.
  useEffect(() => {
    const els = [leftScrollRef.current, rightScrollRef.current].filter(
      Boolean,
    ) as HTMLDivElement[];
    if (els.length === 0) return;
    const last = new WeakMap<HTMLElement, number>();
    let idle: ReturnType<typeof setTimeout>;
    const onScroll = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      if (window.innerWidth >= 1024) {
        setChromeHidden(false);
        return;
      }
      const top = el.scrollTop;
      const prev = last.get(el) ?? 0;
      last.set(el, top);
      if (top < 56) setChromeHidden(false);
      else if (top - prev > 6) setChromeHidden(true);
      else if (prev - top > 6) setChromeHidden(false);
      clearTimeout(idle);
      idle = setTimeout(() => setChromeHidden(false), 240);
    };
    els.forEach((el) =>
      el.addEventListener("scroll", onScroll, { passive: true }),
    );
    return () => {
      clearTimeout(idle);
      els.forEach((el) => el.removeEventListener("scroll", onScroll));
      setChromeHidden(false);
    };
  }, []);

  const onLecture = leftKey === "lecture";
  const activeExerciseIdx = onLecture
    ? -1
    : parseInt(leftKey.replace("uebung-", ""), 10);
  const activeExercise =
    activeExerciseIdx >= 0 ? exercises[activeExerciseIdx] : undefined;

  // Variants of the active left material. A lecture is its slides plus, if
  // present, a video recording; an Übung is each of its Aufgaben sheets (e.g.
  // German + English). Only the selected variant renders below.
  const leftVariants: LeftVariant[] = onLecture
    ? [
        {
          key: "folien",
          label: LBL.folien,
          kind: "pdf",
          src: lesson.lecture.pdf.src,
        },
        ...(lesson.lecture.videoUrl
          ? [
              {
                key: "video",
                label: LBL.video,
                kind: "video" as const,
                url: lesson.lecture.videoUrl,
              },
            ]
          : []),
      ]
    : (activeExercise?.aufgaben ?? []).map((a, i) => ({
        key: `a-${i}`,
        label: a.label,
        kind: "pdf" as const,
        src: a.src,
      }));
  const activeVariant =
    leftVariants.find((v) => v.key === leftVariant) ?? leftVariants[0];
  const leftSubChips: Chip[] =
    leftVariants.length > 1
      ? leftVariants.map((v) => ({
          key: v.key,
          label: tr(v.label),
          active: v.key === activeVariant?.key,
          onClick: () => setLeftVariant(v.key),
        }))
      : [];

  const leftChips: Chip[] = [
    {
      key: "lecture",
      label: tr(LBL.vorlesung),
      active: leftKey === "lecture",
      onClick: () => {
        setLeftKey("lecture");
        setRightLecture("tief");
      },
    },
    ...exercises.map((ex, i) => ({
      key: `uebung-${i}`,
      label: tr(ex.label) || `Übung ${i + 1}`,
      active: leftKey === `uebung-${i}`,
      onClick: () => {
        setLeftKey(`uebung-${i}` as LeftKey);
        setRightUebung("loesung");
      },
    })),
  ];

  const lectureExplanation = lesson.lecture.walkthroughId
    ? getExplanation(lesson.lecture.walkthroughId)
    : undefined;
  const hasSimpleLecture = Boolean(lectureExplanation?.simpleContent);

  const rightChips: Chip[] = onLecture
    ? hasSimpleLecture
      ? [
          {
            key: "tief",
            label: tr(LBL.tief),
            active: rightLecture === "tief",
            onClick: () => setRightLecture("tief"),
          },
          {
            key: "einfach",
            label: tr(LBL.einfach),
            active: rightLecture === "einfach",
            onClick: () => setRightLecture("einfach"),
          },
          {
            key: "quiz",
            label: tr(LBL.quiz),
            active: rightLecture === "quiz",
            onClick: () => setRightLecture("quiz"),
          },
        ]
      : [
          {
            key: "tief",
            label: tr(LBL.erklaerung),
            active: rightLecture === "tief" || rightLecture === "einfach",
            onClick: () => setRightLecture("tief"),
          },
          {
            key: "quiz",
            label: tr(LBL.quiz),
            active: rightLecture === "quiz",
            onClick: () => setRightLecture("quiz"),
          },
        ]
    : [
        {
          key: "loesung",
          label: tr(LBL.loesung),
          active: rightUebung === "loesung",
          onClick: () => setRightUebung("loesung"),
        },
        {
          key: "walkthrough",
          label: tr(LBL.loesungsweg),
          active: rightUebung === "walkthrough",
          onClick: () => setRightUebung("walkthrough"),
        },
      ];

  const subject = getSubject(notebook.subject);
  const accentInk = subject ? ACCENT_INK[subject.accent] : "var(--ink)";

  // The two pages' content, extracted so both the desktop two-column layout
  // and the mobile single-pane layout render the exact same nodes.
  const leftContent = activeVariant ? (
    activeVariant.kind === "video" ? (
      <VideoEmbed url={activeVariant.url} />
    ) : (
      <PdfBlock src={activeVariant.src} />
    )
  ) : !onLecture && activeExercise ? (
    <EmptyHint>
      {`Kein Aufgaben-PDF zu „${tr(activeExercise.label) || "dieser Übung"}“. Manchmal wird nur die Lösung veröffentlicht — schau unter „Lösung“.`}
    </EmptyHint>
  ) : null;

  const rightContent = onLecture ? (
    rightLecture === "quiz" ? (
      <QuizPanel quizBankId={lesson.lecture.quizBankId} />
    ) : (
      <ErklaerungPanel
        walkthroughId={lesson.lecture.walkthroughId}
        mode={rightLecture === "einfach" ? "simple" : "deep"}
      />
    )
  ) : activeExercise ? (
    rightUebung === "loesung" ? (
      <SolutionPanel
        solutions={activeExercise.solutions}
        activeIdx={solutionIdx}
        onChange={setSolutionIdx}
      />
    ) : (
      <ErklaerungPanel
        walkthroughId={activeExercise.walkthroughId}
        mode="deep"
        emptyHint="Noch kein Lösungsweg. Sobald ich die Lösung gelesen habe, schreibe ich einen — Schritt für Schritt, im Stil des Profs."
      />
    )
  ) : null;

  const leftProgress = onLecture;
  const rightProgress = onLecture
    ? rightLecture !== "quiz"
    : rightUebung === "walkthrough";

  const goToPage = (i: 0 | 1) => {
    const el = mobileTrackRef.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  const chromeHidden = useChromeHidden();

  return (
    <div
      style={{ ["--accent" as string]: accentInk }}
      className={cn(
        "relative w-full transition-[height] duration-300",
        // When the header slides away on mobile its spacer collapses, so the
        // reading area grows to the full viewport; desktop is unchanged.
        chromeHidden ? "h-[100dvh]" : "h-[calc(100dvh-3.5rem)]",
        "lg:h-[calc(100dvh-3.5rem)]",
      )}
    >
      {/* Centre fold — a soft book-gutter shadow instead of a hard
          divider, so the two columns read like facing pages (desktop only). */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-10 -translate-x-1/2 lg:block",
          "bg-[linear-gradient(to_right,transparent,rgba(0,0,0,0.05)_47%,rgba(0,0,0,0.08)_50%,rgba(0,0,0,0.05)_53%,transparent)]",
          "dark:bg-[linear-gradient(to_right,transparent,rgba(0,0,0,0.28)_47%,rgba(0,0,0,0.42)_50%,rgba(0,0,0,0.28)_53%,transparent)]",
        )}
      />

      {/* The two columns keep the exact same logic as the web (each owns its
          chips). On lg they sit side by side; on mobile they become two
          full-width pages you SWIPE between (CSS scroll-snap — no second
          column crammed in, no merged chips). */}
      <div
        ref={mobileTrackRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          const p = Math.round(el.scrollLeft / el.clientWidth);
          if (p !== mobilePage) setMobilePage(p === 1 ? 1 : 0);
        }}
        className={cn(
          "flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "lg:snap-none lg:overflow-x-hidden",
        )}
      >
        <div className="h-full w-full shrink-0 snap-start lg:w-1/2">
          <ColumnPane
            ariaLabel="Materialien"
            scrollRef={leftScrollRef}
            chips={leftChips}
            subChips={leftSubChips}
            progress={leftProgress}
            bottomPad
          >
            {leftContent}
          </ColumnPane>
        </div>
        <div className="h-full w-full shrink-0 snap-start lg:w-1/2">
          <ColumnPane
            ariaLabel="Hilfen"
            scrollRef={rightScrollRef}
            chips={rightChips}
            progress={rightProgress}
            bottomPad
          >
            {rightContent}
          </ColumnPane>
        </div>
      </div>

      <FloatingChapterNav
        prev={prev}
        next={next}
        mobilePage={mobilePage}
        onGoToPage={goToPage}
      />
    </div>
  );
}

/**
 * One reading column. Chips float in a pill at the top (like the
 * floating chevron nav at the bottom), the lecture progress bar runs
 * across the very top edge of the column, and the content scrolls full
 * width below — no header bar, no subheader, no borders.
 */
function ColumnPane({
  ariaLabel,
  scrollRef,
  chips,
  subChips,
  progress,
  background,
  fill,
  className,
  bottomPad,
  children,
}: {
  ariaLabel: string;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  chips: Chip[];
  /** Secondary row of smaller chips (e.g. slides/video, DE/EN). Optional. */
  subChips?: Chip[];
  progress?: boolean;
  background?: string;
  /** Let the child own the full column height (no scroll padding) — used by
      the inline quiz, which brings its own header/body/footer layout. */
  fill?: boolean;
  /** Extra classes — used to toggle mobile visibility (one page at a time). */
  className?: string;
  /** Pad the scroll bottom so content clears the floating chapter nav (mobile). */
  bottomPad?: boolean;
  children: React.ReactNode;
}) {
  const chromeHidden = useChromeHidden();
  return (
    <section
      aria-label={ariaLabel}
      className={cn(
        "relative h-full min-h-0 overflow-hidden",
        background,
        className,
      )}
    >
      {progress && <ColumnTopProgress scrollRef={scrollRef} />}

      {fill ? (
        // Child fills the column beneath the floating chips and manages its
        // own scrolling (e.g. a running quiz with its own header/body/footer).
        <div className="absolute inset-0 pt-14">{children}</div>
      ) : (
        /* Content scrolls full-bleed from the very top; the chips float
           directly over it. overscroll-contain keeps the fixed header
           steady. */
        <div
          ref={scrollRef}
          className={cn(
            // overflow-x-hidden: a column never scrolls sideways (wide prose,
            // long URLs, tables stay contained) — and it stops the vertical
            // scroller from hijacking the horizontal swipe between columns.
            "h-full overflow-y-auto overflow-x-hidden overscroll-contain",
            // Clear the floating dots + chevrons on mobile; desktop keeps none.
            bottomPad && "pb-28 lg:pb-0",
          )}
        >
          {children}
        </div>
      )}

      {/* Chips float ON TOP of the material — separate pills, no subheader.
          A secondary row (slides/video, DE/EN, …) sits just below the primary
          chips when the active material has more than one source. They slide up
          out of the way while scrolling on mobile (with the rest of the chrome). */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-20 flex min-h-16 flex-col justify-center gap-1.5 px-3 py-2 transition-all duration-300 sm:px-4",
          chromeHidden && "-translate-y-[130%] opacity-0",
          "lg:translate-y-0 lg:opacity-100",
        )}
      >
        <ChipRow chips={chips} />
        {subChips && subChips.length > 0 && <ChipRow chips={subChips} small />}
      </div>
    </section>
  );
}

/**
 * Reading-progress rule pinned to the very top edge of the column, above
 * the chips. Fills left-to-right in the subject's accent as the slides
 * are read.
 */
function ColumnTopProgress({
  scrollRef,
}: {
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const compute = () => {
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) {
        setPct(0);
        return;
      }
      setPct(
        Math.max(0, Math.min(100, Math.round((el.scrollTop / max) * 100))),
      );
    };
    compute();
    el.addEventListener("scroll", compute, { passive: true });
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", compute);
      ro.disconnect();
    };
  }, [scrollRef]);
  return (
    <div
      role="progressbar"
      aria-label="Fortschritt in den Folien"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className="pointer-events-none absolute inset-x-0 top-0 z-20 h-2.5"
    >
      <span
        className="absolute inset-y-0 inset-s-0 rounded-r-full bg-[var(--accent)] shadow-[0_0_6px_-1px_var(--accent)] transition-[width] duration-200"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/**
 * Floating chips — each is its OWN separate pill hovering over the
 * content (not grouped in a container). Active pill is a solid accent
 * fill; inactive pills are solid cards with a hairline so they stay
 * legible over whatever slide scrolls underneath. New chips just join
 * the row at the same level.
 */
function ChipRow({ chips, small }: { chips: Chip[]; small?: boolean }) {
  return (
    <div
      role="tablist"
      className="pointer-events-auto flex flex-wrap items-center gap-2"
    >
      {chips.map((c) => (
        <button
          key={c.key}
          type="button"
          role="tab"
          aria-selected={c.active}
          onClick={c.onClick}
          className={cn(
            "cursor-pointer rounded-full font-serif tracking-tight shadow-[0_5px_12px_-2px_rgba(0,0,0,0.32),0_22px_50px_-10px_rgba(0,0,0,0.8)] transition-all",
            small ? "px-3 py-1 text-[13px]" : "px-4 py-1.5 text-[15.5px]",
            c.active
              ? "bg-[var(--accent)] font-medium text-background"
              : "bg-card text-foreground hover:text-foreground",
          )}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}

/**
 * Two chevron buttons in a solid card, fixed at the center-bottom of
 * the viewport. No blur, no glass. Clicking switches the whole chapter;
 * keyboard ← / → does the same.
 */
function FloatingChapterNav({
  prev,
  next,
  mobilePage,
  onGoToPage,
}: {
  prev?: Lesson;
  next?: Lesson;
  /** Mobile column-swipe page (0/1) + jump handler; rendered between the
      chevrons as a 2-dot indicator. Hidden on lg (both columns show). */
  mobilePage: number;
  onGoToPage: (i: 0 | 1) => void;
}) {
  const chromeHidden = useChromeHidden();
  return (
    <nav
      aria-label="Kapitelnavigation"
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-6 z-30 flex items-center justify-center gap-2.5",
        "transition-all duration-300",
        // Slide out of the way while scrolling (mobile); always shown on lg.
        chromeHidden && "pointer-events-none translate-y-[200%] opacity-0",
        "lg:translate-y-0 lg:opacity-100",
      )}
    >
      <ArrowButton
        direction="prev"
        lesson={prev}
        ariaLabel="Vorheriges Kapitel"
      />
      {/* Column-swipe page dots — between the chevrons, mobile only. */}
      <div className="pointer-events-auto flex h-10 items-center gap-2 rounded-full bg-card px-3.5 shadow-[0_5px_12px_-2px_rgba(0,0,0,0.32),0_22px_50px_-10px_rgba(0,0,0,0.8)] lg:hidden">
        {([0, 1] as const).map((i) => (
          <button
            key={i}
            type="button"
            aria-label={i === 0 ? "Material" : "Hilfe"}
            aria-current={mobilePage === i}
            onClick={() => onGoToPage(i)}
            className={cn(
              "h-2 cursor-pointer rounded-full transition-all",
              mobilePage === i ? "w-5 bg-[var(--accent)]" : "w-2 bg-foreground/25",
            )}
          />
        ))}
      </div>
      <ArrowButton
        direction="next"
        lesson={next}
        ariaLabel="Nächstes Kapitel"
      />
    </nav>
  );
}

/**
 * Each chevron is its OWN separate floating pill — matching the chips:
 * solid card with a hairline + shadow, accent fill on hover, no grouping
 * container.
 */
function ArrowButton({
  direction,
  lesson,
  ariaLabel,
}: {
  direction: "prev" | "next";
  lesson?: Lesson;
  ariaLabel: string;
}) {
  const disabled = !lesson;
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={lesson ? () => setLessonInUrl(lesson.number) : undefined}
      disabled={disabled}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={cn(
        "pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full shadow-[0_5px_12px_-2px_rgba(0,0,0,0.32),0_22px_50px_-10px_rgba(0,0,0,0.8)] transition-all",
        disabled
          ? "cursor-not-allowed bg-card text-muted-foreground/30"
          : "cursor-pointer bg-card text-foreground hover:bg-[var(--accent)] hover:text-background",
      )}
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
    </button>
  );
}

/* ─────────────────────── Material panels ─────────────────────── */

/**
 * A lecture recording (or any video variant). YouTube/Vimeo URLs become an
 * embedded responsive player; anything else falls back to a plain link so the
 * user is never stuck.
 */
function VideoEmbed({ url }: { url: string }) {
  const embed = toEmbedUrl(url);
  if (!embed) {
    return (
      <div className="px-5 py-10 sm:px-8">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex cursor-pointer items-center gap-2 text-[14px] font-medium text-[var(--accent)]"
        >
          <PlayCircle className="h-5 w-5" strokeWidth={1.75} />
          <span>Aufzeichnung ansehen</span>
        </a>
      </div>
    );
  }
  return (
    <div className="px-3 py-4 sm:px-5">
      <div className="relative w-full overflow-hidden rounded-lg bg-black shadow-sm" style={{ aspectRatio: "16 / 9" }}>
        <iframe
          src={embed}
          title="Aufzeichnung"
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

/** Turn a YouTube/Vimeo watch URL into its embeddable form, else null. */
function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
      if (u.pathname.startsWith("/embed/")) return url;
    }
    if (host === "vimeo.com") {
      return `https://player.vimeo.com/video/${u.pathname.slice(1)}`;
    }
  } catch {
    return null;
  }
  return null;
}

function SolutionPanel({
  solutions,
}: {
  solutions: PdfRef[];
  activeIdx?: number;
  onChange?: (i: number) => void;
}) {
  if (solutions.length === 0) {
    return (
      <EmptyHint>
        Keine Lösung veröffentlicht. Den Lösungsweg nutzen, sobald er
        geschrieben ist.
      </EmptyHint>
    );
  }
  // Stack every variant as plain PDFs — same structure as the left
  // column's Aufgaben, no captions, so both columns read identically.
  return (
    <div className="flex flex-col">
      {solutions.map((sol, i) => (
        <PdfBlock key={i} src={sol.src} />
      ))}
    </div>
  );
}

function ErklaerungPanel({
  walkthroughId,
  mode = "deep",
  emptyHint = "Noch keine Erklärung zu diesem Kapitel. Sobald die Folien ausgearbeitet sind, schreibe ich eine tiefe + eine einfache Erklärung.",
}: {
  walkthroughId?: string;
  mode?: "deep" | "simple";
  emptyHint?: string;
}) {
  const { tr } = useI18n();
  const ct = useContentText(notebookOf(walkthroughId ?? ""));

  if (!walkthroughId) {
    return <EmptyHint>{emptyHint}</EmptyHint>;
  }
  const explanation = getExplanation(walkthroughId);
  if (!explanation) {
    return <EmptyHint>{`Kein Eintrag mit der ID „${walkthroughId}“.`}</EmptyHint>;
  }

  const useSimple = mode === "simple" && Boolean(explanation.simpleContent);
  const body = useSimple
    ? ct(
        contentKey.expl(explanation.id, "simpleContent"),
        tr(explanation.simpleContent),
      )
    : ct(contentKey.expl(explanation.id, "content"), tr(explanation.content));
  const title = tr(explanation.title);

  return (
    <article className="prose-notebook max-w-none px-5 pt-16 pb-8 text-[16px] sm:px-8">
      <h2
        className="not-prose mb-5 text-[24px] font-semibold leading-tight text-[var(--ink)]"
        style={{
          fontFamily: "var(--reading-font, var(--font-sans)), sans-serif",
        }}
      >
        {title}
      </h2>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={figureComponents}>
        {body}
      </ReactMarkdown>
    </article>
  );
}

function QuizPanel({ quizBankId }: { quizBankId?: string }) {
  if (!quizBankId) {
    return (
      <EmptyHint>
        Noch kein Quiz zu diesem Kapitel. Sobald die Vorlesung ausgearbeitet
        ist, baue ich einen Pool aus vielen Sets — Begriffe, Konzepte,
        Szenarios — ohne Format-Tells.
      </EmptyHint>
    );
  }
  const quizSet = getQuizSet(quizBankId);
  if (!quizSet) {
    return <EmptyHint>{`Kein Quiz mit der ID „${quizBankId}".`}</EmptyHint>;
  }
  // Picker, runner and summary all scroll under the floating chips like every
  // other panel — no header/footer bars. chipInset pads them clear of the chips.
  return <QuizPlayer quizSet={quizSet} chipInset />;
}

/* ─────────────────────── Chips & shared bits ─────────────────────── */

interface Chip {
  key: string;
  label: string;
  sub?: string;
  active: boolean;
  onClick: () => void;
}


/* ─────────────────────── Reusable bits ─────────────────────── */

/**
 * Expected page aspect (height / width) from the material type, so every
 * loading placeholder has the real page shape from the first frame. Lecture
 * slides are 16:9 (0.5625); all other materials (Übungen, Lösungen, Klausuren)
 * are A4 portrait (1.414). pdfjs still measures page 1 and corrects any rare
 * mismatch.
 */
const LECTURE_ASPECT = 0.5625;
const SHEET_ASPECT = 1.4142;
function pdfAspect(src: string): number {
  return src.includes("/lectures/") ? LECTURE_ASPECT : SHEET_ASPECT;
}

function PdfBlock({ src, label }: { src: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const aspect = pdfAspect(src);

  useEffect(() => {
    if (mounted || !ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "1200px 0px" },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [mounted]);

  return (
    <div ref={ref} className="w-full">
      {label && (
        <div className="border-b border-border/60 px-1 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </div>
      )}
      {mounted ? (
        <PdfViewer key={src} src={src} mode="stack" initialAspect={aspect} />
      ) : (
        // Full-width shimmer in the real page shape until the viewer mounts —
        // never a thin/tall placeholder, and the same shape the viewer then
        // keeps, so nothing morphs.
        <div className="px-3 py-1 sm:px-0">
          <PageSkeleton aspect={aspect} />
        </div>
      )}
    </div>
  );
}

function EmptyHint({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-[20rem] flex-col items-center justify-center gap-4 px-10 text-center">
      <PenLine
        aria-hidden
        className="h-7 w-7 text-muted-foreground/35"
        strokeWidth={1.25}
      />
      <p className="max-w-sm font-serif text-[16px] italic leading-relaxed text-muted-foreground/80">
        {children}
      </p>
    </div>
  );
}
