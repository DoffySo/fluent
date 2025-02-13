import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";

export async function middleware(req: Request) {
    const url = new URL(req.url);
    const session = await getSession();

    if (session && ["/signin", "/signup"].includes(url.pathname)) {
        return NextResponse.redirect(new URL("/chat", req.url));
    }

    if (!session && url.pathname.startsWith("/chat")) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/signin", "/signup", "/chat/:path*"],
};
