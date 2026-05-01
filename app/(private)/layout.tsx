import { redirect } from "next/navigation";

import { AppStateMigrator } from "@/components/app-state-migrator";
import { SiteShell } from "@/components/site-shell";
import { getCurrentUser, isCurrentUserAdmin } from "@/lib/auth";

type PrivateLayoutProps = {
  children: React.ReactNode;
};

export const dynamic = "force-dynamic";

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const isAdmin = await isCurrentUserAdmin(user.id);

  return (
    <SiteShell userEmail={user.email ?? null} isAdmin={isAdmin}>
      <AppStateMigrator />
      {children}
    </SiteShell>
  );
}
