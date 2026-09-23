import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateLimit = new Map<string, { count: number; resetAt: number }>();

export function middleware(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60_000 });
  } else if (record.count >= 5) {
    return new NextResponse("Too many requests", { status: 429 });
  } else {
    record.count++;
  }

  return NextResponse.next();
}

export const config = { matcher: "/api/upload/:path*" };