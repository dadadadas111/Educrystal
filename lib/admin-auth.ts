import "server-only";

import { NextRequest } from "next/server";

function decodeBasicToken(authHeader: string) {
  const encoded = authHeader.replace(/^Basic\s+/i, "");
  const decoded = Buffer.from(encoded, "base64").toString("utf-8");
  const [username, password] = decoded.split(":");
  return { username, password };
}

export function isAdminAuthorized(request: NextRequest) {
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
    const { username, password } = decodeBasicToken(authHeader);
    return username === expectedUsername && password === expectedPassword;
  } catch {
    return false;
  }
}
