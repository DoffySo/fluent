'use server'

import {Prisma} from "@prisma/client"
import {prisma} from "@/app/lib/prisma"
import bcrypt from "bcrypt"
import {NextRequest} from "next/server";

export async function POST(req: NextRequest) {
}