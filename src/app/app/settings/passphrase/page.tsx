'use client'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ChevronLeft} from "lucide-react";
import FoldersList from "@/components/app/folders/FoldersList";
import { Icon } from "@iconify/react";
import {PassphraseEdit} from "@/components/app/passphrase/PassphraseEdit";
import {useState} from "react";

export default function AppPassphrase() {
    return (
        <>
            <section className={"app-settings w-full h-screen md:p-1"}>
                <div className="settings-container flex flex-col w-full h-full bg-background md:rounded-lg">
                    <header className={"settings-header w-full grid grid-cols-3 justify-start"}>
                        <div className="settings-header__container w-full h-10 flex justify-start items-center">
                            <Button className={"p-0 m-0 h-fit group hover:no-underline"} variant={"link"}>
                                <Link
                                    className={"flex items-center gap-1 hover:no-underline group-hover:text-gray-400 py-1"}
                                    href={"/app/settings"}>
                                    <ChevronLeft className={"min-w-6 min-h-6"}/> Back
                                </Link>
                            </Button>
                        </div>
                        <div className={"flex items-center text-center justify-center font-bold w-full"}>
                            <span>
                                Passphrase
                            </span>
                        </div>
                        <div className={"flex items-center text-center justify-end w-full"}>
                        </div>
                    </header>
                    <main className={"page-hero px-4"}>
                        <div className="flex flex-col h-64 text-center w-9/12 mx-auto">
                            <div className={"justify-center mx-auto flex w-24 h-24"}>
                                <Icon icon="line-md:security-twotone" className={"w-full h-full"} />
                            </div>
                            <div className={"w-full justify-center flex"}>
                                <span className={"text-muted-foreground text-xs"}>
                                    We don’t store your private keys. Set a passphrase so only you can unlock your encrypted messages.
                                </span>
                            </div>
                        </div>
                    </main>
                    <PassphraseEdit />
                </div>
            </section>
        </>
    )
}