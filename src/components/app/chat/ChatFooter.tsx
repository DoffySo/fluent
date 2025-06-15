"use client"

import { Paperclip, SendHorizontal, ArrowUp, LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import TextareaAutosize from "react-textarea-autosize"
import {useEffect, useState, useRef, useCallback, useMemo} from "react" // Added useRef, useCallback
import { useUserStore } from "@/stores/user"
import { initSodium, encryptMessage, Base64ToUint } from "@/lib/crypto/encrypt" // Removed UintToBase64 as it's unused
import { loadKey } from "@/lib/idb"
import { supabase } from "@/lib/supabase/client"
import { AnimatePresence, motion } from "motion/react"
import { getSocket } from "@/lib/socket/client"
import { throttle } from "lodash-es"

interface IProps {
    id: string
}

export default function ChatFooter({ id: chatId }: IProps) {
    const userId = useUserStore(state => state.user?.id)
    const [message, setMessage] = useState("")
    const [isEncrypting, setIsEncrypting] = useState(false)

    const isTypingActiveRef = useRef(false);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const socket = useRef(getSocket(userId || "")).current;

    const sendTypingEvent = useCallback(() => {
        if (!userId || !chatId) return;
        if (!isTypingActiveRef.current) {
            socket.emit("typing", chatId, userId);
            isTypingActiveRef.current = true;
            console.log(`Sending typing event for user ${userId} in chat ${chatId}`);
        }

        // Clear any existing timeout and set a new one to stop typing
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            sendStoppedTypingEvent();
        }, 3000); // Stop typing after 3 seconds of no input
    }, [userId, chatId]);

    const throttledSendTypingEvent = useMemo(
        () => throttle(sendTypingEvent, 500, { leading: true, trailing: false }),
        [sendTypingEvent]
    );

    const sendStoppedTypingEvent = useCallback(() => {
        if (!userId || !chatId || !isTypingActiveRef.current) return;
        socket.emit("stopped_typing", chatId, userId);
        isTypingActiveRef.current = false;
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = null;
        }
        console.log(`Sending stopped_typing event for user ${userId} in chat ${chatId}`);
    }, [userId, chatId, socket]);


    const sendMessage = async () => {
        if (!userId || !chatId || !message.trim()) return
        setIsEncrypting(true)

        sendStoppedTypingEvent();
        setMessage("");

        try {
            await initSodium()

            const { data: participants } = await supabase
                .from("ChatParticipant")
                .select("userId")
                .eq("chatId", chatId)
                .neq("userId", userId)

            const receiverId = participants?.[0]?.userId
            if (!receiverId) throw new Error("Receiver not found")

            const { data: receiver } = await supabase
                .from("User")
                .select("publicKey")
                .eq("id", receiverId)
                .single()

            if (!receiver?.publicKey) throw new Error("Public key missing")

            const privateKey = await loadKey("private-key")
            if (!privateKey) throw new Error("Private key missing")

            const encrypted = encryptMessage(
                message,
                Base64ToUint(receiver.publicKey),
                privateKey
            )

            const res = await fetch("/api/chat/message/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chatId: chatId,
                    ciphertext: encrypted.ciphertext,
                    nonce: encrypted.nonce,
                }),
            })

            if (!res.ok) throw new Error((await res.json()).error || "Send failed")

            new Audio("/static/msgSent.mp3").play().catch(console.warn)

        } catch (err) {
            console.error("Error sending message:", err)
        } finally {
            setIsEncrypting(false)
        }
    }

    const handleSubmit = (e: React.FormEvent | React.KeyboardEvent) => {
        e.preventDefault()
        if (!isEncrypting && message.trim()) {
            sendMessage()
        }
    }

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newMessage = e.target.value;
        setMessage(newMessage);

        if (newMessage.trim().length > 0) {
            throttledSendTypingEvent();
        } else {
            sendStoppedTypingEvent();
        }
    };

    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            if (isTypingActiveRef.current) {
                socket.emit("stopped_typing", chatId, userId);
            }
        };
    }, [chatId, socket, userId]);

    return (
        <form
            className="chat-footer absolute bottom-0 left-0 z-50 w-full border-r"
            onSubmit={handleSubmit}
        >
            <div className="chat-footer__container flex bg-background/20 backdrop-blur-sm min-h-16 w-full border-t px-2 items-center">
                <div className="flex gap-1 w-full items-center justify-between md:justify-start">
                    <div className="input w-full flex items-center">
                        <TextareaAutosize
                            value={message}
                            onChange={handleMessageChange} // Use the new handler
                            onKeyDown={e => {
                                if (e.key === "Enter" && !e.shiftKey) handleSubmit(e)
                            }}
                            minRows={1}
                            maxRows={10}
                            placeholder="Message..."
                            className="w-full resize-none bg-transparent outline-none py-1 px-1 rounded-sm"
                            disabled={isEncrypting}
                        />
                    </div>

                    <AnimatePresence>
                        {message.trim() && (
                            <motion.div
                                key="send"
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.7 }}
                                transition={{ duration: 0.1, ease: "circInOut" }}
                            >
                                <Button type="submit" size="icon" disabled={isEncrypting}>
                                    {isEncrypting ? (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            <SendHorizontal className="hidden md:inline-block w-5 h-5" />
                                            <ArrowUp className="md:hidden w-5 h-5" />
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </form>
    )
}