import type { Metadata } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";

import { AppShell } from "@/components/app/app-shell";

import "./globals.css";

const bodyFont = Be_Vietnam_Pro({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const displayFont = Playfair_Display({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-display",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Educrystal",
  description: "Ứng dụng học nuôi tinh thể theo hành trình cá nhân hóa.",
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
