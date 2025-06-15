import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {undefined} from "zod";

export async function POST(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        const { chatId, messageId } = await req.json();

        if(!chatId || !messageId) {
            return NextResponse.json({error: "Bad Request"}, {status: 400});
        }

        const read = await prisma.messageRead.create({
            data: {
                chatId: chatId,
                messageId: messageId,
                userId: currentUser?.id,
            }
        })

        // if(!read) {
        //     return NextResponse.json({error: "Bad Request", data: read}, {status: 400});
        // }
        return NextResponse.json({message: "Readed", read: read}, {status: 200})
    } catch (err) {
        console.error("Error in /api/chat/message/read/post:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}