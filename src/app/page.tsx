import { SUBJECTS } from "@/lib/subjects/registry";
import { SubjectCard } from "@/components/subject-card";
import { getServerI18n } from "@/lib/i18n/server";

export default async function Home() {
  const { dict } = await getServerI18n();

  // Full-bleed home: header + notebook grid span the whole page, aligned to
  // the same horizontal padding as the site header (px-4 / sm:px-8 / lg:px-12).
  return (
    <div className="w-full px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
      <header className="mb-12 flex flex-col items-start gap-4">
        <h1 className="text-balance text-5xl font-semibold tracking-tighter sm:text-6xl">
          {dict.home.title}
        </h1>
        <p className="max-w-xl text-balance text-lg text-muted-foreground">
          {dict.home.subtitle}
        </p>
      </header>
      <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SUBJECTS.map((s) => (
          <SubjectCard key={s.slug} subject={s} />
        ))}
      </div>
    </div>
  );
}
