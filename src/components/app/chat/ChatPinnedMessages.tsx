'use client'
import {Button} from "@/components/ui/button";
import {X} from "lucide-react";
import {usePinnedStore} from "@/stores/pin";

interface Message {
    id: string
    message: string
    ogMessage?: string
    pinned: boolean,
    isOwn: boolean,
    createdAt: string
    messageNonce: string
    user: {
        id: string
        firstName: string
    }
}

interface ChatPinnedMessagesProps {
    chatId: string,
    messages: Message[]
}

export function ChatPinnedMessages({ chatId, messages }: ChatPinnedMessagesProps) {
    const setScrollToPinned = usePinnedStore(s => s.setScrollToPinned)
    const setPinnedMessageId = usePinnedStore(s => s.setPinnedMessageId)
    const scrollToPinned = usePinnedStore(s => s.scrollToPinned)
    const pinnedMessageId = usePinnedStore(s => s.pinnedMessageId)

    if (messages.length === 0) return null;

    const handleUnpinMessage = async (id: string) => {
        const response = await fetch('/api/chat/message/unpin', {
            method: 'POST',
            body: JSON.stringify({
                chatId: chatId,
                messageId: id
            })
        })
    }

    const handleClick = (index: number) => {
        setScrollToPinned(messages[index].id)
    }

    return (
        <div className="w-full bg-background/50 backdrop-blur-sm border-b border-border max-h-12 overflow-hidden">
            <div className="flex flex-col justify-center">
                {messages.map((message, index) => (
                    pinnedMessageId === message.id && (
                        <div
                            className="flex items-center gap-2 px-3 py-2 justify-between hover:bg-foreground/10 h-12"
                            onClick={() => handleClick(index)}
                            key={index}
                        >
                            <div className="flex flex-col w-full overflow-hidden">
                <span className="text-xs text-muted-foreground">
                    Pinned Message {messages.length > 1 ? `#${index + 1}` : ""}
                </span>
                                <span className="text-sm line-clamp-1">
                    {message.message}
                </span>
                            </div>
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleUnpinMessage(message.id)
                                }}
                                size="icon"
                                variant="ghost"
                            >
                                <X/>
                            </Button>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}
