import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        const { chatId, messageId } = await req.json();

        const msg = await prisma.chatMessages.update({
            where: {
                chatId: chatId,
                id: messageId
            },
            data: {
                pinned: false
            }
        })

        return NextResponse.json({message: "Unpinned"}, {status: 200})

    } catch (err) {
        console.error("Error in /api/chat/message/unpin/post:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}