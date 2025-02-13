'use server'

import {prisma} from "@/app/lib/prisma"
import bcrypt from "bcrypt"
const saltRounds = 10;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {email, password} = body;
        const user = await prisma.user.findUnique({
            where: { email: email },
            select: {
                email: true,
                password: true,
                id: true
            }
        })
        if(!user) {
            return Response.json({error: "User don't exist", status: 400, userExists: false});
        }
        const verified = await bcrypt.compare(password, user.password!)
        if(verified) {
            return Response.json({status: 201});
        } else {
            return Response.json({status: 400, verified: false});
        }
        // await bcrypt.compareSync(password, user.password!, (err, result) => {
        //     if(err) {
        //         return Response.json({error: "An error occurred", errorInfo: err, status: 400});
        //     }
        //     if(result) {
        //         return Response.json({password: "matched"})
        //     } else {
        //         return Response.json({password: "not matched"})
        //     }
        // })
    } catch (err) {
        return Response.json({ error: "Invalid request", err: err, status: 400 });
    }
}