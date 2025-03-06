"use client"
import {useEffect, useState} from "react";
import {Icon} from "@iconify/react";
import {useChatStore} from "@/app/stores/chat";
import Image from 'next/image'
import TextareaAutosize from 'react-textarea-autosize';
import {ChatContext} from "@/app/components/chat/ChatContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {decryptMessage, encryptMessage, generateRSAKeys} from "@/app/lib/crypto";
import ChatHeader from "@/app/components/chat/ChatHeader";

const initialContextMenu = {
    show: false,
    x: 0,
    y: 0,
}

export default function Chat({chatid}: {chatid?: number}) {
    const [selectedChat, setSelectedChat] = useState<number | null>(null);
    const [contextMenu, setContextMenu] = useState(initialContextMenu);



    const setCurrentChatId = useChatStore(state => state.setId)

    function handleContextMenu(e) {
        e.preventDefault();
        console.log(e)

        const {pageX, pageY} = e;
        const {clientX, clientY} = e;
        const {offsetWidth, offsetHeight} = e.target;

        setContextMenu({show: true, x: clientX , y: clientY});
    }
    function closeContextMenu() {
        console.log(1)
        setContextMenu({show: false, x: 0, y: 0});
    }

    async function genRSA() {
        const {publicKey, privateKey} = await generateRSAKeys();
        const message = "Hello, World!"
        const encryptedMessage = await encryptMessage(message, publicKey);
        const decryptedMessage = await decryptMessage(encryptedMessage, privateKey);
        console.log(`Public Key: \n${publicKey}\n\nPrivate Key: \n${privateKey}`);
        console.log(`Encrypted Message: \n${encryptedMessage}\n\nDecrypted Message: \n${decryptedMessage}`);
    }

    return (
        <>

            <div className="chat w-full sm:border-l h-full border-accent z-1">
                { chatid &&
                    <div className="chat-container flex flex-col w-full h-full relative hover:cursor-default">

                        <ChatHeader />

                        <div className="chat-content w-full h-full">
                            <div
                                onContextMenu={handleContextMenu}
                                className="chat-content__container px-1 h-full w-full flex">
                                    {contextMenu.show && <ChatContext chatid={chatid} x={contextMenu.x} y={contextMenu.y} closeContextMenu={closeContextMenu}/>}
                                    Text12321321
                            </div>
                        </div>

                        <div className="chat-footer w-full border-t border-accent min-h-16 h-auto bg-background/20 absolute z-[5000] bottom-0 backdrop-blur-[3px] items-center flex">
                            <div className="chat-footer__container px-1 flex gap-2 items-center h-full w-full">
                                <div className="btn attach flex hover:cursor-pointer hover:bg-neutral-400/30 p-1 rounded-full">
                                    <Icon icon="fluent:attach-48-filled" width="24" height="24" />
                                </div>
                                <div className="search w-full flex mx-1 hover:cursor-pointer">
                                    <div className="search-container w-full flex items-center">
                                        <TextareaAutosize placeholder={"Message"} rows={3} maxRows={6} className={"resize-none outline-none w-full"} />
                                    </div>
                                </div>
                                <div className="sheduled flex mx-1 hover:cursor-pointer">
                                    <Icon icon="fluent:clock-bill-24-filled" width="24" height="24" />
                                </div>
                                <div className="sticker flex mx-1 hover:cursor-pointer">
                                    <Icon icon="fluent:sticker-24-regular" width="24" height="24" />
                                </div>
                                <div className="record-message flex mx-1 hover:cursor-pointer">
                                    <Icon icon="fluent:mic-48-regular" width="24" height="24" />
                                </div>
                                <div className="send flex mx-1 hover:cursor-pointer">
                                    <Icon icon="fluent:send-24-filled" width="24" height="24" />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

        </>
    )
}