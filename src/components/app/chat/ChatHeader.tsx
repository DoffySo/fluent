"use client"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ChevronLeft } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useChatStore } from "@/stores/chat"
import { ChatPinnedMessages } from "@/components/app/chat/ChatPinnedMessages"
import { supabase } from "@/lib/supabase/client"
import { useUserStore } from "@/stores/user"
import { Base64ToUint, decryptMessage } from "@/lib/crypto/encrypt"
import { loadKey } from "@/lib/idb"
import { usePinnedStore } from "@/stores/pin"
import { throttle } from "lodash-es"
import {useTypingIndicator} from "@/hooks/useTypingIndicator";
import {useOnlineStatus} from "@/hooks/useOnlineStatus";
import {getSocket} from '@/lib/socket/client'

interface IChatHeaderProps {
    id: string
}

interface ChatHeaderData {
    id: string
    name: string
    avatar: string | null
    status: string
    type: "private" | "group" | "channel",
    userId: string,
}

interface Message {
    id: string
    message: string
    ogMessage?: string
    pinned: boolean
    isOwn: boolean
    createdAt: string
    messageNonce: string
    user: {
        id: string
        firstName: string
    }
}

export default function ChatHeader({ id }: IChatHeaderProps) {
    const [data, setData] = useState<ChatHeaderData | null>(null)
    const [error, setError] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const setChatId = useChatStore(state => state.setChat)
    const user = useUserStore(state => state.user)
    const setPinnedMessagesList = usePinnedStore(state => state.setMessages)
    const setPinnedMessageId = usePinnedStore(state => state.setPinnedMessageId)
    const [currentParticipantId, setCurrentParticipantId] = useState<string | null>(null)
    const [isOnline, setIsOnline] = useState<boolean | undefined>(undefined);
    const [isTyping, setIsTyping] = useState<boolean | null>(null);


    const hasPinnedMessages = useMemo(() => messages.length > 0, [messages])

    useEffect(() => {
        // Ensure we have a user ID before attempting to connect
        if (!user?.id) {
            console.warn("User ID is not available, skipping socket connection for online status.");
            return;
        }

        const socket = getSocket(user.id); // Get the singleton socket instance

        // Listener for when a user comes online globally
        const handleUserOnline = (onlineUserId: string) => {
            console.log(`User ${onlineUserId} is now online`);
            if (data?.userId === onlineUserId) {
                setIsOnline(true);
            }
        };

        // Listener for when a user goes offline globally
        const handleUserOffline = (offlineUserId: string) => {
            console.log(`User ${offlineUserId} is now offline`);
            if (data?.userId === offlineUserId) {
                setIsOnline(false);
            }
        };

        const handleUserTyping = (chatId: string, typingUserId: string) => {
            console.log(`User ${typingUserId} is now typing`);
            if (data?.userId === typingUserId) {
                setIsTyping(true);
            }
        };
        const handleUserStoppedTyping = (chatId: string, typingUserId: string) => {
            console.log(`User ${typingUserId} is now stopped typing`);
            if (data?.userId === typingUserId) {
                setIsTyping(false);
            }
        };
        socket.on("user_typing", handleUserTyping);
        socket.on("user_stopped_typing", handleUserStoppedTyping);
        socket.on("user_online", handleUserOnline);
        socket.on("user_offline", handleUserOffline);

        if (data?.userId) {
            socket.emit("request_user_status", data.userId, (onlineStatus: boolean) => {
                console.log(`Initial status for ${data.userId}: ${onlineStatus ? "online" : "offline"}`);
                setIsOnline(onlineStatus);
            });
        }


        // Cleanup function for useEffect
        return () => {
            console.log("Cleaning up socket listeners for chat header.");
            socket.off("user_online", handleUserOnline);
            socket.off("user_offline", handleUserOffline);
            socket.off("user_typing", handleUserTyping);
            socket.off("user_stopped_typing", handleUserStoppedTyping);
        };

    }, [user?.id, data?.userId, setIsOnline, setIsTyping]);


    // Fetch chat header data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/chat/${id}`)
                const jsonData = await response.json()
                setData(jsonData)
            } catch (err) {
                console.error("Failed to load chat header:", err)
            }
        }
        fetchData()
    }, [id])

    // Decrypt message helper
    const decryptMessageContent = useCallback(async (msg: any) => {
        try {
            if (!msg.messageNonce || !msg.user?.publicKey) return msg.message

            const senderPublicKey = Base64ToUint(msg.user.publicKey)
            const privateKey = await loadKey('private-key')
            if (!privateKey) throw new Error('Private key not found')

            return decryptMessage(
                msg.messageNonce,
                msg.message,
                senderPublicKey,
                privateKey
            )
        } catch (err) {
            console.error('Failed to decrypt message:', err)
            return '[decryption error]'
        }
    }, [])

    // Load and handle pinned messages
    const loadPinnedMessages = useCallback(async () => {
        try {
            setError(false)

            const { data, error } = await supabase
                .from('ChatMessages')
                .select(`
          id,
          message,
          ogMessage,
          pinned,
          messageNonce,
          createdAt,
          userId,
          user:User(id, firstName, publicKey)
        `)
                .eq('chatId', id)
                .eq('pinned', true)
                .order('createdAt', { ascending: true })

            if (error) throw error

            const decryptedMessages = await Promise.all(
                data.map(async msg => ({
                    id: msg.id,
                    message: await decryptMessageContent(msg),
                    ogMessage: msg.ogMessage,
                    pinned: msg.pinned,
                    isOwn: msg.user?.id === user?.id,
                    createdAt: msg.createdAt,
                    messageNonce: msg.messageNonce,
                    user: {
                        id: msg.user?.id ?? msg.userId,
                        firstName: msg.user?.firstName ?? 'Unknown',
                    },
                }))
            )

            setMessages(decryptedMessages)
            setPinnedMessagesList(decryptedMessages)
            if (decryptedMessages.length > 0) {
                setPinnedMessageId(decryptedMessages[0].id)
            }
        } catch (err) {
            console.error('Message load error:', err)
            setError(true)
        }
    }, [id, user?.id, decryptMessageContent, setPinnedMessagesList, setPinnedMessageId])

    // Realtime subscription with throttling
    useEffect(() => {
        const throttledLoad = throttle(loadPinnedMessages, 500)
        const channel = supabase
            .channel(`header-pinned-messages-${id}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'ChatMessages',
                    filter: `chatId=eq.${id}`,
                },
                payload => {
                    const affected = payload.new || payload.old
                    if (
                        (payload.eventType === 'INSERT' && affected.pinned) ||
                        (payload.eventType === 'UPDATE' && payload.new.pinned !== payload.old.pinned) ||
                        (payload.eventType === 'DELETE' && affected.pinned)
                    ) {
                        throttledLoad()
                    }
                }
            )
            .subscribe()

        // Initial load
        loadPinnedMessages()

        return () => {
            channel.unsubscribe()
            throttledLoad.cancel()
        }
    }, [id, loadPinnedMessages])

    useEffect(() => {
        // const isOnline = useOnlineStatus(otherUserId)
        // const typingUsers = useTypingIndicator(id, currentUserId)
    }, []);

    const handleBack = useCallback(() => {
        setChatId({ id: null })
    }, [setChatId])

    const avatarContent = useMemo(() => (
        data?.avatar ? (
            <AvatarImage src={data.avatar} />
        ) : (
            <AvatarFallback>
                {data?.name?.[0] ?? "?"}
            </AvatarFallback>
        )
    ), [data?.avatar, data?.name])

    return (
        <div className="chat-header w-full absolute top-0 cursor-default z-50">
            <div className="chat-header__container flex bg-background/20 backdrop-blur-sm h-16 w-full border-b px-2 items-center">
                <div className="flex gap-1 w-full items-center justify-between md:justify-start">
                    <div className="back flex items-center text-foreground font-medium hover:text-muted-foreground hover:cursor-pointer duration-100 me-5 w-12">
                        <Link onClick={handleBack} className="flex items-center" href="/app">
                            <ChevronLeft />
                            <span>Back</span>
                        </Link>
                    </div>
                    <div className="avatar w-12 h-12 md:me-1 order-3 md:order-none">
                        <Avatar className="w-full h-full">
                            {avatarContent}
                        </Avatar>
                    </div>
                    <div className="usercontent items-center md:items-start flex flex-col">
                        <div className="usercontent-username font-medium text-md text-foreground">
                            <span>{data?.name ?? "Loading..."}</span>
                        </div>
                        <div className="usercontent-status text-xs">
                            {
                                !isOnline ? (
                                    <span className={"text-muted-foreground"}>offline</span>
                                ) : isOnline && !isTyping ? (
                                    <span className={"text-muted-foreground"}>online</span>
                                ) : (
                                    <span className={"flex gap-1 items-center text-xs"}>
                                        <div className="dots flex gap-px">
                                            <div
                                                className="dot w-[4px] h-[4px] bg-muted-foreground rounded-full animate-scalejump delay-0"></div>
                                            <div
                                                className="dot w-[4px] h-[4px] bg-muted-foreground rounded-full animate-scalejump delay-300"></div>
                                            <div
                                                className="dot w-[4px] h-[4px] bg-muted-foreground rounded-full animate-scalejump delay-600"></div>
                                        </div>
                                        <span className={"text-muted-foreground"}>typing</span>
                                    </span>
                                )}
                        </div>
                    </div>
                </div>
            </div>
            {hasPinnedMessages && <ChatPinnedMessages chatId={id} messages={messages}/>}
        </div>
    )
}