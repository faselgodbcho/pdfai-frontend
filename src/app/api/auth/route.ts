import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function POST(req: NextRequest) {
  if (!BACKEND_URL) {
    return NextResponse.json(
      { error: "BACKEND_BASE_URL environment variable is not set" },
      { status: 500 }
    );
  }

  try {
    const url = new URL(req.url);
    const mode = url.searchParams.get("mode");

    if (!mode || !["login", "register"].includes(mode)) {
      return NextResponse.json(
        { error: "Invalid auth mode, must be 'login' or 'register'" },
        { status: 400 }
      );
    }

    const endpoint = mode === "login" ? "/auth/token/" : "/auth/register/";
    const body = await req.json();

    const backendRes = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!backendRes.ok) {
      const errorData = await backendRes.json().catch(() => null);
      return NextResponse.json(
        { error: errorData?.detail || "Backend error" },
        { status: backendRes.status }
      );
    }

    const data = await backendRes.json();

    const response = NextResponse.json(data, {
      status: backendRes.status,
    });

    const setCookie = backendRes.headers.get("set-cookie");
    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
    }

    return response;
  } catch (error) {
    console.error("Auth route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
