import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Educrystal",
  description: "Terms of Service for Educrystal.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="panel-soft space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Legal</p>
          <h1 className="font-display text-4xl text-slate-900">Terms of Service</h1>
          <p className="text-sm leading-6 text-slate-600">The rules for using Educrystal.</p>
        </div>

        <section className="space-y-3 text-sm leading-7 text-slate-700">
          <p>Educrystal is provided for learning and personal use. Do not use it in a way that breaks the law or interferes with the service.</p>
          <p>You are responsible for the accuracy of the information you enter, including course reminders and calendar syncs.</p>
          <p>We may change or remove features as the product evolves. Continued use means you accept the updated terms.</p>
          <p>If you do not agree with these terms, please stop using the app.</p>
        </section>

        <div>
          <Link href="/" className="inline-flex rounded-full border-2 border-outline bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-soft">
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
