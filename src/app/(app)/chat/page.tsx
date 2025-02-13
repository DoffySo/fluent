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
    const updateUser = useUserStore(state => state.updateUser);
    const setUser = useUserStore(state => state.setUser);
    const currentUser = useUserStore(state => state.user);

    const fetchUserData = async () => {
        const session = await getSession();
        if (session?.user_id) {
            const token = session.token; // Assuming you have a token in the session
            setUser(token); // Optionally, set user data if required
        }
    };


    useEffect(() => {
        fetchUserData();

        console.log(currentUser, "current user");
    }, [])


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