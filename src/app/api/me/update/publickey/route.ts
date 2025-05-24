import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { publicKey } = await req.json();

        if (!publicKey || typeof publicKey !== "string") {
            return Response.json(
                { error: "Bad Request", message: "Valid 'publicKey' is required" },
                { status: 400 }
            );
        }

        const updatedUser = await prisma.user.update({
            where: { id: currentUser.id },
            data: {
                publicKey: publicKey,
            },
            select: {
                id: true,
                publicKey: true
            }
        });

        return Response.json(
            { data: updatedUser },
            { status: 200 }
        );

    } catch (err) {
        console.error("POST /api/me/update/publicKey/:post error:", err);

        if (err instanceof Error && err.message.includes("RecordNotFound")) {
            return Response.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return Response.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}