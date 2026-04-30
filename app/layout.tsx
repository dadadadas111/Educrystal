import type { Metadata } from "next";

import { SiteShell } from "@/components/site-shell";

import "./globals.css";

export const metadata: Metadata = {
  title: "Educrystal",
  description: "Học nuôi tinh thể bằng giao diện mobile-first thân thiện với trẻ em.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
