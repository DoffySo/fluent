'use client'

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Check, CheckCheck, Terminal} from "lucide-react";
import {useChatStore} from "@/stores/chat";
import {supabase} from '@/lib/supabase/client'
import {useUserStore} from "@/stores/user";
import {Base64ToUint, decryptMessage} from "@/lib/crypto/encrypt";
import {loadKey} from "@/lib/idb";
import {getSocket} from "@/lib/socket/client";

interface IChatProps {
    chatId: string;
}

interface Participant {
    userId: string;
    user: {
        firstName: string;
        lastName?: string | null;
        avatar?: string | null;
    };
}

interface ChatApiResponse {
    id: string;
    type: "private" | "group" | "channel";
    name: string;
    status?: string;
    avatar?: string | null;
    participants?: Participant[];
    isFake?: boolean;
    isScam?: boolean;
    isSpam?: boolean;
    isVerified?: boolean;
    ChatMessages?: {
        senderId: string;
        message: string;
    }
    updatedAt?: string;
}

interface User {
    id: string;
    firstName: string;
    lastName?: string;
    username?: string;
}

interface Message {
    id: string;
    senderId: string;
    message: string;
    messageNonce: string;
}

export default function SidebarChat({ chatId }: IChatProps) {
    const user = useUserStore(state => state.user);
    const router = useRouter();
    const [chat, setChat] = useState<ChatApiResponse | null>(null);
    const [participant, setParticipant] = useState<User | null>(null);
    const [participantPublicKey, setParticipantPublicKey] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const setChatId = useChatStore(state => state.setChat);
    const [lastMessage, setLastMessage] = useState<string | null>(null);
    const [lastMessageId, setLastMessageId] = useState<string | null>(null);
    const [lastMessageRead, setLastMessageRead] = useState<boolean | null>(null);
    const [isOwn, setIsOwn] = useState<boolean | null>(null);
    const [lastMessageTime, setLastMessageTime] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState<boolean | null>(null);

    useEffect(() => {
        // Ensure we have a user ID before attempting to connect
        if (!user?.id) {
            console.warn("User ID is not available, skipping socket connection for online status.");
            return;
        }

        const socket = getSocket(user.id);

        const handleUserTyping = (chatId: string, typingUserId: string) => {
            console.log(`User ${typingUserId} is now typing | Sidebar`);
            if (participant?.id === typingUserId) {
                setIsTyping(true);
            }
        };
        const handleUserStoppedTyping = (chatId: string, typingUserId: string) => {
            console.log(`User ${typingUserId} is now stopped typing | Sidebar`);
            if (participant?.id === typingUserId) {
                setIsTyping(false);
            }
        };
        socket.on("user_typing", handleUserTyping);
        socket.on("user_stopped_typing", handleUserStoppedTyping);


        // Cleanup function for useEffect
        return () => {
            console.log("Cleaning up socket listeners for sidebar chat.");
            socket.off("user_typing", handleUserTyping);
            socket.off("user_stopped_typing", handleUserStoppedTyping);
        };

    }, [user?.id, participant?.id, setIsTyping]);

    useEffect(() => {
        if (!chatId) return;
        if(!user) return;

        setLoading(true);

        const fetchChatData = async () => {
            const privateKey = await loadKey('private-key');
            const publicKey = await loadKey('public-key');
            if(!privateKey || !publicKey) return;
            try {
                const { data: ChatParticipant } = await supabase
                    .from('ChatParticipant')
                    .select('*')
                    .eq('chatId', chatId)
                    .neq('userId', user?.id);

                const { data: Participant} = await supabase
                    .from('User')
                    .select('*')
                    .eq('id', (ChatParticipant[0].userId))

                const { data: Message } = await supabase
                    .from('ChatMessages')
                    .select('*')
                    .eq('chatId', chatId)
                    .order("createdAt", {ascending: false})
                    .limit(1);

                const message = Message[0]

                const { data: MessageRead } = await supabase
                    .from('MessageRead')
                    .select('*')
                    .eq('chatId', chatId)
                    .eq('messageId', message?.id)
                    .neq('userId', user?.id)
                    .order("id", {ascending: false})
                    .limit(1);


                const messageread = MessageRead[0];
                setLastMessageTime(formatTime(message?.createdAt))
                setIsOwn(message?.userId == user?.id)
                setLastMessageRead(messageread)
                const {data: User} = await supabase
                    .from('User')
                    .select('*')
                    .eq('id', message?.userId)
                    .limit(1);
                if(!User) return
                const sender = User[0]
                setParticipantPublicKey(sender?.publicKey)
                const pbKey = user?.id === sender?.id ? publicKey : Base64ToUint(participantPublicKey)
                const decryptedMessage = decryptMessage(
                    message?.messageNonce,
                    message?.message,
                    pbKey,
                    privateKey
                )
                setLastMessage(decryptedMessage)
                setLastMessageId(message?.id)
                // console.log(ChatParticipant, decryptedMessage)
                setParticipant(Participant[0]);
            } catch (err) {
                console.error("Error loading chat:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchChatData();

        const chatSubscription = supabase
            .channel(`chat_${chatId}_changes`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'Chat',
                    filter: `id=eq.${chatId}`,
                },
                (payload) => {
                    setChat(prev => ({
                        ...prev,
                        ...payload.new,
                        participants: prev?.participants || []
                    }));
                }
            )
            .subscribe();

        const messagesSubscription = supabase
            .channel(`chat-${chatId}-messages-sidebar`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'ChatMessages',
                    filter: `chatId=eq.${chatId}`,
                },
                async (payload) => {
                    setLastMessageId(payload.new?.id)
                    const privateKey = await loadKey('private-key');
                    const publicKey = await loadKey('public-key');
                    if(!privateKey || !publicKey) return;
                    const pbKey = user?.id === payload.new?.userId ? publicKey: Base64ToUint(participantPublicKey)
                    const decryptedMessage = decryptMessage(
                        payload.new?.messageNonce,
                        payload.new?.message,
                        pbKey,
                        privateKey
                    )
                    setLastMessage(decryptedMessage)

                }
            )
            .subscribe();

        const readSubscription = supabase
            .channel(`chat-${chatId}-read-sidebar`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'MessageRead',
                    filter: `chatId=eq.${chatId}`,
                },
                async (payload) => {
                    if(lastMessageId == payload.new?.messageId && participant?.id == payload.new?.userId) {
                        console.log('readed...')
                        setLastMessageRead(true)
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(chatSubscription);
            supabase.removeChannel(messagesSubscription);
            supabase.removeChannel(readSubscription);
        };
    }, [chatId, lastMessageId, participant?.id, participantPublicKey, user]);



    const onClickChat = () => {
        router.push(`/app/chat/${chatId}`);
        setChatId({ id: chatId });
    };

    let displayName = "Loading...";
    let avatarUrl: string | undefined;
    let avatarFallbackLetter = "?";

    if (!loading && chat) {
        if (chat.type === "private" && chat.participants?.length === 2) {
            const otherParticipant = chat.participants.find(p => p.userId !== user?.id);
            if (otherParticipant) {
                avatarFallbackLetter = otherParticipant.user.firstName[0]?.toUpperCase() || "?";
                avatarUrl = otherParticipant.user.avatar || undefined;
            }
        } else {
            avatarFallbackLetter = chat.name?.[0]?.toUpperCase() || "?";
            avatarUrl = chat.avatar || undefined;
        }
    }

    const formatTime = (dateString?: string) => {
        if (!dateString) return "0:00";
        const date = new Date(dateString);
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    return (
        <div
            onClick={onClickChat}
            className="sidebar-chat cursor-pointer w-full max-w-full px-1"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    onClickChat();
                }
            }}
            aria-label={`Open chat ${participant?.firstName}`}
        >
            <div className="sidebar-chat__container hover:bg-muted-foreground/10 rounded-lg h-18 px-3 py-1 flex items-center gap-1 w-full select-none">
                <div className="avatar h-12 w-12 flex-shrink-0">
                    <Avatar className="w-full h-full">
                        {avatarUrl ? (
                            <AvatarImage src={avatarUrl} alt={`Avatar of ${participant?.firstName}`} />
                        ) : (
                            <AvatarFallback>{avatarFallbackLetter}</AvatarFallback>
                        )}
                    </Avatar>
                </div>

                <div className="usercontent flex flex-col pt-2 h-18 w-full min-w-0 gap-1 border-b md:border-none">
                    <div className="usercontent-top flex items-center w-full gap-1 overflow-hidden min-w-0">
                        <div className="flex items-center gap-1 w-full overflow-hidden min-w-0">
                            <div
                                className="truncate whitespace-nowrap overflow-hidden text-ellipsis text-sm text-foreground min-w-0 shrink"
                                title={participant?.firstName}
                            >
                                {participant?.firstName}
                            </div>

                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0 ml-auto">
                            {
                                isOwn && (
                                    <>
                                        <span className="text-xs text-foreground flex items-center gap-1">
                                            {lastMessageRead ? (<CheckCheck size={14}/>) : (<Check size={14}/>)}
                                        </span>
                                    </>
                                )
                            }
                            <span className="text-xs text-muted-foreground">
                                {lastMessageTime}
                            </span>
                        </div>
                    </div>

                    <div className="usercontent-bottom flex items-start w-full gap-1 overflow-hidden min-w-0 h-full pb-2 pt-1">
                        <div className="usercontent-message flex items-start gap-1 overflow-hidden min-w-0 w-full">
                            <div className="text-sm text-muted-foreground whitespace-pre-wrap break-words line-clamp-2 w-full min-w-0">
                                {
                                    !isTyping ? (
                                        <>{lastMessage || "No messages yet"}</>
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
                                    )
                                }
                            </div>
                    </div>
                        <div className="flex ml-auto h-full items-end">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}