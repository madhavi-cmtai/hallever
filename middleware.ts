import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const userCookie = request.cookies.get("user")?.value;
    let user = null;
    
    try {
        user = userCookie ? JSON.parse(decodeURIComponent(userCookie)) : null;
    } catch { }

    // Public routes that don't require authentication
    const publicRoutes = ["/", "/login", "/signup", "/about", "/contact", "/products", "/blogs", "/careers"];
    const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route + "/"));

    // If it's a public route, allow access
    if (isPublicRoute) {
        return NextResponse.next();
    }

    // If user is not authenticated, redirect to login
    if (!user) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Protect admin routes (/dashboard)
    if (pathname.startsWith("/dashboard")) {
        if (user.role !== "admin") {
            return NextResponse.redirect(new URL("/users", request.url));
        }
    }

    // Protect user routes (/profile)
    if (pathname.startsWith("/users")) {
        if (user.role === "admin") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*", 
        "/users/:path*",
        "/login",
        "/signup",
        "/about",
        "/contact",
        "/products/:path*",
        "/blogs/:path*",
        "/careers/:path*"
    ]
};