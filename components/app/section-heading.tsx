import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {eyebrow ? (
        <p className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-outline bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-coral shadow-[0_5px_0_rgba(255,145,186,0.16)]">
          <span className="h-2.5 w-2.5 rounded-full bg-gold" />
          {eyebrow}
        </p>
      ) : null}
      <div className="space-y-2.5">
        <h1 className="max-w-4xl font-display text-[2.4rem] leading-[0.98] text-text md:text-[2.9rem] lg:text-[3.25rem]">
          {title}
        </h1>
        {description ? <p className="max-w-3xl text-sm leading-6 text-muted md:text-[15px]">{description}</p> : null}
      </div>
    </div>
  );
}
