'use client'

import { format, isToday, isThisWeek, parseISO } from 'date-fns'
import {
    Check,
    CheckCheck,
    Pencil,
    Pin,
    PinOff,
    Trash2
} from 'lucide-react'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger
} from '@/components/ui/context-menu'
import { Separator } from '@/components/ui/separator'
import { useIntersectionObserver } from 'usehooks-ts'
import { memo, useCallback } from 'react'
import { usePinnedStore } from '@/stores/pin'
import { Icon } from '@iconify/react'

interface ChatMessageProps {
    chatId: string
    messageId: string
    message: string
    time: string
    isOwn?: boolean
    username?: string
    delivered?: boolean
    read?: boolean
    pinned?: boolean
}

const safeParseDate = (date: string) => {
    const d = parseISO(date)
    return isNaN(d.getTime()) ? new Date() : d
}

const formatTimeShort = (date: string) => {
    const d = safeParseDate(date)
    if (isToday(d)) return format(d, 'HH:mm')
    if (isThisWeek(d, { weekStartsOn: 1 })) return format(d, 'EEE')
    return format(d, 'dd.MM.yyyy')
}

const formatTimeLong = (date: string) => {
    const d = safeParseDate(date)
    if (isToday(d)) return format(d, 'HH:mm')
    if (isThisWeek(d, { weekStartsOn: 1 })) return format(d, 'HH:mm EEEE')
    return format(d, 'HH:mm dd.MM.yyyy')
}

const ChatMessage = memo(function ChatMessage({
  chatId,
  messageId,
  message,
  time,
  isOwn = false,
  read,
  pinned = false
}: ChatMessageProps) {
    const {
        pinnedMessageId,
        messages: pinnedMessages,
        setPinnedMessageId,
        setScrollToPinned,
        scrollToPinned
    } = usePinnedStore()

    const handleReadMessage = async () => {
        await fetch('/api/chat/message/read', {
            method: 'POST',
            body: JSON.stringify({ chatId, messageId })
        })
    }

    const { ref } = useIntersectionObserver({
        threshold: 0.6,
        onChange: async (visible, entry) => {
            if (visible && !read) await handleReadMessage();

            if (!pinned || !pinnedMessages) return;

            const index = pinnedMessages.findIndex(m => m.id === messageId);
            const prev = pinnedMessages[index - 1];
            const next = pinnedMessages[index + 1];

            if (visible) {
                setPinnedMessageId(messageId);
            } else {
                const boundingRect = entry.boundingClientRect;
                const intersectionRect = entry.intersectionRect;

                const isScrollingUp = boundingRect.bottom <= intersectionRect.top;

                const isScrollingDown = boundingRect.top >= intersectionRect.bottom;

                if (isScrollingUp) {
                    if(next) return setPinnedMessageId(next?.id);
                } else if (isScrollingDown) {
                    if(prev) return setPinnedMessageId(prev?.id);
                } else {
                    return
                }
            }
        }
    });

    const handleScrollToMessage = () => {
        if (!pinned || !scrollToPinned) return
        setTimeout(() => {
            setScrollToPinned(null)
            document.getElementById(`message-${messageId}`)?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 0)
    }

    const handlePinMessage = async () => {
        // e.stopPropagation()
        const endpoint = pinned ? '/api/chat/message/unpin' : '/api/chat/message/pin'
        try {
            await fetch(endpoint, {
                method: 'POST',
                body: JSON.stringify({ chatId, messageId })
            })
        } catch (error) {
            console.error('Pin/unpin failed', error)
        }
    }

    const formattedShort = formatTimeShort(time)
    const formattedLong = formatTimeLong(time)

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <div
                    ref={ref}
                    id={`message-${messageId}`}
                    className={`py-1 flex px-4 max-w-full duration-100 ${isOwn ? 'justify-end' : 'justify-start'}`}
                    onClick={handleScrollToMessage}
                >
                    <div
                        className={`relative max-w-[75%] w-fit px-4 py-2 min-h-10 rounded-2xl flex gap-1 items-center transition-colors ${
                            isOwn
                                ? 'bg-blue-500 text-white rounded-br-sm'
                                : 'bg-neutral-100 dark:bg-muted text-foreground rounded-bl-sm'
                        }`}
                    >
                        <div className="text-sm break-all whitespace-pre-wrap">{message}</div>
                        <div
                            className={`bottom-0 right-1 flex gap-1 text-xs justify-end items-center mt-auto ps-1 ${
                                isOwn ? 'text-gray-300' : 'text-muted-foreground'
                            }`}
                        >
                            {pinned && <Icon icon="fluent:pin-48-filled" width="14" height="14" />}
                            <span title={new Date(time).toLocaleString()}>{formattedShort}</span>
                            {isOwn && (read ? <CheckCheck size={14} /> : <Check size={14} />)}
                        </div>
                    </div>
                </div>
            </ContextMenuTrigger>

            <ContextMenuContent onClick={(e) => e.stopPropagation()}>
                {
                    read && (
                            <>
                                <ContextMenuItem className="text-xs py-1 gap-2">
                                    <CheckCheck size={14} />
                                    <span>read at {formattedLong}</span>
                                </ContextMenuItem>
                                <Separator className="my-1" />
                            </>
                    )
                }
                <ContextMenuItem onClick={handlePinMessage} className="gap-2">
                    {pinned ? (
                        <>
                            <PinOff size={14} />
                            Unpin
                        </>
                    ) : (
                        <>
                            <Pin size={14} />
                            Pin
                        </>
                    )}
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
})

export default ChatMessage
