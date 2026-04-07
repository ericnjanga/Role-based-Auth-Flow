import { NextResponse } from "next/server";

export async function POST() {
  // Fake "issued" tokens
  const now = Date.now();
  const accessTtLMs = 10_000; // 10s so you can see refresh happen quickly

  return NextResponse.json({
    user: { is: "1", name: "Eric", role: "admin" as const },
    accessToken: `access_${Math.random().toString(16).slice(2)}`,
    refreshToken: `refresh_${Math.random().toString(16).slice(2)}`,
    accessTokenExpiresAt: now + accessTtLMs,
  });
}
