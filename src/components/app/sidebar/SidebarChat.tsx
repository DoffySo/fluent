'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, VolumeX, Star, Terminal, Check, CheckCheck, Pin } from "lucide-react";
import {useChatStore} from "@/stores/chat";

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
}

export default function SidebarChat({ chatId }: IChatProps) {
    const router = useRouter();
    const [chat, setChat] = useState<ChatApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const setChatId = useChatStore(state => state.setChat)

    useEffect(() => {
        if (!chatId) return;

        setLoading(true);

        fetch(`/api/chat/${chatId}`)
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch chat: ${res.statusText}`);
                }
                const data: ChatApiResponse = await res.json();
                setChat(data);
            })
            .catch((err) => {
                console.error("Error loading chat:", err);
                setChat(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [chatId]);

    // Имя и аватар
    let displayName = "Loading...";
    let avatarUrl: string | undefined;
    let avatarFallbackLetter = "?";

    if (!loading && chat) {
        displayName = chat.name;

        if (chat.type === "private" && chat.participants && chat.participants.length === 2) {
            avatarFallbackLetter = chat.name[0].toUpperCase();
            const participantWithAvatar = chat.participants.find((p) => p.user.avatar);
            if (participantWithAvatar?.user.avatar) {
                avatarUrl = participantWithAvatar.user.avatar;
            }
        } else {
            avatarFallbackLetter = chat.name[0].toUpperCase();
            avatarUrl = chat.avatar || undefined;
        }
    }

    const onClickChat = () => {
        router.push(`/app/chat/${chatId}`);
        setChatId({id: chatId})
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
            aria-label={`Open chat ${displayName}`}
        >
            <div className="sidebar-chat__container hover:bg-muted-foreground/10 rounded-lg h-18 px-3 py-1 flex items-center gap-1 w-full select-none">
                <div className="avatar h-12 w-12 flex-shrink-0">
                    <Avatar className="w-full h-full">
                        {avatarUrl ? (
                            <AvatarImage src={avatarUrl} alt={`Avatar of ${displayName}`} />
                        ) : (
                            <AvatarFallback>{avatarFallbackLetter}</AvatarFallback>
                        )}
                    </Avatar>
                </div>

                <div className="usercontent flex flex-col pt-2 h-18 w-full min-w-0 gap-1 border-b md:border-none">
                    <div className="usercontent-top flex items-center w-full gap-1 overflow-hidden min-w-0">
                        <div className="flex items-center gap-1 w-full overflow-hidden min-w-0">
                            <div className="flex items-center gap-2 shrink-0 w-4 h-4">
                                <Terminal />
                            </div>

                            <div
                                className="truncate whitespace-nowrap overflow-hidden text-ellipsis text-sm text-foreground min-w-0 shrink"
                                title={displayName}
                            >
                                {displayName}
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <VolumeX className="w-4 h-4 text-muted-foreground" />
                                {chat?.isVerified && <BadgeCheck className="w-4 h-4 text-foreground" />}

                                {(chat?.isFake) && (
                                    <Badge className="border-red-400 text-red-400 rounded-sm text-[9px] uppercase" variant="outline" title="Fake">
                                        Fake
                                    </Badge>
                                )}
                                {(chat?.isScam) && (
                                    <Badge className="border-red-400 text-red-400 rounded-sm text-[9px] uppercase" variant="outline" title="Scam">
                                        Scam
                                    </Badge>
                                )}
                                {(chat?.isSpam) && (
                                    <Badge className="border-red-400 text-red-400yellow-600 rounded-sm text-[9px] uppercase" variant="outline" title="Spam">
                                        Spam
                                    </Badge>
                                )}
                                {/*<Star className="w-4 h-4 text-yellow-500" />*/}
                            </div>
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0 ml-auto">
                            <Check className="w-4 h-4" />
                            <CheckCheck className="w-4 h-4" />
                            <span className="text-xs text-muted-foreground">0:00</span>
                        </div>
                    </div>

                    <div className="usercontent-bottom flex flex-col w-full gap-1 overflow-hidden min-w-0">
                        <div className="usercontent-message flex items-start gap-1 overflow-hidden min-w-0 w-full">
                            <div className="text-sm text-muted-foreground whitespace-pre-wrap break-words line-clamp-2 w-full min-w-0">
                                Last message preview...
                            </div>

                            <div className="flex items-center gap-1 shrink-0 w-fit items-start h-full min-w-10">
                                <div className="min-w-4 w-fit h-5 flex items-center justify-center rounded-full text-xs bg-foreground text-background p-1">
                                    123
                                </div>
                                <div className="h-5 flex items-center">
                                    <Pin className={"w-5 h-5 text-foreground rotate-45"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
