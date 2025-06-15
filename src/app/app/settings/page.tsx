import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ChevronLeft, ChevronRight, QrCode, SmilePlus, ImagePlus, UserRound, MonitorSmartphone, Bookmark, FolderClosed} from 'lucide-react'
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { getCurrentUser } from '@/lib/auth'

export default async function AppSettings() {
    const user = await getCurrentUser()
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
                            <Button className={"w-full p-0"} size={"sm"}>
                                <Link className={"w-full py-2 px-1"} href={"/app/settings/passphrase"}>Passphrase</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}