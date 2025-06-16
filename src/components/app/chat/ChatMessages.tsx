'use client'

import { useEffect, useRef, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import ChatMessage from '@/components/app/chat/ChatMessage'
import { supabase } from '@/lib/supabase/client'
import { useUserStore } from "@/stores/user"
import { initSodium, decryptMessage, Base64ToUint } from "@/lib/crypto/encrypt"
import { loadKey } from '@/lib/idb'
import { usePinnedStore } from "@/stores/pin"

interface Message {
    id: string
    message: string
    ogMessage?: string
    pinned: boolean
    created_at: string
    messageNonce: string
    user: {
        id: string
        firstName: string
    }
    messageRead: {
        userId: string
        read: boolean
        createdAt: Date
    }[]
}

interface IProps {
    id: string // chatId
}

export default function ChatMessages({ id }: IProps) {
    const user = useUserStore(state => state.user)
    const scrollToPinned = usePinnedStore(state => state.scrollToPinned)
    const setScrollToPinned = usePinnedStore(state => state.setScrollToPinned)

    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [hasPinnedMessages, setHasPinnedMessages] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)

    const privateKeyRef = useRef<Uint8Array | null>(null)

    useEffect(() => {
        initSodium()
        loadKey('private-key').then(key => {
            privateKeyRef.current = key
        }).catch(console.error)
    }, [])

    useEffect(() => {
        if (scrollToPinned == null) return

        const el = document.querySelector(`#message-${scrollToPinned}`)?.children[0]
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" })
            el.classList.add("bg-muted-foreground/15", "dark:bg-muted-foreground/10", "duration-300")
            setTimeout(() => el.classList.remove("bg-muted-foreground/15", "dark:bg-muted-foreground/10"), 2000)
            setTimeout(() => el.classList.remove("duration-300"), 3000)
        }

        setScrollToPinned(null)
    }, [scrollToPinned, setScrollToPinned])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true)
                const { data, error } = await supabase
                    .from('ChatMessages')
                    .select(`
            id, message, ogMessage, pinned, messageNonce, createdAt,
            userId,
            user: User (id, firstName, publicKey),
            messageRead:MessageRead (userId)
          `)
                    .eq('chatId', id)
                    .order('createdAt', { ascending: true })

                if (error) throw error

                const decrypted = await Promise.all(data.map(async (msg: any) => {
                    let content = msg.message
                    const pubKey = msg.user?.publicKey
                    if (msg.messageNonce && pubKey && privateKeyRef.current) {
                        try {
                            content = decryptMessage(msg.messageNonce, msg.message, Base64ToUint(pubKey), privateKeyRef.current)
                        } catch {
                            content = "[decryption error]"
                        }
                    }

                    return {
                        id: msg.id,
                        message: content,
                        ogMessage: msg.ogMessage,
                        pinned: msg.pinned,
                        created_at: msg.createdAt,
                        messageNonce: msg.messageNonce,
                        user: {
                            id: msg.user?.id ?? msg.userId,
                            firstName: msg.user?.firstName ?? 'Unknown'
                        },
                        messageRead: msg.messageRead ?? []
                    }
                }))

                setMessages(decrypted)
            } catch (err) {
                console.error(err)
                setError("Failed to load messages.")
            } finally {
                setLoading(false)
            }
        }

        fetchMessages()
    }, [id])

    // ChatMessages
    useEffect(() => {
        const channel = supabase
            .channel(`chat-${id}-messages`)
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'ChatMessages',
                filter: `chatId=eq.${id}`
            }, async (payload) => {
                const msg = payload.new as any
                let content = msg.message
                const isOwn = user?.id === msg.userId

                try {
                    const { data: userData } = await supabase
                        .from('User')
                        .select('publicKey, firstName')
                        .eq('id', msg.userId)
                        .single()

                    if (msg.messageNonce && userData?.publicKey && privateKeyRef.current) {
                        content = decryptMessage(msg.messageNonce, msg.message, Base64ToUint(userData.publicKey), privateKeyRef.current)
                    }
                } catch {
                    content = '[decryption error]'
                }

                const message: Message = {
                    id: msg.id,
                    message: content,
                    ogMessage: msg.ogMessage,
                    pinned: msg.pinned,
                    created_at: msg.createdAt,
                    messageNonce: msg.messageNonce,
                    user: {
                        id: msg.userId,
                        firstName: isOwn ? (user?.firstName ?? 'You') : '...'
                    },
                    messageRead: msg.messageRead || []
                }

                setMessages(prev => {
                    const exists = prev.find(m => m.id === message.id)
                    if (exists) {
                        return prev.map(m => m.id === message.id ? message : m)
                    } else {
                        if (!isOwn) {
                            const audio = new Audio("/static/msgReceived.mp3")
                            audio.volume = 0.5
                            audio.play()
                        }
                        return [...prev, message]
                    }
                })
            })
            .subscribe()

        return () => { supabase.removeChannel(channel) }
    }, [id, user])

    // MessageRead
    useEffect(() => {
        const channel = supabase
            .channel(`chat-${id}-read`)
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'MessageRead',
                filter: `chatId=eq.${id}`
            }, payload => {
                const update = payload.new as { messageId: string, userId: string }
                setMessages(prev =>
                    prev.map(msg => {
                        if (msg.id !== update.messageId) return msg
                        const existing = msg.messageRead.find(r => r.userId === update.userId)
                        if (existing) {
                            return {
                                ...msg,
                                messageRead: msg.messageRead.map(r =>
                                    r.userId === update.userId ? { ...r} : r
                                )
                            }
                        } else {
                            return {
                                ...msg,
                                messageRead: [...msg.messageRead, update]
                            }
                        }
                    })
                )
            })
            .subscribe()

        return () => { supabase.removeChannel(channel) }
    }, [id])

    // pinned messages
    useEffect(() => {
        const checkPinned = async () => {
            const { data, error } = await supabase
                .from('ChatMessages')
                .select('id')
                .eq('chatId', id)
                .eq('pinned', true)
                .limit(1)

            if (!error) {
                setHasPinnedMessages(data.length > 0)
            }
        }

        checkPinned()

        const channel = supabase
            .channel(`chat-${id}-pins`)
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'ChatMessages',
                filter: `chatId=eq.${id}`
            }, checkPinned)
            .subscribe()

        return () => { supabase.removeChannel(channel) }
    }, [id])

    // useEffect(() => {
    //     if (!loading) {
    //         bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    //     }
    // }, [messages, loading])

    if (loading) return (
        <>
            <div className="space h-20" />
            <div className="p-4 text-center">Loading messages...</div>
            <div ref={bottomRef} className="space h-20" />
        </>
    )

    if (error) return (
        <>
            <div className="space h-20" />
            <div className="p-4 text-center text-red-500">{error}</div>
            <div ref={bottomRef} className="space h-20" />
        </>
    )

    return (
        <div className="chat-messages flex flex-1">
            <ScrollArea className="flex flex-col flex-1 h-screen">
                <div className="space h-20" />
                {hasPinnedMessages && <div className="space h-10" />}

                {messages.map(msg => {
                    const isOwn = msg.user.id === user?.id
                    const readByOthers = isOwn && msg.messageRead.some(r => r.userId !== user?.id)

                    return (
                        <div className="contents" key={msg.id} id={`message-${msg.id}`}>
                            <ChatMessage
                                chatId={id}
                                isOwn={isOwn}
                                messageId={msg.id}
                                message={msg.message}
                                time={msg.created_at}
                                username={msg.user.firstName}
                                pinned={msg.pinned}
                                read={readByOthers}
                            />
                        </div>
                    )
                })}

                <div ref={bottomRef} className="space h-20" />
            </ScrollArea>
        </div>
    )
}
