import { encrypt, decrypt, generateKey } from "./encrypt";
import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "session_id";
const SESSION_KEY = generateKey();

// Создание сессии
export async function createSession(userId: string, res: NextResponse) {
    const encrypted = encrypt(userId, SESSION_KEY);
    res.headers.append("Set-Cookie", `${COOKIE_NAME}=${encrypted}; HttpOnly; Secure; SameSite=Lax; Path=/`);
}

// Проверка сессии
export async function getSession(req: NextRequest) {
    const sessionCookie = req.cookies.get(COOKIE_NAME)?.value;
    if (!sessionCookie) return null;

    return decrypt(sessionCookie, SESSION_KEY);
}

// Удаление сессии
export async function destroySession(res: NextResponse) {
    res.headers.append("Set-Cookie", `${COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`);
}
