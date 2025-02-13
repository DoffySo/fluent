'use client'
import Link from "next/link";
import gsap from "gsap";
import {Icon} from "@iconify/react";
import {Button} from "@/components/ui/button";
// import {useGSAP} from "@gsap/react";
// import {useRef} from "react";
import { useTheme } from 'next-themes'
import {useEffect, useState} from "react";
import {getSession} from "@/app/lib/session";
import {Skeleton} from "@/components/ui/skeleton";

export default function Header() {
    const { theme, setTheme } = useTheme()
    const [authorized, setAuthorized] = useState<boolean | null>(null);

    async function checkSession() {
        const session = await getSession();
        if(session.user) {
            setAuthorized(true);
        }
    }

    checkSession()

    const links = [
        {
            id: 1,
            text: "FAQ",
            href: "/faq",
        },
        {
            id: 2,
            text: "Applications",
            href: "/apps",
        },
        {
            id: 3,
            text: "API",
            href: "/docs",
        }
    ]

    function handleTheme() {
        if (theme === "dark") {
            setTheme("light")
        } else {
            setTheme("dark")
        }
    }


    return (
        <header className={"header w-full flex justify-center"}>
            <div className="header-container w-full max-w-[1200px] mx-auto h-20 flex items-center justify-between">
                <div className="left links flex gap-4 h-16">
                    <div className="logo flex items-center w-24">
                        <Link className="link text-foreground flex items-center my-auto font-extrabold text-2xl" href={"/"}>Fluent</Link>
                    </div>
                    <ul className="links hidden md:flex items-center gap-3 text-sm text-gray-500">
                        {
                            links.map(link =>
                            <li key={link.id} className="flex items-center">
                                <Link className="link text-muted-foreground flex items-center hover:text-accent-foreground duration-100" key={link.id} href={link.href}>
                                    {link.text}
                                </Link>
                            </li>
                            )
                        }
                    </ul>
                </div>
                <div className="right auth flex gap-4">
                    <Button onClick={() => handleTheme()} className={"hover:cursor-pointer hidden md:flex"} size={"sm"} variant={"outline"}>
                        {theme == "dark" &&
                            <Icon icon="fluent:weather-sunny-48-regular" width="24" height="24" />
                        }
                        {theme != 'dark' &&
                            <Icon icon="fluent:weather-moon-48-regular" width="24" height="24" />
                        }


                    </Button>
                    <Button size={"sm"} className={"hover:cursor-pointer flex md:hidden"}>
                        <Icon icon="fluent:line-horizontal-3-48-filled" width="21" height="21"/>
                    </Button>
                    {authorized == null && (
                        <>
                            <Skeleton className="w-16 h-8 rounded-sm"></Skeleton>
                            <Skeleton className="w-16 h-8 rounded-sm"></Skeleton>
                        </>
                    )}
                    {!authorized && authorized != null && (
                        <>
                            <Button className={"hover:cursor-pointer hidden md:flex"} size={"sm"} variant={"outline"}>
                                <Link href={"signin"}
                                      className="btn flex">
                                    Sign In
                                </Link>
                            </Button>
                            <Button className={"hover:cursor-pointer hidden md:flex"} size={"sm"}>
                                <Link href={"signup"}
                                      className="btn flex w-full">
                                    Sign Up
                                </Link>
                            </Button>
                        </>
                    )}
                    {authorized && (
                        <>
                            <Button className={"hover:cursor-pointer hidden md:flex"} size={"sm"} variant={"outline"}>
                                <Link href={"logout"}
                                      className="btn flex w-full">
                                    Log Out
                                </Link>
                            </Button>
                            <Button className={"hover:cursor-pointer hidden md:flex"} size={"sm"}>
                                <Link href={"chat"}
                                      className="btn flex w-full">
                                    To chats
                                </Link>
                            </Button>
                        </>
                    )
                    }
                </div>
            </div>
        </header>
    );
}
