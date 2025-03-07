"use client"
import {Button} from "@/components/ui/button";
import {Icon} from "@iconify/react";
import AuthDialog from "@/app/components/dialogs/auth";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import {useUserStore} from "@/app/stores/user";

export default function ApplicationsSection() {
    const user = useUserStore((state) => state.user);

    return (
        <>
            <div className="applications w-full flex mt-16">
                <div
                    className="applications-container w-full px-4 sm:px-0 sm:w-2/3 md:w-1/2 mx-auto flex flex-col items-center gap-2">
                    <h2 className={`conquera text-2xl sm:text-3xl md:text-5xl font-black`}>Download</h2>
                    <p className={`boston text-xs md:text-sm text-muted-foreground text-center`}>Start your journey with
                        powerful features that enhance your chatting experience. Download the official Fluent
                        application or use it in a browser.</p>
                    <div className="buttons flex flex-col sm:flex-row gap-2 items-center mt-2">
                        {user.token ? (
                            <>
                                <Button className={`boston font-semibold flex items-center`} size={"sm"}>
                                    <Icon icon="streamline:web" width="21" height="21"/> Use in browser
                                </Button>
                            </>
                        ) : (
                            <>
                                <AuthDialog textWeight={"font-semibold"} icon={"fluent:person-circle-32-regular"} text={"Sign in to Fluent"} forceShow isSmall signIn={true}/>
                            </>
                        )
                        }
                        <TooltipProvider>
                            <Tooltip delayDuration={250}>
                                <TooltipTrigger>
                                    <>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button disabled size={"sm"}
                                                        className={`boston font-semibold hover:cursor-pointer flex items-center`}
                                                        variant={"secondary"}>
                                                    <Icon icon="famicons:extension-puzzle-outline" width="21"
                                                          height="21"/>
                                                    Web Extension
                                                    <Icon icon="fluent:chevron-down-48-regular" width="24" height="24"/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className={`boston flex flex-col gap-2`}>
                                                <DropdownMenuLabel
                                                    className={`flex items-center gap-1 text-xs hover:cursor-pointer hover:bg-muted-foreground/15 rounded-sm duration-150 transition-all`}>
                                                    <Link className={`flex items-center w-full`} href={"#"}>
                                                        <div className="w-7 h-full">
                                                            <Image src={"vercel.svg"} alt={"logo"} width={16}
                                                                   height={16}/>
                                                        </div>
                                                        <div className="w-24 h-full flex items-center">
                                                            Stable Release
                                                        </div>
                                                        <div className="w-4 ms-2 h-full">
                                                            <Icon icon="ci:external-link" width="16" height="16"/>
                                                        </div>
                                                    </Link>
                                                </DropdownMenuLabel>
                                                <DropdownMenuLabel
                                                    className={`flex items-center gap-1 text-xs hover:cursor-pointer hover:bg-muted-foreground/15 rounded-sm group duration-150 transition-all`}>
                                                    <Link className={`flex items-center w-full`} href={"#"}>
                                                        <div className="w-7 h-full">
                                                            <Image className={`rotate-180`} src={"vercel.svg"}
                                                                   alt={"logo"} width={16} height={16}/>
                                                        </div>
                                                        <div
                                                            className="w-24 h-full flex items-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-500/10 group-hover:from-indigo-300 group-hover:to-indigo-800 duration-150 transition-all">
                                                            Nightly Release
                                                        </div>
                                                        <div className="w-4 ms-2 h-full">
                                                            <Icon icon="ci:external-link" width="16" height="16"/>
                                                        </div>
                                                    </Link>
                                                </DropdownMenuLabel>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Work In Progress</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip delayDuration={250}>
                                <TooltipTrigger>
                                    <>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button disabled size={"sm"}
                                                        className={`boston font-semibold hover:cursor-pointer flex items-center`}
                                                        variant={"secondary"}>
                                                    <Icon icon="fluent:apps-add-in-28-regular" width="24" height="24"/>
                                                    Applications
                                                    <Icon icon="fluent:chevron-down-48-regular" width="24" height="24"/>
                                                </Button></DropdownMenuTrigger>
                                            <DropdownMenuContent className={`boston flex flex-col gap-2`}>
                                                <DropdownMenuLabel
                                                    className={`flex items-center gap-1 text-xs hover:cursor-pointer hover:bg-muted-foreground/15 rounded-sm duration-150 transition-all`}>
                                                    <Link className={`flex items-center w-full`} href={"#"}>
                                                        <div className="w-7 h-full">
                                                            <Icon icon="fluent:app-store-24-regular" width="24"
                                                                  height="24"/>
                                                        </div>
                                                        <div className="w-21 h-full flex items-center">
                                                            iOS 17+
                                                        </div>
                                                        <div className="w-4 ms-2 h-full">
                                                            <Icon icon="ci:external-link" width="16" height="16"/>
                                                        </div>
                                                    </Link>
                                                </DropdownMenuLabel>
                                                <DropdownMenuLabel
                                                    className={`flex items-center gap-1 text-xs hover:cursor-pointer hover:bg-muted-foreground/15 rounded-sm duration-150 transition-all`}>
                                                    <Link className={`flex items-center w-full`} href={"#"}>
                                                        <div className="w-7 h-full">
                                                            <Icon icon="mdi:google-play" width="24" height="24"/>
                                                        </div>
                                                        <div className="w-21 h-full flex items-center">
                                                            Android 10+
                                                        </div>
                                                        <div className="w-4 ms-2 h-full">
                                                            <Icon icon="ci:external-link" width="16" height="16"/>
                                                        </div>
                                                    </Link>
                                                </DropdownMenuLabel>
                                                <DropdownMenuLabel
                                                    className={`flex items-center gap-1 text-xs hover:cursor-pointer hover:bg-muted-foreground/15 rounded-sm duration-150 transition-all`}>
                                                    <Link className={`flex items-center w-full`} href={"#"}>
                                                        <div className="w-7 h-full">
                                                            <Icon icon="mingcute:windows-fill" width="24"
                                                                  height="24"/>
                                                        </div>
                                                        <div className="w-21 h-full flex items-center">
                                                            Windows 10+
                                                        </div>
                                                        <div className="w-4 ms-2 h-full">
                                                            <Icon icon="ci:external-link" width="16" height="16"/>
                                                        </div>
                                                    </Link>
                                                </DropdownMenuLabel>
                                                <DropdownMenuLabel
                                                    className={`flex items-center gap-1 text-xs hover:cursor-pointer hover:bg-muted-foreground/15 rounded-sm duration-150 transition-all`}>
                                                    <Link className={`flex items-center w-full`} href={"#"}>
                                                        <div className="w-7 h-full">
                                                            <Icon icon="simple-icons:macos" width="24" height="24"/>
                                                        </div>
                                                        <div className="w-21 h-full flex items-center">
                                                            macOS 13+
                                                        </div>
                                                        <div className="w-4 ms-2 h-full">
                                                            <Icon icon="ci:external-link" width="16" height="16"/>
                                                        </div>
                                                    </Link>
                                                </DropdownMenuLabel>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Work In Progress</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
        </>
    )
}