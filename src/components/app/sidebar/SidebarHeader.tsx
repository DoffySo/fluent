'use client'
import Link from "next/link";
import {Menu, AlignJustify, CircleFadingPlus, SquarePen} from "lucide-react"
import {Button} from "@/components/ui/button";
import SidebarDrawer from "@/components/app/sidebar/SidebarDrawer";
import {useMediaQuery} from "usehooks-ts";
import SidebarChatFolders from "@/components/app/sidebar/SidebarChatFolders";
import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {AnimatePresence, motion} from "motion/react";
import {useSearchStore} from "@/stores/search";
import SidebarSearch from "@/components/app/sidebar/SidebarSearch";
// <Link href={"/app/settings"}>Settings</Link>

export default function SidebarHeader() {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const search = useSearchStore((state) => state.search)
    const setSearchValue = useSearchStore((state) => state.setSearchValue);
    const setSearching = useSearchStore((state) => state.setSearching);
    const setSearch = useSearchStore((state) => state.setSearch);

    return (
        <>
            {
                isMobile ? (
                    <>
                        <header
                            className="sidebar-header border-b bg-background/30 backdrop-blur-sm z-50 sticky top-0 flex flex-col gap-1 pb-1">
                            <div
                                className="sidebar-header__container grid grid-cols-3 items-center h-12 px-1 text-foreground px-2">
                                <SidebarDrawer/>
                                <div className={"flex items-center justify-center text-lg font-bold"}>
                                    <span>Chats</span>
                                </div>
                                <div className={"flex items-center justify-end gap-2"}>
                                    <Button size={"icon"} variant={"ghost"}>
                                        <CircleFadingPlus className={"min-h-5 min-w-5"}/>
                                    </Button>
                                    <Button size={"icon"} variant={"ghost"}>
                                        <SquarePen className={"min-h-5 min-w-5"}/>
                                    </Button>
                                </div>
                            </div>
                            <SidebarSearch />
                            <SidebarChatFolders/>
                        </header>
                    </>
                ) : (
                    <>
                        <header className="sidebar-header flex flex-col">
                            <div
                                className="sidebar-header__container flex items-center h-12 px-1 gap-2 text-foreground">
                                <SidebarDrawer/>
                                <span className={"text-sm"}>Fluent</span>
                            </div>
                            <SidebarSearch />
                            <SidebarChatFolders />
                        </header>
                    </>
                )
            }
        </>
    )
}