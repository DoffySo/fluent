import {useRef} from "react";
import {useClickOutside} from "@/app/hooks/useClickOutside";
import {Icon} from "@iconify/react";

interface ChatContextProps {
    chatid: number
    x: number
    y: number
    closeContextMenu: () => void
}
interface ContextButtonProps {
    icon?: string | undefined,
    text?: string | undefined,
    variant?: string | undefined,
    size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined,
}

function ContextButton({icon, text, variant, size}: ContextButtonProps) {

    if (!variant || variant === 'primary') {
        return (
            <button
                className={`btn hover:bg-neutral-300 active:bg-neutral-300 focus:bg-neutral-300 text-start px-2 py-1 rounded-md w-full flex items-center gap-1 ${size ? `text-${size}` : ''}`}>
                {icon && <Icon icon={icon} width="18" height="18" />}
                {text && text}
            </button>
        )
    }
    else if (variant === 'danger') {
        return (
            <button
                className={`btn text-red-400 hover:bg-red-400/60 active:bg-red-400/60 focus:bg-red-400/60 hover:text-neutral-100 active:text-neutral-100 text-start px-2 py-1 rounded-md w-full flex items-center gap-1 ${size ? `text-${size}` : ''}`}>
                {icon && <Icon icon={icon} width="18" height="18" />}
                {text && text}
            </button>
        )
    }
}

export function ChatContext({chatid, x, y, closeContextMenu}: ChatContextProps) {

    const contextMenuRef = useRef<HTMLDivElement | null>(null)
    useClickOutside(contextMenuRef, closeContextMenu)

    return (
        <>
            <div
                ref={contextMenuRef}
                onClick={closeContextMenu}
                className={`chatcontext flex min-h-2 min-w-48 w-auto h-fit px-2 py-1 bg-gray-200/40 shadow-md drop-shadow-xl backdrop-blur-[2px] rounded-md fixed z-20`} style={{top: `${y}px`, left: `${x}px`}}>
                <div className="chatcontext-container flex flex-col w-full">
                    <ul className="actions flex flex-col gap-1 text-md font-normal">
                        <div className="actions-read flex py-1 border-b border-gray-300">
                            <ContextButton size={"xs"} icon={"solar:check-read-outline"} text={"read at 00:00"}/>
                        </div>
                        <div className="actions-primary border-b border-gray-300 flex flex-col pb-1 gap-1">
                            <ContextButton icon={"fluent:arrow-reply-48-regular"} text={"Reply"} />
                        </div>
                        <div className="actions-secondary flex flex-col border-b border-gray-300 pb-1 gap-1">
                            <ContextButton icon={"solar:pin-outline"} text={"Pin"} />
                            <ContextButton icon={"fluent:arrow-forward-48-regular"} text={"Forward"} />
                            <ContextButton text={"Delete"} variant={"danger"} icon={"fluent:delete-48-regular"} />
                            <ContextButton icon={"fluent:checkmark-circle-48-regular"} text={"Select"} />
                        </div>
                        <div className="actions-copy flex flex-col border-b border-gray-300 pb-1 gap-1">
                            <ContextButton icon={"fluent:document-copy-48-regular"} text={"Copy"} />
                            <ContextButton icon={"fluent:image-48-regular"} text={"Copy Image"} />
                        </div>
                        <div className="actions-save">
                            <ContextButton icon={"fluent:save-32-regular"} text={"Save as"} />
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
}