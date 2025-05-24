import {NextRequest, NextResponse} from "next/server"
import {prisma} from "@/lib/prisma"
import {getCurrentUser} from "@/lib/auth"

export async function POST(req: NextRequest) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    const {userId} = await req.json()

    if (!userId || userId === currentUser.id) {
        return NextResponse.json({error: "Invalid user ID"}, {status: 400})
    }

    const existingChat = await prisma.chat.findFirst({
        where: {
            type: "private",
            participants: {
                every: {
                    userId: {in: [currentUser.id, userId]},
                },
                some: {
                    userId: currentUser.id,
                },
            },
        },
        include: {
            participants: true,
        },
    })

    if (
        existingChat &&
        existingChat.participants.length === 2 &&
        existingChat.participants.some(p => p.userId === userId)
    ) {
        return NextResponse.json({chatId: existingChat.id})
    }

    const newChat = await prisma.chat.create({
        data: {
            type: "private",
            ownerId: currentUser.id,
            participants: {
                create: [
                    {userId: currentUser.id},
                    {userId},
                ],
            },
        },
    })

    return NextResponse.json({chatId: newChat.id})
}
