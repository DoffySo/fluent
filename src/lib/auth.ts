import { cookies } from 'next/headers' // ✅ для RSC
import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

const jwtSecret = process.env.JWT_SECRET!


export async function getCurrentUser() {
    const cookieStore = cookies()
    const token = cookieStore.get('sessionToken')?.value
    if (!token) return null

    try {
        const payload: any = jwt.verify(token, jwtSecret)
        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                username: true,
                phone: true,
                isAdmin: true,
                isSupport: true,
                isVerified: true,
                publicKey: true,
            },
        })
        return user
    } catch {
        return null
    }
}

export async function getCurrentUserFromRequest(req: NextRequest) {
    const token = req.cookies.get('sessionToken')?.value
    if (!token) return null

    try {
        const payload: any = jwt.verify(token, jwtSecret)
        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                username: true,
                phone: true,
                isAdmin: true,
                isSupport: true,
                isVerified: true,
                publicKey: true,
            },
        })
        return user
    } catch {
        return null
    }
}
