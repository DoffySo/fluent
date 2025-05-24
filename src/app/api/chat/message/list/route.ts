import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const chatId = searchParams.get("chat");

        if (!chatId) {
            return NextResponse.json(
                { error: "Missing chatId" },
                { status: 400 }
            );
        }

        const messages = await prisma.chatMessages.findMany({
            where: { chatId },
            orderBy: { createdAt: "asc" },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                    },
                },
            },
        });

        return NextResponse.json({ messages });
    } catch (err) {
        console.error("Error fetching messages:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
