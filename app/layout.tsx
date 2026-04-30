import type { Metadata } from "next";
import { Baloo_2, Be_Vietnam_Pro } from "next/font/google";

import { AppShell } from "@/components/app/app-shell";

import "./globals.css";

const bodyFont = Be_Vietnam_Pro({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const displayFont = Baloo_2({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-display",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Educrystal",
  description: "Ứng dụng học nuôi tinh thể vui tươi theo hành trình riêng.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className={`${bodyFont.variable} ${displayFont.variable} font-body antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
