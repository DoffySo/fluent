'use client'
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Icon} from "@iconify/react";
import SheetAccounts from "@/app/components/sidebar/accounts/SheetAccounts";
import {useTheme} from "next-themes";
import {DialogTitle} from "@radix-ui/react-dialog";
import {useEffect, useState} from "react";
import {getSession} from "@/app/lib/session";
import {useUserStore} from "@/app/stores/user";

export default function SidebarSheet() {
    const user = useUserStore((state) => state.user);
    const [username, setUsername] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null);
    const { theme, setTheme } = useTheme()
    function handleTheme() {
        if (theme === "dark") {
            setTheme("light")
        } else {
            setTheme("dark")
        }
    }

    async function getUser() {
            const { first_name, last_name, username, email, phone_number } = user;
            setUsername(first_name ? `${first_name} ${last_name || ""}`.trim() : username || email);
            if (phone_number) setPhone(phone_number);
    }

    useEffect(() => {
        getUser();
    }, []);

    // Get initials for AvatarFallback
    const getInitials = (user: any) => {
        const { first_name, last_name, username, email } = user;
        if(!first_name && !last_name && !username && !email) return "null";
        if (first_name) return `${first_name[0]}${last_name ? last_name[0] : ""}`.toUpperCase();
        return (username || email )[0].toUpperCase();
    };

    return(
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button className={"hover:cursor-pointer"} size={"icon"} variant={"link"}>
                        <Icon className={"w-full scale-150"} icon="fluent:line-horizontal-3-48-regular" width="32" height="32" />
                    </Button>
                </SheetTrigger>
                <SheetContent side={"left"}>
                    <DialogTitle className={"hidden"}>Аккаунты</DialogTitle>
                    <div className="z-[9999] relative w-full h-full">
                        <div className="theme flex w-full h-10 items-center justify-end">
                            <Button onClick={() => handleTheme()} className={"hover:cursor-pointer w-fit outline-none"} size={"sm"} variant={"link"}>
                                {theme == "dark" &&
                                    <Icon className={"scale-150"} icon="fluent:weather-sunny-48-regular" width="24" height="24" />
                                }
                                {theme != 'dark' &&
                                    <Icon className={"scale-150"} icon="fluent:weather-moon-48-regular" width="24" height="24" />
                                }
                            </Button>
                        </div>
                        <SheetAccounts />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}