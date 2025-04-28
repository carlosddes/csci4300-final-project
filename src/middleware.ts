import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

const middleware = async(request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const session = await auth();
    const isAuthenticated = !!session?.user;
    console.log(isAuthenticated, pathname);

    const publicPaths = ["/", "/login", "/register"];
    const blockedForLoggedIn = ["/login", "/register"];

    if (!isAuthenticated && !publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isAuthenticated && blockedForLoggedIn.includes(pathname)) {
        return NextResponse.redirect(new URL("/overview", request.url));
    }

    return NextResponse.next();
};

export const config = {
    matcher: [
        "/overview",
        "/expenses",
        "/income",
        "/login",
        "/register",
        "/savings",
        "/chat"
    ]
}

export default middleware;