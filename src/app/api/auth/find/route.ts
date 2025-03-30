'use server'

import {prisma} from "@/app/lib/prisma"

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {email} = body;
        const user = await prisma.user.findUnique({
            where: { email: email },
            select: {
                email: true,
            }
        })
        if(!user) {
            return Response.json({error: "User don't exist", status: 400, userExists: false});
        }
        return Response.json({status: 201});
    } catch (err) {
        return Response.json({ error: "Invalid request", err: err, status: 400 });
    }
}