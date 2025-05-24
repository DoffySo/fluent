"use client"
import {Paperclip, SendHorizontal, ArrowUp, LoaderCircle} from 'lucide-react'
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {useUserStore} from "@/stores/user";
import TextareaAutosize from 'react-textarea-autosize';
import {initSodium, encryptMessage, Base64ToUint} from "@/lib/crypto/encrypt";
import {loadKey} from '@/lib/idb'
import { UintToBase64 } from "@/lib/crypto/encrypt";
import {supabase} from "@/lib/supabase/client";
import {AnimatePresence, motion} from "motion/react";

interface IProps {
    id: string
}

export default function ChatFooter({id}: IProps) {
    const user = useUserStore(state => state.user);
    const [message, setMessage] = useState<string>("");
    const [isEncrypting, setIsEncrypting] = useState(false);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.id || !id || !message?.trim()) return;

        setIsEncrypting(true);

        try {
            await initSodium();

            const { data: chatData } = await supabase
                .from('ChatParticipant')
                .select('userId')
                .eq('chatId', id)
                .neq('userId', user?.id);



            if (!chatData) {
                throw new Error("Cannot define receiver");
            }

            const receiverId = chatData[0].userId;
            const { data: receiver } = await supabase
                .from('User')
                .select('publicKey')
                .eq('id', receiverId)
                .single();

            if (!receiver?.publicKey) {
                throw new Error("Receivers public key not found");
            }

            const privateKey = await loadKey('private-key');
            if (!privateKey) {
                throw new Error("Private key not found");
            }

            const receiverPublicKey = Base64ToUint(receiver.publicKey);
            const encrypted = encryptMessage(
                message,
                receiverPublicKey,
                privateKey
            );

            const response = await fetch(`/api/chat/message/create`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chatId: id,
                    ciphertext: encrypted.ciphertext,
                    nonce: encrypted.nonce,
                    isEncrypted: true
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Error on message send");
            }

            const audio = new Audio("/static/msgSent.mp3")
            audio.volume = .5
            await audio.play();


            setMessage("");
        } catch (err) {
            console.error("Err handled on message send:", err);
        } finally {
            setIsEncrypting(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    return (
        <div className="chat-footer w-full border-r absolute bottom-0 left-0 cursor-default z-50">
            <div className="chat-footer__container flex bg-background/20 backdrop-blur-sm min-h-16 h-fit w-full border-t px-2 items-center">
                <div className="flex gap-1 w-full items-center justify-between md:justify-start">
                    <div className="input w-full h-full items-center flex">
                        <TextareaAutosize
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            minRows={1}
                            maxRows={10}
                            placeholder={"Message..."}
                            className={"bg-transparent outline-none rounded-sm w-full resize-none py-1 px-1"}
                            disabled={isEncrypting}
                        />
                    </div>
                    <div className="buttons">
                        <AnimatePresence>
                        {message.trim() && (
                                <motion.div
                                    key={"send_button"}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.7,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.7,
                                    }}
                                    transition={{
                                        duration: .1,
                                        ease: "circInOut"
                                    }}
                                >
                                    <Button

                                        onClick={handleSendMessage}
                                        size={"icon"}
                                        disabled={isEncrypting}
                                    >
                                        {isEncrypting ? (
                                            <LoaderCircle className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <>
                                                <SendHorizontal className={"min-w-5 min-h-5 hidden md:inline-block"} />
                                                <ArrowUp className={"min-w-5 min-h-5 inline-block md:hidden"} />
                                            </>
                                        )}
                                    </Button>
                                </motion.div>
                        )}
                        </AnimatePresence>

                    </div>
                </div>
            </div>
        </div>
    )
}