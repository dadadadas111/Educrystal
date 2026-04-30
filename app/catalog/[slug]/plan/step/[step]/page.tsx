import Link from "next/link";
import { notFound } from "next/navigation";
import StepRunner from "@/components/app/step-runner";
import { getProgramBySlug, programs } from "@/data/programs";

type Props = {
  params: Promise<{ slug: string; step: string }>;
};

export function generateStaticParams() {
  return programs.flatMap((p) => p.steps.map((_, i) => ({ slug: p.slug, step: String(i) })));
}

export default async function StepPage({ params }: Props) {
  const { slug, step } = await params;
  const program = getProgramBySlug(slug);

  if (!program) return notFound();

  const idx = Number(step);
  const stepData = program.steps[idx];

  if (!stepData) return notFound();

  return (
    <div className="p-4">
      <Link href={`/catalog/${slug}/plan`} className="mb-4 inline-block text-sm text-muted">
        ← Quay lại
      </Link>

      {/* Client-side runner handles progress and navigation */}
      <StepRunner slug={slug} stepIndex={idx} />
    </div>
  );
}
