import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const pathname = request.nextUrl.pathname;

    // Routes that should be accessible only to logged-out users
    const authPages =
        pathname.startsWith("/sign-in") ||
        // pathname.startsWith("/sign-up") ||
        pathname.startsWith("/verify");

    // If user is already logged in,
    // don't allow them to visit sign-in/verify
    if (token && authPages) {
        return NextResponse.redirect(
            new URL("/dashboard", request.url)
        );
    }

    // If user is NOT logged in and tries to access dashboard
    if (!token && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(
            new URL("/sign-in", request.url)
        );
    }

    // Home page
    if (pathname === "/") {
        // Logged-in user → dashboard
        if (token) {
            return NextResponse.redirect(
                new URL("/dashboard", request.url)
            );
        }

        // Logged-out user → home page
        return NextResponse.next();
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