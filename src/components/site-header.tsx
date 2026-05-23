"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/client";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { SUBJECTS } from "@/lib/subjects/registry";
import { cn } from "@/lib/utils";
import { ACCENT } from "@/lib/subjects/accents";

const SUBJECT_RE = /^\/subjects\/([^/]+)(?:\/([^/]+))?\/?$/;

export function SiteHeader() {
  const { dict } = useI18n();
  const pathname = usePathname();

  const match = pathname.match(SUBJECT_RE);
  const slug = match?.[1];
  const sectionKind = match?.[2];
  const subject = slug ? SUBJECTS.find((s) => s.slug === slug) : undefined;
  const sectionLabel =
    subject && sectionKind && sectionKind in dict.sections
      ? dict.sections[sectionKind as keyof typeof dict.sections]
      : undefined;

  const isHome = !subject;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <nav className="flex min-w-0 flex-1 items-center gap-1.5 text-sm">
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
            {isHome && <span>{dict.brand}</span>}
          </Link>

          {subject && (
            <>
              <Crumb subject={subject} />
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
        <div className="flex shrink-0 items-center gap-1.5">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

function Separator() {
  return (
    <span aria-hidden className="text-muted-foreground/50">
      /
    </span>
  );
}

function Crumb({ subject }: { subject: (typeof SUBJECTS)[number] }) {
  const a = ACCENT[subject.accent];
  return (
    <>
      <Separator />
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
            className={cn(
              "inline-block h-1.5 w-1.5 shrink-0 rounded-full",
              a.bg,
            )}
          />
          <span className="truncate">{subject.title}</span>
        </span>
      </Link>
    </>
  );
}
