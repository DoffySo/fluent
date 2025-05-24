'use client'

import { useEffect, useRef, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import ChatMessage from '@/components/app/chat/ChatMessage'
import { supabase } from '@/lib/supabase/client'
import { useUserStore } from "@/stores/user"
import {initSodium, decryptMessage, Base64ToUint} from "@/lib/crypto/encrypt"
import {loadKey} from '@/lib/idb'

interface Message {
    id: string
    message: string
    ogMessage?: string
    created_at: string
    messageNonce: string
    user: {
        id: string
        firstName: string
    }
}

interface IProps {
    id: string // chat_id
}

export default function ChatMessages({ id }: IProps) {
    const user = useUserStore(state => state.user)
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const bottomRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        initSodium().catch(console.error)
    }, [])


    useEffect(() => {
        const loadMessages = async () => {
            try {
                setLoading(true)
                setError(null)

                const { data, error } = await supabase
                    .from('ChatMessages')
                    .select(`
                        id,
                        message,
                        ogMessage,
                        messageNonce,
                        createdAt,
                        userId,
                        user:User(id, firstName, publicKey)
                    `)
                    .eq('chatId', id)
                    .order('createdAt', { ascending: true })

                if (error) throw error

                const decryptedMessages = await Promise.all(data.map(async msg => {
                    let decryptedContent = msg.message

                    if (msg.messageNonce && msg.user?.publicKey) {
                        try {
                            const senderPublicKey = Base64ToUint(msg.user?.publicKey)
                            const privateKey = await loadKey('private-key')
                            if (!privateKey) throw new Error('Private key not found')
                            decryptedContent = decryptMessage(
                                msg.messageNonce,
                                msg.message,
                                senderPublicKey,
                                privateKey
                            )
                        } catch (err) {
                            console.error('Failed to decrypt message:', err)
                            decryptedContent = '[decryption error]'
                        }
                    }

                    return {
                        id: msg.id,
                        message: decryptedContent,
                        ogMessage: msg.ogMessage,
                        created_at: msg.createdAt,
                        messageNonce: msg.messageNonce,
                        user: {
                            id: msg.user?.id ?? msg.userId,
                            firstName: msg.user?.firstName ?? 'Unknown',
                        },
                    }
                }))

                setMessages(decryptedMessages)

            } catch (err) {
                console.error('Message load error:', err)
                setError('Cannot load messages')
            } finally {
                setLoading(false)
            }
        }

        loadMessages()
    }, [id])

    useEffect(() => {
        const channel = supabase
            .channel(`chat-${id}-realtime`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'ChatMessages',
                    filter: `chatId=eq.${id}`,
                },
                async (payload) => {
                    const newMsg = payload.new as {
                        id: string
                        message: string
                        ogMessage?: string
                        messageNonce: string
                        createdAt: string
                        userId: string
                    }


                    const isOwn = user?.id === newMsg.userId
                    let decryptedContent = newMsg.message

                    if (newMsg.messageNonce && !isOwn) {
                        try {
                            const { data: sender } = await supabase
                                .from('User')
                                .select('publicKey')
                                .eq('id', newMsg.userId)
                                .single()

                            if (sender?.publicKey) {
                                const senderPublicKey = Base64ToUint(sender.publicKey)
                                const privateKey = await loadKey('private-key')
                                if (!privateKey) throw new Error('Private key not found')
                                decryptedContent = decryptMessage(
                                    newMsg.messageNonce,
                                    newMsg.message,
                                    senderPublicKey,
                                    privateKey
                                )
                                setTimeout( () => {
                                    const audio = new Audio("/static/msgReceived.mp3")
                                    audio.volume = .5
                                    audio.play();
                                }, 100)
                            }
                        } catch (err) {
                            console.error('Failed to decrypt new message:', err)
                            decryptedContent = '[decryption error]'
                        }
                    }
                    if (newMsg.messageNonce && isOwn) {
                        try {
                            const { data: sender } = await supabase
                                .from('User')
                                .select('publicKey')
                                .eq('id', newMsg.userId)
                                .single()

                            if (sender?.publicKey) {
                                const privateKey = await loadKey('private-key')
                                const publicKey = await loadKey('public-key')
                                if (!privateKey) throw new Error('Private key not found')
                                if (!publicKey) throw new Error('Public key not found')
                                decryptedContent = decryptMessage(
                                    newMsg.messageNonce,
                                    newMsg.message,
                                    publicKey,
                                    privateKey
                                )
                            }
                        } catch (err) {
                            console.error('Failed to decrypt new message:', err)
                            decryptedContent = '[decryption error]'
                        }
                    }

                    const messageData = {
                        id: newMsg.id,
                        message: decryptedContent,
                        ogMessage: newMsg.ogMessage,
                        created_at: newMsg.createdAt,
                        messageNonce: newMsg.messageNonce,
                        user: {
                            id: newMsg.userId,
                            firstName: isOwn ? (user.firstName || 'You') : '...',
                        },
                    }

                    setMessages(prev => [...prev, messageData])

                    if (!isOwn) {
                        try {
                            const { data: userData } = await supabase
                                .from('User')
                                .select('firstName')
                                .eq('id', newMsg.userId)
                                .single()

                            setMessages(prev => prev.map(msg =>
                                msg.id === newMsg.id ? {
                                    ...msg,
                                    user: {
                                        ...msg.user,
                                        firstName: userData?.firstName || 'Unknown',
                                    }
                                } : msg
                            ))
                        } catch (err) {
                            console.error('User data load error:', err)
                        }
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [id, user])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    if (loading) return (
        <>
            <div className="space h-20"/>
            <div className="p-4 text-center">Loading messages...</div>
            <div ref={bottomRef} className="space h-20"/>
        </>
    )

    if (error) return (
        <>
            <div className="space h-20"/>
            <div className="p-4 text-center text-red-500">{error}</div>
            <div ref={bottomRef} className="space h-20"/>
        </>
    )

    return (
        <div className="chat-messages flex flex-1">
            <ScrollArea className="flex flex-col flex-1 h-screen">
                <div className="space h-20" />
                {messages.map(msg => (
                    <div className={"contents"} key={msg.id}>
                        <ChatMessage
                            isOwn={msg.user.id === user?.id}
                            messageId={msg.id}
                            message={msg.message}
                            time={`${msg.created_at}`}
                            username={msg.user.firstName}
                            isEncrypted={!!msg.messageNonce}
                        />
                    </div>
                ))}
                <div ref={bottomRef} className="space h-20" />
            </ScrollArea>
        </div>
    )
}