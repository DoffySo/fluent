"use client"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {useRouter} from "next/navigation"
import {useTransition} from "react"

interface IProps {
    firstName: string
    lastName?: string
    email?: string
    username?: string
    id: string
}

export default function SearchUser({firstName, lastName, username, id}: IProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleClick = () => {
        startTransition(async () => {
            try {
                const res = await fetch("/api/chat/withuser", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({userId: id}),
                })

                if (!res.ok) throw new Error("Failed to create or fetch chat")

                const {chatId} = await res.json()
                router.push(`/app/chat/${chatId}`)
            } catch (err) {
                console.error(err)
            }
        })
    }

    return (
        <div
            onClick={handleClick}
            className="flex w-full h-12 items-center bg-background hover:bg-foreground/5 rounded-md cursor-pointer"
        >
            <div className="flex w-full h-full items-center gap-1 px-1 py-1">
                <Avatar className={"w-10 h-10"}>
                    <AvatarImage />
                    <AvatarFallback>
                        {firstName[0]}
                        {lastName?.[0]}
                    </AvatarFallback>
                </Avatar>
                <div className="usercontent flex flex-col h-full justify-around">
                    <span className={"text-sm"}>{firstName} {lastName ?? ""}</span>
                    {username && <span className={"text-xs"}>@{username}</span>}
                </div>
            </div>
        </div>
    )
}
