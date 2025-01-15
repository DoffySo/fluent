import Header from "@/app/components/Header";
import {Icon} from '@iconify/react'

export default function Chat() {


    return (
        <div className="wrapper flex flex-col items-center w-full bg-neutral-950 h-screen">
            <div className="container w-full text-white flex sm:gap-2">
                <div className="list sm:w-1/4 hidden sm:flex">
                    <div className="list-container container flex flex-col">
                        <div className="list-chat">1</div>
                    </div>
                    
                </div>
                <div className="chat w-full sm:w-3/4 flex relative">
                    <div className="chat-container container flex flex-col cursor-default relative">
                        <div className="chat-header bg-neutral-900 px-2 py-1.5 h-16 fixed md:relative top-0 left-0 w-full">
                            <div className="container flex md:gap-4 my-auto w-full mx-auto">
                                <div className="back flex me-2">
                                    <div className="back-container container h-12 my-auto flex gap-1">
                                        <button className="icon w-8 h-8 my-auto flex hover:bg-neutral-300/10 rounded-full text-neutral-400 hover:text-white">
                                            <Icon className="my-auto mx-auto" icon="fluent:arrow-left-48-filled" width="24" height="24" />
                                        </button>
                                        <div className="badge bg-blue-500 font-sm flex my-auto h-4 rounded-full">
                                            <div className="badge-container flex px-1">
                                                <span className="unreaded-chats text-[12px]">123</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="avatar flex order-last md:order-none ms-auto md:ms-0 my-auto">
                                    <div className="avatar-container bg-slate-500 flex w-10 h-10 my-auto rounded-full hover:cursor-pointer">
                                        <img src="https://i.pinimg.com/736x/44/4c/8d/444c8d4580a228de682255aa1c5b775e.jpg" className="w-full h-full rounded-full bg-center bg-no-repeat bg-cover" />
                                    </div>
                                </div>
                                <div className="user flex mx-auto md:mx-0 w-full md:w-auto">
                                    <div className="user-container container flex flex-col">
                                        <div className="username mx-auto md:mx-0 font-bold mt-auto">
                                            <span className="username-holder flex text-sm">Username</span>
                                        </div>
                                        <div className="status mb-auto mx-auto">
                                            <span className="status-holder flex text-xs text-neutral-400">last seen just now</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="interactions hidden md:flex ms-auto my-auto w-fit">
                                    <div className="interactions-container container flex justify-between gap-1">
                                        <button className="btn videocall flex w-10 h-10 my-auto hover:bg-neutral-300/10 rounded-md">
                                            <div className="videocall-container flex mx-auto my-auto">
                                                <Icon className="mx-auto" icon="fluent:video-28-regular" width="24" height="24" />
                                            </div>
                                        </button>
                                        <button className="btn voicecall flex w-10 h-10 hover:bg-neutral-300/10 rounded-md">
                                            <div className="voicecall-container flex mx-auto my-auto">
                                                <Icon className="mx-auto" icon="fluent:call-28-regular" width="24" height="24" />
                                            </div>
                                        </button>
                                        <button className="btn search flex w-10 h-10 hover:bg-neutral-300/10 rounded-md">
                                            <div className="search-container flex mx-auto my-auto">
                                                <Icon className="mx-auto" icon="fluent:search-28-regular" width="24" height="24" />
                                            </div>
                                        </button>
                                        <button className="btn more flex w-10 h-10 hover:bg-neutral-300/10 rounded-md">
                                            <div className="more-container flex mx-auto my-auto">
                                                <Icon className="mx-auto" icon="fluent:more-horizontal-28-regular" width="24" height="24" />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="chat-messages">
                            <div className="container messages flex flex-col">
                                <div className="message">
                                    
                                </div>
                            </div>
                        </div>
                        <div className="chat-controls">
                            <div className="container flex">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}