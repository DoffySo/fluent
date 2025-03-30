"use client"

import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/app/stores/chat";
import { useState } from "react";
import Image from "next/image";

export default function ChatHeader() {
    const setCurrentChatId = useChatStore(state => state.setId);
    const [opened, setOpened] = useState(false);

    function openHeader() {
        return setOpened(true)
    }
    function handleBack() {
        return opened ? setOpened(false) : setCurrentChatId(null);
    }

    return (
        <>
            <div
                className={`chat-header w-full absolute top-0 bg-background/20 backdrop-blur-[3px] text-foreground ${opened ? 'h-full backdrop-blur-none z-50 bg-background/100' : 'bg-background/20 border-b border-accent'}`}>
                <div
                    className={`chat-header__container w-full flex items-center h-16 relative`}>
                    <div onClick={() => openHeader()} className="background h-full w-full absolute z-10 hover:bg-muted-foreground/13 hover:cursor-default"></div>
                    <div className="foreground px-2 flex items-center gap-2 justify-between md:justify-start h-full w-full">
                        <div
                            className={`back z-20 h-fit items-center w-fit items-center flex hover:cursor-pointer hover:bg-neutral-400/30 rounded-full relative overflow-hidden`}
                            onClick={() => handleBack()}>
                            <Icon icon="fluent:chevron-left-48-filled" width="21" height="21"/>
                        </div>
                        <div
                            className={`avatar z-20 w-12 h-12 order-3 md:order-0`}>
                            <Avatar className={`w-full h-full`}>
                                <AvatarImage src={"https://github.com/shadcn.png"} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className={`user z-20 flex flex-col duration-100 w-fit items-center md:items-start ${opened ? 'items-center' : ''}`}>
                            <div className="user-username w-fit flex">
                                Acme Inc.
                            </div>
                            <div className={`user-status w-fit text-xs text-muted-foreground flex`}>
                                Offline
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}


/*
export default function ChatHeader() {
    const setCurrentChatId = useChatStore(state => state.setId)
    const [opened, setOpened] = useState<boolean>(false)

    function openInfo() {
        setOpened(true);
    }
    function closeInfo() {
        setOpened(!opened);
    }

    return (
        <>
            <div
                className={`chat-header w-full absolute top-0 bg-background/20 backdrop-blur-[3px] text-foreground duration-300 ${opened ? 'h-full' : 'h-16 bg-background/20 border-b border-accent'}`}>
                <div
                    className={`chat-header__container w-full ${opened ? "h-64 bg-background flex flex-col" : "h-16 bg-background/20 grid grid-cols-[0.2fr_0.8fr_0.2fr]"} md:flex md:grid-cols-0`}>
                    {!opened &&
                        <div
                            className={`back my-auto p-1 h-fit w-fit items-center flex hover:cursor-pointer hover:bg-neutral-400/30 rounded-full ${opened ? "col-span-3" : ""}`}
                            onClick={() => setCurrentChatId(null)}>
                            <Icon icon="fluent:chevron-left-48-filled" width="28" height="28"/>
                            <div
                                className="badge -ml-1 bg-secondary px-1.5 text-xs font-medium text-muted-foreground rounded-full flex md:hidden">
                                10
                            </div>
                        </div>
                    }
                    {opened &&

                        <div className={`action my-1 h-fit w-fit items-center flex w-full`}>
                            <div
                                className={`back my-auto h-fit w-fit items-center flex hover:cursor-pointer rounded-full ${opened ? "" : ""}`}
                                onClick={() => closeInfo()}>

                                <Icon icon="fluent:chevron-left-48-filled" width="28" height="28"/>
                                <div
                                    className="badge text-xs md:text-md font-medium text-primary rounded-full flex">
                                    Back
                                </div>
                            </div>
                        </div>
                    }
                    <div
                        className={`user-avatar h-10 w-10 flex items-center ms-auto me-2 md:ms-0 place-items-end transition-all duration-300 ${opened ? "order-0 me-auto md:ms-auto w-21 h-21" : "order-3 my-auto md:order-0"}`}>
                        <Avatar className={`${opened ? "w-21 h-21" : "w-10 h-10"}`}>
                            <AvatarImage
                                src={"https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/apple-touch-icon-256x256.png"}/>
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    </div>
                    <div
                        onClick={() => {openInfo()}}
                        className={`user flex items-center justify-center text-center transition-all duration-300 ${opened ? "md:text-center order-2" : "md:text-left"}`}>
                        <div className="user-info flex flex-col h-12 w-fit font-medium">
                                        <span className="username">
                                            Username
                                        </span>
                            <span className="status text-sm text-gray-500">
                                            status
                                        </span>
                        </div>
                    </div>
                    <div className={`buttons order-last gap-4 px-1 mx-auto mt-4 duration-300 ${opened ? "flex opacity-100" : "hidden opacity-0 h-0 w-0"}`}>

                        <div
                            className="btn audiocall flex flex-col text-foreground bg-secondary rounded-md w-14 h-12 items-center justify-center hover:cursor-pointer hover:text-muted-foreground duration-150">
                            <Icon icon="fluent:call-48-filled" width="21" height="21"/>
                            <span className={"text-xs"}>
                                call
                            </span>
                        </div>

                        <div
                            className="btn videocall flex flex-col text-foreground bg-secondary rounded-md w-14 h-12 items-center justify-center hover:cursor-pointer hover:text-muted-foreground duration-150">
                            <Icon icon="fluent:video-48-filled" width="21" height="21"/>
                            <span className={"text-xs"}>
                                video
                            </span>
                        </div>

                        <div
                            className="btn mute flex flex-col text-foreground bg-secondary rounded-md w-14 h-12 items-center justify-center hover:cursor-pointer hover:text-muted-foreground duration-150">
                            <Icon icon="fluent:alert-48-filled" width="21" height="21"/>
                            <span className={"text-xs"}>
                                mute
                            </span>
                        </div>

                        <div
                            className="btn search flex flex-col text-foreground bg-secondary rounded-md w-14 h-12 items-center justify-center hover:cursor-pointer hover:text-muted-foreground duration-150">
                            <Icon icon="fluent:search-48-filled" width="21" height="21"/>
                            <span className={"text-xs"}>
                                search
                            </span>
                        </div>

                        <div
                            className="btn more flex flex-col text-foreground bg-secondary rounded-md w-14 h-12 items-center justify-center hover:cursor-pointer hover:text-muted-foreground duration-150">
                            <Icon icon="fluent:more-horizontal-48-filled" width="21" height="21"/>
                            <span className={"text-xs"}>
                                more
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}*/