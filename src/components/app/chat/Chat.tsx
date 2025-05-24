'use client'

import { useEffect } from "react"
import ChatHeader from "@/components/app/chat/ChatHeader"
import ChatMessages from "@/components/app/chat/ChatMessages"
import ChatFooter from "@/components/app/chat/ChatFooter"
import { useChatStore } from "@/stores/chat"

export default function Chat({ id }: { id: string }) {
    const setChat = useChatStore(state => state.setChat)

    useEffect(() => {
        setChat({ id })

        return () => setChat(null)
    }, [id, setChat])

    return (
        <div className="flex flex-col w-full max-w-screen max-h-screen relative">
            <ChatHeader id={id} />
            <ChatMessages id={id} />
            <ChatFooter id={id} />
        </div>
    )
}
