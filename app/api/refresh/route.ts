import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const refreshToken = body?.refreshToken;

  if (
    !refreshToken ||
    typeof refreshToken !== "string" ||
    !refreshToken.startsWith("refresh_")
  ) {
    return NextResponse.json(
      { code: "INVALID_REFRESH", message: "Invalid refresh token" },
      { status: 401 }
    );
  }

  const now = Date.now();
  const accessTtlMs = 10_000;

  return NextResponse.json({
    accessToken: `access_${Math.random().toString(16).slice(2)}`,
    // optionally rotate refresh token:
    refreshToken: `refresh_${Math.random().toString(16).slice(2)}`,
    accessTokenExpiresAt: now + accessTtlMs,
  });
}
