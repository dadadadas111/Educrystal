import { ProgramCard } from "@/components/catalog/program-card";
import { SectionHeading } from "@/components/app/section-heading";
import { appCopy } from "@/data/copy";
import { programs } from "@/data/programs";

export default function CatalogPage() {
  return (
    <div className="space-y-6 pb-6">
      <SectionHeading title={appCopy.catalog.title} description={appCopy.catalog.description} />

      <div className="grid gap-4">
        {programs.map((program) => (
          <ProgramCard key={program.slug} program={program} />
        ))}
      </div>
    </div>
  );
}
