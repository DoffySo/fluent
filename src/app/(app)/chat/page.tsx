"use client"
// import {ThemeSwitcher} from "@/app/components/ThemeSwitcher";
// import {ThemeProvider} from "next-themes";
import Sidebar from '@/app/components/sidebar/sidebar'
import Chat from '@/app/components/chat/Chat'
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import {useEffect, useState} from "react";
import {useChatStore} from "@/app/stores/chat";
import {useViewport} from "@/app/hooks/useViewport";
import {getSession} from "@/app/lib/session";
import {useUserStore} from "@/app/stores/user";

export default function App() {

    const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
    const chatId = useChatStore(state => state.id)
    const { isMobile, isTablet, isDesktop } = useViewport();
    // const [session, setSession] = useState<unknown | null>(null)
    const currentUser = useUserStore(state => state.user);


    return (
        <>
            <header>
                <title>Fluent</title>
            </header>
            <div className="wrapper flex items-center w-full h-screen">
                {((!chatId && isMobile) || isDesktop || isTablet) && <Sidebar collapsed={sidebarCollapsed} />}
                {(chatId || isDesktop || isTablet) && <Chat chatid={chatId} />}

            </div>
        </>

    )
}