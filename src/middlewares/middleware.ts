import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    response.headers.set("x-pathname", request.nextUrl.pathname);
    return response;
}

export const config = {
    matcher: ["/app/:path*"], // только для страниц внутри /app
};
