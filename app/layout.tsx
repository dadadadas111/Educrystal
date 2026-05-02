import type { Metadata, Viewport } from "next";
import { Baloo_2, Be_Vietnam_Pro } from "next/font/google";

import "./globals.css";
import AuthListener from "@/components/auth/auth-listener";

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
  description: "Học nuôi tinh thể bằng giao diện mobile-first thân thiện với trẻ em.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Educrystal",
  },
};

export const viewport: Viewport = {
  themeColor: "#fff6d8",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className={`${bodyFont.variable} ${displayFont.variable} font-body antialiased`}>
        <AuthListener />
        {children}
      </body>
    </html>
  );
}
