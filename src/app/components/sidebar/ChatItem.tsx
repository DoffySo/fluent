import Avatar from "@/app/components/Avatar";
import {useChatStore} from "@/app/stores/chat";


export default function ChatItem({chatid, collapsed, name, text, folders} : {chatid: number, collapsed: boolean, name: string, text: string, folders: string[]}) {

    const currentChatId = useChatStore(state => state.id)
    const setCurrentChatId = useChatStore(state => state.setId)

    function selectChat(id: number) {
        setCurrentChatId(id)
    }

    return (
        <>
            <div onClick={()=>selectChat(chatid)} className="chatitem flex w-full h-18 cursor-default bg-neutral-50 hover:bg-neutral-200 active:bg-neutral-200 px-1 rounded-md">
                <div className="chatitem-container w-full h-full flex my-auto">
                    <div className={`avatar-container min-w-16 w-16 h-16 flex p-2 my-auto ${collapsed ? "mx-auto md:w-16 md:h-16 lg:w-18 lg:h-18 sm:h-12 sm:w-12" : ""}`}>
                        <Avatar />
                    </div>
                    { !collapsed &&
                    <div className="content-container w-full h-18 border-b border-gray-300 flex flex-col overflow-x-hidden text-ellipsis">
                        <div className="heading flex">
                            <div className="heading__title text-gray-900 overflow-x-hidden text-ellipsis">
                                <span className="text-sm font-medium whitespace-nowrap text-ellipsis">
                                    {name}
                                </span>
                            </div>
                        </div>
                        <div className="subheading flex justify-between pb-px h-full">
                            <div className="subheading-left flex flex-col w-full">
                                <div className="subheading__text w-full text-gray-500 overflow-x-hidden text-ellipsis">
                                    <span className="text-sm font-normal whitespace-nowrap text-ellipsis">
                                        {text}
                                    </span>
                                </div>
                                {folders &&
                                <div className="subheading__folder w-fit flex gap-1 flex-nowrap">
                                    {
                                        folders.map((folder, index) =>
                                            <div
                                                key={index}
                                                className="badge text-xs font-medium text-indigo-600 bg-indigo-400/40 px-1 py-0.5 rounded-sm">
                                                {folder}
                                            </div>)
                                    }
                                </div>
                                }
                            </div>
                            <div className="subheading-right flex">

                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </>
    )
}