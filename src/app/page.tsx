import { SUBJECTS } from "@/lib/subjects/registry";
import { SubjectCard } from "@/components/subject-card";
import { getServerI18n } from "@/lib/i18n/server";
import { SHELL_GRID, ShellContainer } from "@/components/app-shell";

export default async function Home() {
  const { dict } = await getServerI18n();

  return (
    <ShellContainer className="py-12 sm:py-16">
      <div className={`gap-6 lg:gap-8 ${SHELL_GRID}`}>
        <aside aria-hidden className="hidden lg:block" />
        <section className="min-w-0">
          <header className="mb-12 flex flex-col items-start gap-4">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {dict.home.pill}
            </span>
            <h1 className="text-balance text-5xl font-semibold tracking-tighter sm:text-6xl">
              {dict.home.title}
            </h1>
            <p className="max-w-xl text-balance text-lg text-muted-foreground">
              {dict.home.subtitle}
            </p>
          </header>
          <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {SUBJECTS.map((s) => (
              <SubjectCard key={s.slug} subject={s} />
            ))}
          </div>
        </section>
        <aside aria-hidden className="hidden lg:block" />
      </div>
    </ShellContainer>
  );
}
