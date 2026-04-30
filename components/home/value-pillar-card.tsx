type ValuePillarCardProps = {
  title: string;
  body: string;
  index: string;
};

export function ValuePillarCard({ title, body, index }: ValuePillarCardProps) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-surface/72 p-5 shadow-soft backdrop-blur-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-soft/75 font-display text-lg text-white">
        {index}
      </div>
      <h3 className="font-display text-xl text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-text/72">{body}</p>
    </div>
  );
}
