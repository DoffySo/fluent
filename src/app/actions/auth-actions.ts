"use server"
import { z } from "zod"
import bcrypt from "bcrypt"
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { serialize } from 'cookie' // Добавь библиотеку cookie, если она не подключена

const jwtSecret = process.env.JWT_SECRET

const authSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters",
    }).max(24, {
        message: "Password must be between 6 and 24 characters",
    }),
})

export async function authUserAction(prevState: any, formData: FormData) {
    let userObj;
    const validatedFields = authSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    })

    if (!validatedFields.success) {
        return {
            ...prevState,
            zodErrors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to sign in",
        }
    }

    const { email, password } = validatedFields.data;

    const user = await prisma.user.findUnique({
        where: { email: email }, select: {
            id: true,
            email: true,
            passwordHash: true
        }
    })

    if (user) {
        if (!bcrypt.compareSync(password, user.passwordHash)) {
            userObj = {
                ok: false
            }
        } else {
            const sessionToken = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, { expiresIn: '365d' })

            await prisma.session.create({
                data: {
                    userId: user.id,
                    sessionToken,
                    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 365 days
                }
            })

            // Здесь добавлен код для работы с cookies
            cookies().set('sessionToken', sessionToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 365 * 24 * 60 * 60, // 1 год
                path: '/',
            })

            userObj = {
                email: user.email,
                ok: true,
                sessionToken,
            }
        }
    } else {
        const hashedPassword = bcrypt.hashSync(password, 10)
        const newUser = await prisma.user.create({
            data: {
                firstName: email, // Ты можешь изменить это, чтобы добавить реальное имя
                email: email,
                passwordHash: hashedPassword,
            }
        })

        const sessionToken = jwt.sign({ userId: newUser.id, email: newUser.email }, jwtSecret, { expiresIn: '365d' })

        await prisma.session.create({
            data: {
                userId: newUser.id,
                sessionToken,
                expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 365 дней
            }
        })

        cookies().set('sessionToken', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 365 * 24 * 60 * 60, // 1 год
            path: '/',
        })

        userObj = {
            email: newUser.email,
            ok: true,
            sessionToken,
        }
    }

    return {
        ...prevState,
        zodErrors: {},
        data: "ok",
        user: userObj
    }
}
