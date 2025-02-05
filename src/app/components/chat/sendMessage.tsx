import {Icon} from "@iconify/react";
import TextareaAutosize from "react-textarea-autosize";

interface sendMessageProps {
    chatid: number
}

export default function sendMessage({chatid}: sendMessageProps) {


    return (
        <>
            <div
                className="chat-footer w-full border-t border-gray-200 min-h-16 h-auto bg-white/30 absolute z-[5000] bottom-0 backdrop-blur-[3px] items-center flex">
                <div className="chat-footer__container px-1 flex gap-2 items-center h-full w-full">
                    <div className="btn attach flex hover:cursor-pointer hover:bg-neutral-400/30 p-1 rounded-full">
                        <Icon icon="fluent:attach-48-filled" width="24" height="24"/>
                    </div>
                    <div className="search w-full flex mx-1 hover:cursor-pointer">
                        <div className="search-container w-full flex items-center">
                            <TextareaAutosize placeholder={"Message"} rows={3} maxRows={6}
                                              className={"resize-none outline-none w-full"}/>
                        </div>
                    </div>
                    <div className="sheduled flex mx-1 hover:cursor-pointer">
                        <Icon icon="fluent:clock-bill-24-filled" width="24" height="24"/>
                    </div>
                    <div className="sticker flex mx-1 hover:cursor-pointer">
                        <Icon icon="fluent:sticker-24-regular" width="24" height="24"/>
                    </div>
                    <div className="record-message flex mx-1 hover:cursor-pointer">
                        <Icon icon="fluent:mic-48-regular" width="24" height="24"/>
                    </div>
                    <div className="send flex mx-1 hover:cursor-pointer">
                        <Icon icon="fluent:send-24-filled" width="24" height="24"/>
                    </div>
                </div>
            </div>
        </>
    )
}