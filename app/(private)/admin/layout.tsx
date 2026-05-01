import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return children;
}
