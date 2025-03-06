import { prisma } from "@/app/lib/prisma";
import { NextResponse} from "next/server";
import {NextApiRequest} from "next";

export async function GET(req: NextApiRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: "Invalid ID", status: 400, message: "ID must be a number" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: id },
            select: {
                id: true,
                email: true,
                public_key: true,
                created_at: true,
                last_seen: true,
                first_name: true,
                last_name: true,
                username: true,
                bio: true,
                birthday: true,
                phone_number: true,
                is_premium: true,
                is_support: true,
                is_admin: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found", status: 404, message: "User doesn't exist or session expired" }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });

    } catch (err) {
        console.error("Database error:", err);
        return NextResponse.json({ error: "Database error", status: 500, message: "An error occurred" }, { status: 500 });
    }
}
