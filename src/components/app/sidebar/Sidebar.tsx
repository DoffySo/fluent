'use client'
import Link from "next/link";
import SidebarHeader from "@/components/app/sidebar/SidebarHeader";
import SidebarScrollable from "@/components/app/sidebar/SidebarScrollable";
import {useSearchStore} from "@/stores/search";
import {AnimatePresence, motion} from "motion/react";
import SearchUser from "@/components/app/search/SearchUser";
import SidebarSearchList from "@/components/app/sidebar/SidebarSearchList";
import {useChatStore} from "@/stores/chat";
import {useMediaQuery} from "usehooks-ts";
import {useSelectedLayoutSegments} from "next/navigation";

export default function Sidebar() {
    const segments = useSelectedLayoutSegments();
    const search = useSearchStore((state) => state.search)
    const setSearchValue = useSearchStore((state) => state.setSearchValue);
    const setSearching = useSearchStore((state) => state.setSearching);
    const setSearch = useSearchStore((state) => state.setSearch);

    const chat = useChatStore(state => state.chat);
    const isMobile = useMediaQuery('(max-width: 768px)')
    const isDesktop = useMediaQuery('(min-width: 768px)')
    const isNestedRoute = segments.length > 0;
    const shouldHideSidebar = isNestedRoute;

    const shouldRenderSidebar = isDesktop || (isMobile && !chat?.id) && (!shouldHideSidebar && isMobile);
    if (!shouldRenderSidebar) return null;

    return (
        <>
            <div className="sidebar w-full md:w-4/12 xl:w-3/12 bg-background h-screen md:border-r">
                <div className="sidebar-container flex flex-col gap-1 h-full">
                    <SidebarHeader/>
                    <div className="flex max-w-full overflow-x-hidden">
                        {/*<AnimatePresence initial={false}>*/}
                        {/*    {!search?.isSearching && (*/}
                        {/*        <motion.div*/}
                        {/*            initial={{ opacity: 0, x: -200 }}*/}
                        {/*            animate={{ opacity: 1, x: 0 }}*/}
                        {/*            exit={{ opacity: 0, x: -200 }}*/}
                        {/*            transition={{*/}
                        {/*                duration: .2,*/}
                        {/*                ease: "circInOut"*/}
                        {/*            }}*/}
                        {/*            key={"scrollableChats"} className={"w-full"}>*/}
                        {/*            <SidebarScrollable />*/}
                        {/*        </motion.div>*/}
                        {/*    )}*/}
                        {/*</AnimatePresence>*/}
                        {/*<AnimatePresence initial={false}>*/}
                        {/*    {search?.isSearching && (*/}
                        {/*        <motion.div*/}
                        {/*            initial={{ opacity: 0, x: 100 }}*/}
                        {/*            animate={{ opacity: 1, x: 0 }}*/}
                        {/*            exit={{ opacity: 0, x: 100 }}*/}
                        {/*            transition={{*/}
                        {/*                duration: .4,*/}
                        {/*                ease: "circInOut"*/}
                        {/*            }}*/}
                        {/*            key={"scrollableChats"}*/}
                        {/*            className={"w-full h-full bg-red-400"}>*/}
                        {/*            <div className={"result h-full w-full"}>*/}
                        {/*                <div className="result-container h-full w-full">*/}
                        {/*                    <SearchUser />*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </motion.div>*/}
                        {/*    )}*/}
                        {/*</AnimatePresence>*/}

                        <motion.div
                            animate={{x: search?.isSearching ? "-100%" : 0}}
                            transition={{
                                duration: .3,
                                ease: "circInOut"
                            }}
                            className="flex w-full">
                            <motion.div
                                animate={{opacity: !search?.isSearching ? 1 : 0}}
                                transition={{
                                    duration: .35,
                                    ease: "circInOut"
                                }}
                                className="chat flex min-w-full">
                                <SidebarScrollable/>
                            </motion.div>
                            <motion.div
                                animate={{opacity: search?.isSearching ? 1 : 0}}
                                transition={{
                                    duration: .35,
                                    ease: "circInOut"
                                }}
                                className="search flex min-w-full">
                                <SidebarSearchList/>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    )
}