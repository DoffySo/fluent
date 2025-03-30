'use client'
import Link from "next/link";
import {Icon} from "@iconify/react";
import {Button} from "@/components/ui/button";
import { useTheme } from 'next-themes'
import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {useUserStore} from "@/app/stores/user";
import Image from 'next/image'
import FeedbackDialog from "@/app/components/dialogs/feedback";
import HeaderBurger from "@/app/components/dropdowns/headerburger";
import HeaderConstructionBanner from "@/app/components/header/HeaderConstructionBanner";
import AuthDialog from "@/app/components/dialogs/auth";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Header() {
    const { theme, setTheme } = useTheme()
    const user = useUserStore((state) => state.user);

    // const [authorized, setAuthorized] = useState<boolean | null>(null);
    //
    // async function checkSession() {
    //     const session = await getSession();
    //     if(session.user) {
    //         setAuthorized(true);
    //     }
    // }

    // checkSession()

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
        },
        {
            id: 4,
            text: "Feedbacks",
            href: "/feedbacks",
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
        <header className={"header w-full flex flex-col justify-center border-b fixed bg-background/60 backdrop-blur-sm md:bg-background md:backdrop-blur-none z-50"}>
            <div className="header-container w-full mx-auto h-18 flex items-center justify-between px-2">
                <div className="left links flex gap-4 h-16">
                    <div className="logo flex items-center w-24">
                        <Link className="link text-foreground flex items-center my-auto font-extrabold text-2xl" href={"/"}>
                            <Image className={"dark:invert"} src="/FluentLogo.svg" alt="logo" width={128} height={42} />
                        </Link>
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
                    <HeaderBurger links={links} />
                    {!user.token && (
                        <AuthDialog isMobile={false} signIn={true} />
                    )}
                    {user.token && (
                        <>
                            <Button className={"hover:cursor-pointer hidden md:flex"} size={"sm"} variant={"outline"}>
                                <Link href={"logout"}
                                      className="btn flex w-full">
                                    Log Out
                                </Link>
                            </Button>
                            <Button className={"hover:cursor-pointer hidden md:flex"} size={"sm"}>
                                <Link href={"../chat"}
                                      className="btn flex w-full">
                                    To chats
                                </Link>
                            </Button>
                        </>
                    )
                    }
                </div>
            </div>
            <HeaderConstructionBanner />
        </header>
    );
}
