import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/", "/profile"];
const authRoutes = ["/login", "/register"];

async function isTokenValid(token: string): Promise<boolean> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/token/verify/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token }),
      }
    );
    return res.ok;
  } catch (err) {
    console.error("Token verification failed:", err);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("refresh_token")?.value;

  const isProtected = protectedPaths.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  if (isProtected) {
    if (!token || !(await isTokenValid(token))) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (isAuthRoute) {
    if (token && (await isTokenValid(token))) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register"],
};
