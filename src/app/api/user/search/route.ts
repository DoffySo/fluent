import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUserFromRequest } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('query');

        if (!query) {
            return NextResponse.json({ users: [], chats: [] });
        }

        const currentUser = await getCurrentUserFromRequest(req);
        if (!currentUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const users = await prisma.user.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            {
                                username: {
                                    contains: query,
                                    mode: 'insensitive',
                                },
                            },
                            {
                                firstName: {
                                    contains: query,
                                    mode: 'insensitive',
                                },
                            },
                            {
                                lastName: {
                                    contains: query,
                                    mode: 'insensitive',
                                },
                            },
                        ],
                    },
                    {
                        id: {
                            not: currentUser.id,
                        },
                    },
                ],
            },
        });


        return NextResponse.json({ users });
    } catch (err) {
        console.error('Error in /api/user/search/get:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
