import { ScrollArea } from "@/components/ui/scroll-area"
import SidebarChat from "@/components/app/sidebar/SidebarChat";


export default function SidebarScrollable() {
    return (
        <>
            <div className={"sidebar-chats h-full max-w-full overflow-y-auto overflow-x-hidden"}>
                <div className="sidebar-chats__container max-w-full flex flex-col gap-1">
                    <SidebarChat chatId={"string"}/>
                </div>
            </div>
        </>
    )
}