import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function POST(req: NextRequest) {
  if (!BACKEND_URL) {
    return NextResponse.json(
      { error: "BACKEND_BASE_URL not set" },
      { status: 500 }
    );
  }

  try {
    const backendRes = await fetch(`${BACKEND_URL}/auth/logout/`, {
      method: "POST",
      headers: {
        cookie: req.headers.get("cookie") || "",
      },
    });

    const data = await backendRes.json();

    const response = NextResponse.json(data, { status: backendRes.status });

    const setCookie = backendRes.headers.get("set-cookie");
    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
    }

    return response;
  } catch (error) {
    console.error("Logout proxy error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
