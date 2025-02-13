'use client'
import Link from 'next/link'
import {getSession} from "@/app/lib/session";
import {Icon} from '@iconify/react'
import {Button} from "@/components/ui/button";
import {redirect} from "next/navigation";
import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton";

export default function Hero() {
    const [authorized, setAuthorized] = useState(null);

    async function checkSession() {
        const session = await getSession();
        if(session.user) {
            setAuthorized(true);
        }
    }

    useEffect(() => {
        checkSession()
    }, []);

    return (
            <div className="hero flex flex-col w-full justify-center items-center gap-3 sm:gap-2 md:gap-1 lg:gap-0 border-b border-dashed border-accent">
                <div className="border-y border-accent border-dashed w-full flex flex-col pb-6 py-4">
                    <h1 className="hero__heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center h-16 flex items-center justify-center">
                        Your encrypted messenger in a browser.
                    </h1>
                    <p className="hero__subheading text-center text-muted-foreground text-md sm:text-md lg:text-lg">
                        Fluent is a fast and private web messenger with strong encryption, built for
                        secure
                        communication.
                    </p>
                </div>
                <div className="buttons h-32 flex w-fit border-x border-accent border-dashed">
                    <div
                        className="buttons-container flex flex-col sm:flex-row gap-3 sm:gap-0 mt-6 sm:mt-0 w-full justify-center items-center">
                        {authorized == null && (
                            <>
                                <Skeleton className="w-40 h-10 py-2 rounded-full mx-1"></Skeleton>
                                <Skeleton className="w-40 h-10 py-2 rounded-full mx-1"></Skeleton>
                            </>
                        )}
                        {!authorized && authorized != null && (
                            <>
                                <Button className={"py-2 px-1 rounded-full mx-2"} size={"lg"}>
                                    <Link href={"signup"}
                                          className="btn flex mx-3 py-2 px-5 rounded-full">
                                        Create an Account
                                    </Link>
                                </Button>
                                <Button className={"py-2 px-1 rounded-full mx-2"} size={"lg"} variant={"outline"}>
                                    <Link href={"signin"}
                                          className="btn flex mx-3 py-2 px-5 rounded-full">
                                        Log-In in Account
                                    </Link>
                                </Button>
                            </>
                        )}
                        {authorized && (
                            <>
                                <Button className={"py-2 px-1 rounded-full mx-2"} size={"lg"}>
                                    <Link href={"chat"}
                                          className="btn flex mx-3 py-2 px-5 rounded-full">
                                        Proceed to chats
                                    </Link>
                                </Button>
                            </>
                        )
                        }
                    </div>
                </div>
            </div>
    )
}