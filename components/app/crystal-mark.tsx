export function CrystalMark() {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-accent-soft/80 via-white/10 to-rose/20 shadow-crystal">
      <div className="absolute h-8 w-8 rotate-45 rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm" />
      <div className="absolute h-4 w-4 rounded-full bg-accent/80 blur-sm" />
    </div>
  );
}
