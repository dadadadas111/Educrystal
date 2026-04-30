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
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent/82">{eyebrow}</p>
      ) : null}
      <div className="space-y-2.5">
        <h1 className="max-w-4xl font-display text-[2.3rem] leading-[1.02] text-white md:text-[2.7rem] lg:text-[3rem]">
          {title}
        </h1>
        {description ? <p className="max-w-3xl text-sm leading-6 text-text/72 md:text-[15px]">{description}</p> : null}
      </div>
    </div>
  );
}
