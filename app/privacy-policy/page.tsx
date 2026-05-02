import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Educrystal",
  description: "Privacy Policy for Educrystal.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="panel-soft space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Legal</p>
          <h1 className="font-display text-4xl text-slate-900">Privacy Policy</h1>
          <p className="text-sm leading-6 text-slate-600">How Educrystal handles account and learning data.</p>
        </div>

        <section className="space-y-3 text-sm leading-7 text-slate-700">
          <p>Educrystal stores your account details, learning progress, and content you save in the app to make the experience work across sessions.</p>
          <p>If you sign in with Google, we may store the Google refresh token server-side so we can sync reminders to Google Calendar on your behalf.</p>
          <p>We do not sell your personal data. We only use it to provide the product features you request.</p>
          <p>If you want data removal or have questions, please contact the app owner.</p>
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
