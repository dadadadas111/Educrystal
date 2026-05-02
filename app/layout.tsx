import type { Metadata, Viewport } from "next";
import { Baloo_2, Be_Vietnam_Pro } from "next/font/google";

import "./globals.css";
import AuthListener from "@/components/auth/auth-listener";
import { getSiteUrl } from "@/lib/supabase";

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

const siteUrl = getSiteUrl() ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Educrystal",
  description: "Học nuôi tinh thể bằng giao diện mobile-first thân thiện với trẻ em.",
  metadataBase: new URL(siteUrl),
  manifest: "/manifest.webmanifest",
  applicationName: "Educrystal",
  icons: {
    icon: [
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Educrystal",
    description: "Học nuôi tinh thể bằng giao diện mobile-first thân thiện với trẻ em.",
    images: [{ url: "/logo.png", width: 3000, height: 3000, alt: "Educrystal logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Educrystal",
    description: "Học nuôi tinh thể bằng giao diện mobile-first thân thiện với trẻ em.",
    images: ["/logo.png"],
  },
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
