export function CrystalMark() {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-[1.6rem] border-2 border-outline bg-gradient-to-br from-accent-soft via-sky/60 to-rose/55 shadow-crystal">
      <div className="absolute left-2 top-2 h-3.5 w-3.5 rounded-full bg-white/80" />
      <div className="absolute h-8 w-8 rotate-45 rounded-[1rem] border-2 border-white/80 bg-white/40" />
      <div className="absolute flex rotate-0 items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-text" />
        <span className="h-1.5 w-1.5 rounded-full bg-text" />
      </div>
      <div className="absolute bottom-4 h-2.5 w-4.5 rounded-b-full border-b-2 border-text" />
      <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-outline bg-gold text-[11px]">★</div>
    </div>
  );
}
