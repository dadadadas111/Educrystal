import { redirect } from "next/navigation";

import { getCurrentUser, isCurrentUserAdmin } from "@/lib/auth";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const isAdmin = await isCurrentUserAdmin(user.id);

  if (!isAdmin) {
    redirect("/home");
  }

  return children;
}
