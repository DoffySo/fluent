import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const userId = Number(params.id);

        if (isNaN(userId)) {
            return NextResponse.json({ error: "Invalid ID", status: 400, message: "ID must be a number" });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                email: true,
                first_name: true,
                last_name: true,
                username: true,
                phone_number: true,
                public_key: true,
            }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found", status: 404, message: "User doesn't exist or session expired", user: user });
        }

        return NextResponse.json({ user });

    } catch (err) {
        return NextResponse.json({ error: "Database error", status: 500, message: "An error occurred" });
    }
}
