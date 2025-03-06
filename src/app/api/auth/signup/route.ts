'use server'

import {Prisma} from "@prisma/client"
import {prisma} from "@/app/lib/prisma"
import bcrypt from "bcrypt"
const saltRounds = 10;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {email, password, publicKey} = body;


        const user = await prisma.user.findUnique({
            where: { email: email },
        })
        if(user) {
            return Response.json({error: "User already exists", status: 400});
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const data: Prisma.UserCreateInput = {
            email: email,
            password: hashedPassword,
            public_key: publicKey
        }
        const newUser = await prisma.user.create({
            data: data
        })
        if(newUser) {
            return Response.json({status: 201});
        }
        throw new Error("Something went wrong... Try again later");
        // return Response.json({ email: email, password: password, hashedPassword: hashedPassword, username: username, publicKey: publicKey, user: user, newUser: newUser });
    } catch (err) {
        return Response.json({ error: "Invalid request", err: err, status: 400 });
    }
}