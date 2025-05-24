"use client"

import {useEffect, useState} from "react";
import {ChevronLeft} from 'lucide-react'
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {useChatStore} from "@/stores/chat";

interface IChatHeaderProps {
    id: string
}

interface ChatHeaderData {
    id: string;
    name: string;
    avatar: string | null;
    status: string;
    type: "private" | "group" | "channel";
}

export default function ChatHeader({id}: IChatHeaderProps) {
    const [data, setData] = useState<ChatHeaderData | null>(null);
    const setChatId = useChatStore(state => state.setChat)

    useEffect(() => {
        fetch(`/api/chat/${id}`)
            .then(res => res.json())
            .then(setData)
            .then(console.log)
            .catch(err => console.error("Failed to load chat header:", err));
    }, [id]);

    const handleBack = () => {
        setChatId({id: null})
    }

    return (
        <div className="chat-header w-full absolute top-0 cursor-default z-50">
            <div className="chat-header__container flex bg-background/20 backdrop-blur-sm h-16 w-full border-b px-2 items-center">
                <div className="flex gap-1 w-full items-center justify-between md:justify-start">
                    <div className="back flex items-center text-foreground font-medium hover:text-muted-foreground hover:cursor-pointer duration-100 me-5 w-12">
                        <Link onClick={handleBack} className={"flex items-center"} href={"/app"}>
                            <ChevronLeft/>
                            <span>Back</span>
                        </Link>
                    </div>
                    <div className="avatar w-12 h-12 md:me-1 order-3 md:order-none">
                        <Avatar className={"w-full h-full"}>
                            {data?.avatar ? (
                                <AvatarImage src={data.avatar}/>
                            ) : (
                                <AvatarFallback>
                                    {data?.name?.[0] ?? "?"}
                                </AvatarFallback>
                            )}
                        </Avatar>
                    </div>
                    <div className="usercontent items-center md:items-start flex flex-col">
                        <div className="usercontent-username font-medium text-md text-foreground">
                            <span>{data?.name ?? "Loading..."}</span>
                        </div>
                        <div className="usercontent-status text-xs text-muted-foreground">
                            <span>{data?.status ?? ""}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
