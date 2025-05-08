'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    BadgeCheck,
    VolumeX,
    Star,
    Terminal,
    Check,
    CheckCheck,
    Pin
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {useRouter} from "next/navigation";
import {useUserStore} from "@/stores/user";

interface IChatProps {
    chatId: string;
}

export default function SidebarChat({chatId}: IChatProps) {
    const user = useUserStore((state) => state.user)
    const router = useRouter();
    const hasFolders = false
    const handleClickOnChat = () => {
        router.push(`/app/chat/${chatId}`)
    }
    return (
        <div onClick={handleClickOnChat} className="sidebar-chat cursor-default w-full max-w-full px-1">
            <div className="sidebar-chat__container hover:bg-muted-foreground/10 rounded-lg h-18 px-3 py-1 flex items-center gap-1 w-full">
                <div className="avatar h-12 w-12 flex-shrink-0">
                    <Avatar className="w-full h-full">
                        <AvatarImage />
                        <AvatarFallback>{user?.firstName[0]}</AvatarFallback>
                    </Avatar>
                </div>

                <div className="usercontent flex flex-col pt-2 h-18 w-full min-w-0 gap-1 border-b md:border-none">
                    <div className="usercontent-top flex items-center w-full gap-1 overflow-hidden min-w-0">
                        {/* Username + icons container */}
                        <div className="flex items-center gap-1 w-full overflow-hidden min-w-0">
                            {/* Custom verified emoji*/}
                            <div className="flex items-center gap-2 shrink-0 w-4 h-4">
                                <Terminal />
                            </div>
                                {/* Username with ellipsis */}
                                <div
                                    className="truncate whitespace-nowrap overflow-hidden text-ellipsis text-sm text-foreground min-w-0 shrink">
                                    VeryLongUsernameVeryLongUsernameVeryLongUsername
                                </div>

                                {/* Icons (always visible, don't shrink) */}
                                <div className="flex items-center gap-2 shrink-0">
                                    <BadgeCheck className="w-4 h-4 text-foreground"/>
                                    <VolumeX className="w-4 h-4 text-muted-foreground"/>
                                    <Star className="w-4 h-4 text-yellow-500"/>
                                    <Badge
                                        className="border-red-400 text-red-400 rounded-sm text-[9px] uppercase"
                                        variant="outline"
                                    >
                                        Scam
                                    </Badge>
                                </div>
                            </div>

                            {/* Right side status */}
                            <div className="flex items-center gap-1 flex-shrink-0 ml-auto">
                                <Check className="w-4 h-4"/>
                                <CheckCheck className="w-4 h-4"/>
                                <span className="text-xs text-muted-foreground">0:00</span>
                            </div>
                        </div>

                        <div className="usercontent-bottom flex flex-col w-full gap-1 overflow-hidden min-w-0">
                        {/* Message row */}
                        <div
                            className={`usercontent-message flex items-start gap-1 overflow-hidden min-w-0 w-full`}
                        >
                            {/* Message text */}
                            <div
                                className={`text-sm text-muted-foreground ${
                                    hasFolders
                                        ? "truncate whitespace-nowrap overflow-hidden text-ellipsis"
                                        : "whitespace-pre-wrap break-words line-clamp-2"
                                } w-full min-w-0`}
                            >
                                VeryLongMessageWhatShouldWrapAndGoToNextLine
                                VeryLongMessageWhatShouldWrapAndGoToNextLine
                            </div>

                            {/* Icons (always visible) */}
                            <div className="flex items-center gap-1 shrink-0 w-fit items-start h-full min-w-10">
                                <div className="min-w-4 w-fit h-5 flex items-center justify-center rounded-full text-xs bg-foreground text-background p-1">
                                    123
                                </div>
                                <div className="h-5 flex items-center">
                                    <Pin className={"w-5 h-5 text-foreground rotate-45"} />
                                </div>
                            </div>
                        </div>

                        {/* Folders row */}
                        {hasFolders && (
                            <div className="flex items-center gap-1 flex-shrink-0 h-4">
                                <div className="folders flex gap-1">
                                    <Badge
                                        className="bg-blue-400/20 text-blue-400 rounded-sm text-xs h-4"
                                        variant="secondary"
                                    >
                                        Private
                                    </Badge>
                                    <Badge
                                        className="bg-green-400/20 text-green-400 rounded-sm text-xs h-4"
                                        variant="secondary"
                                    >
                                        Example
                                    </Badge>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
