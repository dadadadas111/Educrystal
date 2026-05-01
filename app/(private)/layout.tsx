import { AppStateMigrator } from "@/components/app-state-migrator";
import { SiteShell } from "@/components/site-shell";

type PrivateLayoutProps = {
  children: React.ReactNode;
};

export const dynamic = "force-dynamic";

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <SiteShell userEmail={null} isAdmin={true}>
      <AppStateMigrator />
      {children}
    </SiteShell>
  );
}
