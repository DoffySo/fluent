import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')

    if (!userId) {
        return NextResponse.json({ error: 'No userId' }, { status: 400 })
    }

    try {
        const chatFolders = await prisma.chatFolders.findMany({
            where: { userId: userId },
            include: {
                items: {
                    include: {
                        chat: true, // Gettings chat infos
                    },
                },
            },
        })

        return NextResponse.json(chatFolders)
    } catch (error) {
        return NextResponse.json({ error: 'Error while getting folders..' }, { status: 500 })
    }
}
