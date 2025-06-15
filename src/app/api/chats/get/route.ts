import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUserFromRequest } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
    try {
        const user = await getCurrentUserFromRequest(req)
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const chats = await prisma.chat.findMany({
            where: {
                participants: {
                    some: {
                        userId: user.id,
                    },
                },
            },
        })

        return NextResponse.json(chats)
    } catch (err) {
        console.error('Error in /api/chats/get:', err)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
