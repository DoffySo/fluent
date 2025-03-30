import { prisma } from "./prisma";
import { randomUUID } from "crypto";
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "session_id";
const SESSION_LIFETIME = 7 * 24 * 60 * 60 * 1000; // 7 days


export async function createSession(userId: string, req: NextRequest, res: NextResponse) {
    const sessionId = randomUUID();
    const expiresAt = new Date(Date.now() + SESSION_LIFETIME);

    await prisma.session.create({
        data: {
            userId,
            token: sessionId,
            expiresAt,
            ipAddress: req.ip || "unknown",
            userAgent: req.headers.get("user-agent"),
        },
    });

    res.headers.append(
        "Set-Cookie",
        serialize(SESSION_COOKIE_NAME, sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            expires: expiresAt,
        })
    );
}


export async function getSession(req: NextRequest) {
    const sessionId = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionId) return null;

    const session = await prisma.session.findUnique({
        where: { token: sessionId },
        include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
        return null;
    }

    return session;
}


export async function destroySession(req: NextRequest, res: NextResponse) {
    const sessionId = req.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (sessionId) {
        await prisma.session.deleteMany({ where: { token: sessionId } });
    }

    res.headers.append(
        "Set-Cookie",
        serialize(SESSION_COOKIE_NAME, "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            expires: new Date(0),
        })
    );
}


export async function destroyAllSessions(userId: string) {
    await prisma.session.deleteMany({ where: { userId } });
}
