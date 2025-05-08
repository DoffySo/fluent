import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ChevronLeft, ChevronRight, QrCode, SmilePlus, ImagePlus, UserRound, MonitorSmartphone, Bookmark, FolderClosed} from 'lucide-react'
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { getCurrentUser } from '@/lib/auth'
import {redirect} from "next/navigation";

export default async function AppSettings() {
    const user = await getCurrentUser()
    const hanldeRedirectTo = (link: string) => {
        redirect(link)
    }
    return (
        <>
            <section className={"app-settings w-full h-screen md:p-1"}>
                <div className="settings-container flex flex-col w-full h-full bg-background md:rounded-lg">
                    <header className={"settings-header w-full flex justify-start"}>
                        <div className="settings-header__container w-full h-10 flex justify-start items-center">
                            <Button className={"p-0 m-0 h-fit group hover:no-underline"} variant={"link"}>
                                <Link className={"flex items-center gap-1 hover:no-underline group-hover:text-gray-400 py-1"} href={"/app"}>
                                    <ChevronLeft className={"min-w-6 min-h-6"} /> Back
                                </Link>
                            </Button>
                        </div>
                    </header>
                    <div className="settings w-full h-full my-1">
                        <div className="settings-items flex flex-col gap-3">
                            <div
                                className="settings-user w-full h-48 flex items-center bg-radial from-blue-300 dark:from-blue-400 from-2% to-blue-600 dark:to-blue-950">
                                <div
                                    className="settings-user__container w-full h-full justify-center items-center flex flex-col gap-3 relative">
                                    <div
                                        className={"absolute w-full h-8 top-0 left-0 p-1 flex items-center justify-between"}>
                                        <Button className={"px-1 h-6 w-6 rounded-full"} variant={"default"}
                                                size={"icon"}>
                                            <QrCode className={"min-w-4 min-h-4"}/>
                                        </Button>
                                        <Button className={"px-2 h-6 text-xs font-semibold rounded-full"}
                                                variant={"default"} size={"sm"}>
                                            Edit
                                        </Button>
                                    </div>
                                    <Avatar className={"w-24 h-24"}>
                                        <AvatarImage></AvatarImage>
                                        <AvatarFallback>
                                            <span className={"text-2xl"}>{user.firstName![0]}</span>
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="user-data flex flex-col text-center gap-1">
                                        <div className="user-data__name text-xl font-medium">
                                            <span>
                                                {user.firstName} <span>🍪</span>
                                            </span>
                                        </div>
                                        <div
                                            className="user-data__username flex items-center gap-2 justify-center items-center text-muted-foreground">
                                            <span className={"text-sm"}>phone</span>
                                            <span className={"text-xs"}>•</span>
                                            <span className={"text-sm"}>username</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="settings-change w-11/12 md:w-4/12 mx-auto flex flex-col gap-1">
                                <Button className={"justify-start md:justify-center"} variant={"secondary"}>Change
                                    Emoji Status
                                <div className="ml-auto"></div>
                                </Button>
                                <Button className={"justify-start md:justify-center"} variant={"secondary"}>Change Profile
                                    Photo
                                <div className="ml-auto"></div>
                                </Button>

                            </div>
                            <div className="settings-me w-11/12 md:w-4/12 mx-auto flex flex-col gap-1">
                                <Button className={"justify-start md:justify-center"} variant={"secondary"}>
                                    My Profile
                                    <ChevronRight className={"ml-auto text-neutral-500"} />
                                </Button>
                            </div>
                            <div className="settings-account w-11/12 md:w-4/12 mx-auto flex flex-col gap-1">
                                <Button className={"justify-start md:justify-center"} variant={"secondary"}>Saved
                                    Messages
                                    <ChevronRight className={"ml-auto text-neutral-500"} />
                                </Button>
                                <Button className={"justify-start md:justify-center"}
                                        variant={"secondary"}>Devices
                                    <ChevronRight className={"ml-auto text-neutral-500"} />
                                </Button>
                                <Link className={"w-full"} href={'/app/settings/folders'}>
                                    <Button className={"justify-start md:justify-center w-full"} variant={"secondary"}>Chat
                                        Folders
                                        <div className="ml-auto flex items-center gap-1 text-neutral-500">
                                            <span>0</span>
                                            <ChevronRight className={"ml-auto"}/>
                                        </div>
                                    </Button>
                                </Link>
                            </div>
                            <div className="settings-app w-11/12 md:w-4/12 mx-auto flex flex-col gap-1">
                                <Button className={"justify-start md:justify-center"} variant={"secondary"}>Notifications
                                    and Sounds
                                    <ChevronRight className={"ml-auto text-neutral-500"} />
                                </Button>
                                <Button className={"justify-start md:justify-center"}
                                        variant={"secondary"}>Privacy and Security
                                    <ChevronRight className={"ml-auto text-neutral-500"} />
                                </Button>
                                <Button className={"justify-start md:justify-center"}
                                        variant={"secondary"}>Language
                                    <div className="ml-auto flex items-center gap-1 text-neutral-500">
                                        <span>English</span>
                                        <ChevronRight className={"ml-auto"} />
                                    </div>
                                </Button>
                            </div>
                            <div className="settings-misc w-11/12 md:w-4/12 mx-auto flex flex-col gap-1">
                                <Button className={"justify-start md:justify-center"} variant={"secondary"}>
                                    Fluent Premium
                                    <ChevronRight className={"ml-auto text-neutral-500"} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}