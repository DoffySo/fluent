import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUserFromRequest } from '@/lib/auth'
import { cookies } from 'next/headers';


export async function POST(req: NextRequest) {
    try {
        const currentUser = await getCurrentUserFromRequest(req);
        if (!currentUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }


        (await cookies()).delete('sessionToken')


        return NextResponse.json({ status: 200 });
    } catch (err) {
        console.error('Error in /api/me/logout/post:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
