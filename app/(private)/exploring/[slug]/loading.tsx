import { Loader2 } from "lucide-react";

export default function BlogDetailLoading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-20 rounded-full bg-slate-200 animate-pulse" />
      <div className="rounded-2xl border-2 border-outline bg-white p-6 shadow-soft space-y-4">
        <div className="aspect-video rounded-xl bg-slate-200 animate-pulse" />
        <div className="h-8 w-3/4 rounded-lg bg-slate-200 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
          <div className="h-4 w-full rounded bg-slate-200 animate-pulse" />
          <div className="h-4 w-2/3 rounded bg-slate-200 animate-pulse" />
        </div>
      </div>
      <div className="flex justify-center gap-4 py-4">
        <div className="h-12 w-20 rounded-full bg-slate-200 animate-pulse" />
        <div className="h-12 w-20 rounded-full bg-slate-200 animate-pulse" />
      </div>
    </div>
  );
}