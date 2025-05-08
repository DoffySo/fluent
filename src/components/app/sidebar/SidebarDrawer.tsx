'use client'
import {Button} from "@/components/ui/button";
import {
    Menu,
    SmilePlus,
    CircleUserRound,
    Bookmark,
    MessagesSquare,
    Settings
} from "lucide-react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {useMediaQuery} from "usehooks-ts";
import SidebarChangeTheme from "@/components/app/sidebar/SidebarChangeTheme";
import SidebarCurrentUser from "@/components/app/sidebar/SidebarCurrentUser";
import Link from "next/link";
import {useRouter} from "next/navigation";


export default function SidebarDrawer() {
    const router = useRouter();
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <>
            <Drawer direction={isMobile ? "bottom" : "left"}>
                <DrawerTrigger asChild>
                    <Button size={"icon"} variant={"ghost"}>
                        <Menu className={"min-h-6 min-w-6 h-6 w-6"} />
                    </Button>
                </DrawerTrigger>
                <DrawerContent className={"h-200 md:h-full"}>
                    <DrawerHeader>
                        <SidebarChangeTheme />
                    </DrawerHeader>
                    <div className="flex flex-col px-2 gap-2">
                        <SidebarCurrentUser />
                        <div className={"my-2 flex flex-col"}>
                            <div className="flex flex-col gap-1 border-b pb-1 mb-1">
                                <Button className={"items-center justify-start h-10"} variant={"ghost"}>
                                    <div className="h-5 w-5">
                                        <SmilePlus className={"min-h-full min-w-full"}/>
                                    </div>
                                    <span>
                                        Change Status
                                    </span>
                                </Button>
                                <Button className={"items-center justify-start h-10"} variant={"ghost"}>
                                    <div className="h-5 w-5">
                                        <CircleUserRound className={"min-h-full min-w-full"}/>
                                    </div>
                                    <span>
                                        My Profile
                                    </span>
                                </Button>
                            </div>
                            <div className="flex flex-col gap-1 border-b pb-1 mb-1">
                                <Button className={"items-center justify-start h-10"} variant={"ghost"}>
                                    <div className="h-5 w-5">
                                        <Bookmark className={"min-h-full min-w-full"}/>
                                    </div>
                                    <span>
                                        Saved Messages
                                    </span>
                                </Button>
                            </div>
                            <div className="flex flex-col gap-1 pb-1 mb-1">
                                <Button className={"items-center justify-start h-10"} variant={"ghost"}>
                                    <div className="h-5 w-5">
                                        <MessagesSquare className={"min-h-full min-w-full"}/>
                                    </div>
                                    <span>
                                        Chats
                                    </span>
                                </Button>
                                <Button onClick={() => router.push('/app/settings')} className={"items-center justify-start h-10"} variant={"ghost"}>
                                    <div className="h-5 w-5">
                                        <Settings className={"min-h-full min-w-full"}/>
                                    </div>
                                    <span>
                                        Settings
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>

        </>
    )
}