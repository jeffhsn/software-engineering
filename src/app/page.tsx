import { SUBJECTS } from "@/lib/subjects/registry";
import { SubjectCard } from "@/components/subject-card";
import { getServerI18n } from "@/lib/i18n/server";

export default async function Home() {
  const { dict } = await getServerI18n();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <section className="mb-10 flex flex-col items-start gap-3">
        <span className="rounded-full border border-border/70 bg-card px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {dict.home.pill}
        </span>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {dict.home.title}
        </h1>
        <p className="max-w-xl text-base text-muted-foreground">
          {dict.home.subtitle}
        </p>
      </section>
      <section>
        <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SUBJECTS.map((s) => (
            <SubjectCard key={s.slug} subject={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
