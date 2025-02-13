"use client"
import {useState} from "react";
import ChatItem from "@/app/components/sidebar/ChatItem";
import {useChatStore} from "@/app/stores/chat";
import {Button} from "@/components/ui/button";
import {Icon} from "@iconify/react";
import Link from "next/link";
import { useTheme } from 'next-themes'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import SheetAccounts from "@/app/components/sidebar/accounts/SheetAccounts";
import SidebarSheet from "@/app/components/sidebar/accounts/SidebarSheet";


export default function Sidebar({collapsed}: {collapsed?: boolean}) {
    const chatId = useChatStore(state => state.id)


    return (
        <>
            <div className="sidebar w-full md:w-1/3 h-full ">
                <div className="sidebar-container w-full h-full flex flex-col gap-1">
                    <div className="sidebar-header w-full">
                        <div className="sidebar-header__container w-full flex flex-col px-px">
                            <div className="top flex w-full gap-1 items-center h-12">
                                <div className="flex items-center">
                                    <SidebarSheet />
                                </div>
                                <div className="emoji-status flex items-center">
                                    <Button className={"hover:cursor-pointer"} size={"icon"} variant={"link"}>
                                        <Icon className={"scale-150"} icon="fluent:emoji-hint-48-regular" width="24" height="24" />
                                    </Button>
                                </div>
                                <div className="flex items-center">
                                    <Link href={"/"}>Fluent</Link>
                                </div>
                            </div>
                            <div className="search flex w-full items-center h-8">
                                <div className="search-container flex w-full h-full items-center rounded-sm overflow-hidden relative">
                                    <input className={"px-1 w-full h-full outline-none text-sm bg-muted-foreground/20 hover:bg-muted-foreground/35 border-b hover:border-blue-400 rounded-sm"} type="text" placeholder={"Search"}/>
                                    <div className="create-new flex absolute right-2">
                                        <Button className={"h-6 w-6 hover:cursor-pointer hover:bg-muted-foreground/15"} variant={"ghost"} size={"icon"}>
                                            <Icon icon="fluent:compose-48-regular" width="24" height="24" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="chat-list flex flex-col gap-1">
                        <div>Chat Id: {chatId}</div>
                        <ChatItem chatid={1} name={"Fluent Testing Chat"} text={"Test Fluent Testing Chat"} folders={["Private", "Testing"]} />
                        <ChatItem chatid={2} name={"Fluent Testing Chat Secondary"} text={"Test Fluent Testing Chat Secondary"} folders={["Private"]} />
                        <ChatItem chatid={3} name={"testbotnigger"} text={"Test testbotnigger"} />
                    </ul>
                </div>
            </div>
        </>
    )
}