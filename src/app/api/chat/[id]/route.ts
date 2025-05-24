import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;

        if (!id) {
            return NextResponse.json({ error: 'Chat id is required' }, { status: 400 });
        }

        const currentUser = await getCurrentUserFromRequest(req);
        if (!currentUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const chat = await prisma.chat.findUnique({
            where: { id },
            include: {
                participants: {
                    include: { user: true },
                },
            },
        });

        if (!chat) {
            return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
        }

        if (chat.type === 'private') {
            if (chat.participants.length !== 2) {
                return NextResponse.json({ error: 'Invalid private chat' }, { status: 500 });
            }

            const [a, b] = chat.participants;
            const other = a.userId === currentUser.id ? b : a;

            return NextResponse.json({
                type: 'private',
                id: chat.id,
                name: `${other.user.firstName} ${other.user.lastName ?? ''}`.trim(),
                status: 'unknown',
            });
        }

        return NextResponse.json({
            type: chat.type,
            id: chat.id,
            name: chat.title ?? 'Unnamed Chat',
            status: `${chat.participants.length} members`,
        });
    } catch (err) {
        console.error('Error in GET /api/chat/[id]:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
