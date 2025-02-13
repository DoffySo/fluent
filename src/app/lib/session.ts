"use server";

import { cookies } from "next/headers";
import { prisma } from "@/app/lib/prisma";
import { randomBytes } from "node:crypto";

const generateToken = async () => randomBytes(32).toString("hex");

export async function createSession(user_id: number) {
    const token = await generateToken();
    const expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days

    const user = await prisma.user.findFirst({
        where: {
            id: user_id,
        },
        select: {
            id: true,
            email: true,
        }
    })
    if(!user) return null;

    const session = await prisma.userSessions.create({
        data: {
            token, expires_at,
            user: {
                connect: {
                    id: user.id,
                    email: user.email
                }
            }
        }
    });

    const cookieStore = await cookies();
    cookieStore.set("session", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 30 // 30 days (in seconds)
    });

    return session;
}

export async function getSession() {
    const cookieStore = await cookies();
    const session_token = cookieStore.get("session")?.value;
    if (!session_token) return null;

    const session = await prisma.userSessions.findFirst({
        where: {
            token: session_token
        },
        select: {
            user: {
                select: {
                    id: true,
                    email: true
                }
            },
            user_id: true,
            token: true
        }
    });

    if (!session) return null;

    return session;
}

export async function deleteSession() {
    const cookieStore = await cookies();
    const session_token = cookieStore.get("session")?.value;
    if (!session_token) return;

    try {
        await prisma.userSessions.deleteMany({
            where: { token: session_token }
        });
    } catch (err) {
        console.warn("Session already deleted or not found", err);
    }

    cookieStore.set("session", "", { httpOnly: true, path: "/", maxAge: 0 });
}
