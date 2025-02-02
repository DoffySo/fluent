"use client"
// import {ThemeSwitcher} from "@/app/components/ThemeSwitcher";
// import {ThemeProvider} from "next-themes";
import Sidebar from '@/app/components/sidebar/sidebar'
import Chat from '@/app/components/chat/Chat'
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import {useState} from "react";
import {useChatStore} from "@/app/stores/chat";

export default function App() {

    const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
    const chatId = useChatStore(state => state.id)

    return (
        <>
            <header>
                <title>Fluent</title>
            </header>
            <div className="wrapper flex items-center w-full h-screen gap-6">
                <PanelGroup autoSaveId="chatResizeble" direction="horizontal">
                    <Panel
                        onCollapse={() => setSidebarCollapsed(true)}
                        onExpand={() => setSidebarCollapsed(false)}
                        defaultSize={25}
                        minSize={15}
                        maxSize={50}
                        collapsible={true}
                        collapsedSize={8}
                        className={`${chatId ? 'hidden sm:flex' : ""}`}
                    >
                        <Sidebar collapsed={sidebarCollapsed} />
                    </Panel>
                    <PanelResizeHandle />
                    <Panel
                        defaultSize={75}
                        minSize={50}
                        maxSize={100}
                        className={`${chatId ? '' : "hidden sm:flex"}`}>
                        <Chat />
                    </Panel>
                </PanelGroup>
            </div>
        </>

    )
}