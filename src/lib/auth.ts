import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

const jwtSecret = process.env.JWT_SECRET

export async function getCurrentUser() {
    const cookieStore = cookies()
    const token = cookieStore.get('sessionToken')?.value

    if (!token) return null

    try {
        const payload = jwt.verify(token, jwtSecret!)
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
            },
        })

        return user
    } catch (err) {
        return null
    }
}
