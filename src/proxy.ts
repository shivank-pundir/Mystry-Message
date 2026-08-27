import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const pathname = request.nextUrl.pathname;

  // Routes accessible to logged-out users
  const authPages =
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/verify");

  // Logged-in users shouldn't access auth pages
  if (token && authPages) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  // Logged-out users cannot access dashboard
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(
      new URL("/sign-in", request.url)
    );
  }

  // Handle home route
  if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }

    return NextResponse.redirect(
      new URL("/home", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/sign-up",
    "/verify/:path*",
    "/dashboard/:path*",
  ],
};