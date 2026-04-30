export function CrystalMark() {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-accent-soft/75 via-surface/80 to-rose/24 shadow-crystal">
      <div className="absolute inset-2 rounded-full bg-accent/14 blur-md" />
      <div className="absolute h-8 w-8 rotate-45 rounded-[0.95rem] border border-white/30 bg-gradient-to-br from-white/36 to-accent/18 backdrop-blur-sm" />
      <div className="absolute left-3 top-3 h-3.5 w-3.5 rotate-12 rounded-[0.55rem] border border-white/20 bg-white/24" />
      <div className="absolute h-4 w-4 rounded-full bg-accent/75 blur-sm" />
    </div>
  );
}
