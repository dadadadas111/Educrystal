import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  return NextResponse.next({ request });
}

export const config = {
  matcher: ["/", "/home/:path*", "/catalog/:path*", "/diary/:path*", "/settings/:path*", "/admin/:path*", "/api/admin/:path*"],
};
