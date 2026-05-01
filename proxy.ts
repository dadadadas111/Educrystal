import { NextResponse, type NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase-middleware";

const protectedPrefixes = ["/home", "/catalog", "/diary", "/settings", "/admin"];

function isProtectedPath(pathname: string) {
  return protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { response, user } = await updateSession(request);

  if (pathname === "/" && user) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (isProtectedPath(pathname) && !user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/", "/home/:path*", "/catalog/:path*", "/diary/:path*", "/settings/:path*", "/admin/:path*"],
};
