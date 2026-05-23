import { SUBJECTS } from "@/lib/subjects/registry";
import { SubjectCard } from "@/components/subject-card";
import { getServerI18n } from "@/lib/i18n/server";

export default async function Home() {
  const { dict } = await getServerI18n();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <section className="mb-14 flex flex-col items-start gap-4">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {dict.home.pill}
        </span>
        <h1 className="text-balance text-5xl font-semibold tracking-tighter sm:text-6xl">
          {dict.home.title}
        </h1>
        <p className="max-w-xl text-balance text-lg text-muted-foreground">
          {dict.home.subtitle}
        </p>
      </section>
      <section>
        <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map((s) => (
            <SubjectCard key={s.slug} subject={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
