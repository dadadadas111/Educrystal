import { NextResponse, type NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase-middleware";

const protectedPrefixes = ["/home", "/catalog", "/diary", "/settings", "/admin"];

function isProtectedPath(pathname: string) {
  return protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function isAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/api/admin/");
}

function decodeBasicAuthHeader(authHeader: string) {
  const encoded = authHeader.replace(/^Basic\s+/i, "");
  const decoded = atob(encoded);
  const separatorIndex = decoded.indexOf(":");

  if (separatorIndex < 0) {
    return null;
  }

  return {
    username: decoded.slice(0, separatorIndex),
    password: decoded.slice(separatorIndex + 1),
  };
}

function isAdminBasicAuthValid(request: NextRequest) {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    return false;
  }

  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.toLowerCase().startsWith("basic ")) {
    return false;
  }

  try {
    const decoded = decodeBasicAuthHeader(authHeader);

    if (!decoded) {
      return false;
    }

    return decoded.username === expectedUsername && decoded.password === expectedPassword;
  } catch {
    return false;
  }
}

function unauthorizedAdminResponse() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Educrystal Admin", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAdminPath(pathname) && !isAdminBasicAuthValid(request)) {
    return unauthorizedAdminResponse();
  }

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
  matcher: ["/", "/home/:path*", "/catalog/:path*", "/diary/:path*", "/settings/:path*", "/admin/:path*", "/api/admin/:path*"],
};
