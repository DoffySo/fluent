"use client"
import {useState} from "react";
import ChatItem from "@/app/components/sidebar/ChatItem";
import {useChatStore} from "@/app/stores/chat";

export default function Sidebar({collapsed}: {collapsed?: boolean}) {
    const chatId = useChatStore(state => state.id)


    return (
        <>
            <div className="sidebar w-full sm:border-r h-full border-gray-200">
                <div className="sidebar-container w-full h-full flex flex-col gap-1">
                    <ul className="chat-list flex flex-col gap-1">
                        <div>Chat Id: {chatId}</div>
                        <ChatItem chatid={1} collapsed={collapsed} name={"Fluent Testing Chat"} text={"Test Fluent Testing Chat"} folders={["Private", "Testing"]} />
                        <ChatItem chatid={2} collapsed={collapsed} name={"Fluent Testing Chat Secondary"} text={"Test Fluent Testing Chat Secondary"} folders={["Private"]} />
                        <ChatItem chatid={3} collapsed={collapsed} name={"testbotnigger"} text={"Test testbotnigger"} />
                    </ul>
                </div>
            </div>
        </>
    )
}