import { NextResponse } from "next/server";

// Access tokens in this demo look like: "access_<...>"
// We also pass "x-token-exp" header so the server can “enforce” expiry
export async function GET(req: Request) {
  const auth = req.headers.get("authorization") || "";
  const expHeader = req.headers.get("x-token-exp");

  const hasAccess = auth.startsWith("Bearer access_");
  const exp = expHeader ? Number(expHeader) : NaN;
  const isExpired = !Number.isFinite(exp) || exp <= Date.now();

  if (!hasAccess || isExpired) {
    return NextResponse.json(
      { code: "UNAUTHORIZED", message: "Access token missing/expired" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    items: [
      { id: "o-100", status: "Processing" },
      { id: "o-101", status: "Shipped" },
    ],
  });
}
