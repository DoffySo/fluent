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

        const { phrase, nonce } = await req.json();

        if (!phrase || typeof phrase !== "string") {
            return Response.json(
                { error: "Bad Request", message: "Valid 'phrase' is required" },
                { status: 400 }
            );
        }
        if (!nonce || typeof nonce !== "string") {
            return Response.json(
                { error: "Bad Request", message: "Valid 'nonce' is required" },
                { status: 400 }
            );
        }

        const updatedUser = await prisma.user.update({
            where: { id: currentUser.id },
            data: {
                encryptedPhraseToVerify: phrase,
                encryptedPhraseNonce: nonce,
            },
            select: {
                id: true,
                encryptedPhraseToVerify: true,
                encryptedPhraseNonce: true,
            }
        });

        return Response.json(
            { data: updatedUser },
            { status: 200 }
        );

    } catch (err) {
        console.error("POST /api/me/update/passphrase error:", err);

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