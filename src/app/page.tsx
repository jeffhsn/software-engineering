import { SUBJECTS } from "@/lib/subjects/registry";
import { SubjectCard } from "@/components/subject-card";

export default function Home() {
  // Full-bleed home: just the notebook grid (no title/subtitle — the cards
  // already read as notebooks), aligned to the site header's padding.
  return (
    <div className="w-full px-4 py-8 sm:px-8 sm:py-12 lg:px-12">
      <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SUBJECTS.map((s) => (
          <SubjectCard key={s.slug} subject={s} />
        ))}
      </div>
    </div>
  );
}
