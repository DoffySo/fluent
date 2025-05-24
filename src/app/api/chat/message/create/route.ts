import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { chatId, ciphertext, nonce } = await req.json();

        if (!chatId || !ciphertext || !nonce) {
            return NextResponse.json(
                { error: "Bad Request", message: "Missing chat, message or nonce" },
                { status: 400 }
            );
        }

        const chat = await prisma.chat.findUnique({
            where: { id: chatId },
        });

        if (!chat) {
            return NextResponse.json(
                { error: "Not Found", message: "Chat not found" },
                { status: 404 }
            );
        }

        const newMessage = await prisma.chatMessages.create({
            data: {
                chatId,
                userId: currentUser.id,
                message: ciphertext,
                messageNonce: nonce,
                ogMessage: ciphertext,
            },
        });

        return NextResponse.json({ message: newMessage }, { status: 201 });
    } catch (err) {
        console.error("Error in /api/chat/message/create/post:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
