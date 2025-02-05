"use client"
import {useEffect, useState} from "react";
import {Icon} from "@iconify/react";
import {useChatStore} from "@/app/stores/chat";
import Image from 'next/image'
import TextareaAutosize from 'react-textarea-autosize';
import {ChatContext} from "@/app/components/chat/ChatContext";
import Avatar from "@/app/components/Avatar";
import {decryptMessage, encryptMessage, generateRSAKeys} from "@/app/lib/crypto";

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

            <div className="chat w-full sm:border-l h-full border-gray-200">
                { chatid &&
                    <div className="chat-container flex flex-col w-full h-full relative hover:cursor-default">

                        <div className="chat-header w-full border-b border-gray-200 h-16 absolute z-[5000] top-0 bg-white/30 backdrop-blur-[3px] text-neutral-900">
                            <div className="chat-header__container w-full h-full flex px-1 gap-2">
                                <div className="back my-auto p-1 h-fit w-fit items-center flex hover:cursor-pointer hover:bg-neutral-400/30 rounded-full" onClick={() => setCurrentChatId(null)}>
                                    <Icon icon="fluent:chevron-left-48-filled" width="28" height="28" />
                                    <div className="badge -ml-1 bg-gray-400 px-1.5 text-xs font-medium text-white rounded-full flex md:hidden">
                                        10
                                    </div>
                                </div>
                                <div className="user h-full w-full flex items-center gap-2">
                                    <div className="user-avatar h-10 w-10 flex">
                                        <Avatar fallbackLetters={"U"} src={"https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/apple-touch-icon-256x256.png"} width={40} height={40} />
                                    </div>
                                    <div className="user-info flex flex-col h-12 w-fit font-medium">
                                        <span className="username">
                                            Username
                                        </span>
                                        <span className="status text-sm text-gray-500">
                                            status
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="chat-content w-full h-full">
                            <div
                                onContextMenu={handleContextMenu}
                                className="chat-content__container px-1 h-full w-full flex">
                                    {contextMenu.show && <ChatContext chatid={chatid} x={contextMenu.x} y={contextMenu.y} closeContextMenu={closeContextMenu}/>}
                                    Text12321321
                            </div>
                        </div>

                        <div className="chat-footer w-full border-t border-gray-200 min-h-16 h-auto bg-white/30 absolute z-[5000] bottom-0 backdrop-blur-[3px] items-center flex">
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