import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPaths = [
    '/dashboard',
    '/p2p',
    '/transactions',
    '/transfer',
    '/userInfo'
];

export async function middleware(req: NextRequest) {

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;
    console.log(token)
 
    if (pathname === "/") {
        return NextResponse.next();
    }
    if (token) {

        if (pathname === "/signin" || pathname === "/signup") {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        return NextResponse.next();
    }

    if (protectedPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|public).*)',
    ],
};