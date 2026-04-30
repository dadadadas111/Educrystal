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
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent/85">{eyebrow}</p>
      ) : null}
      <div className="space-y-2">
        <h1 className="font-display text-[2.3rem] leading-tight text-white">{title}</h1>
        {description ? <p className="text-sm leading-6 text-text/75">{description}</p> : null}
      </div>
    </div>
  );
}
