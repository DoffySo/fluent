'use client'
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Icon} from "@iconify/react";
import SheetAccounts from "@/app/components/sidebar/accounts/SheetAccounts";
import {useTheme} from "next-themes";
import {DialogTitle} from "@radix-ui/react-dialog";
import {useEffect, useState} from "react";
import {getSession} from "@/app/lib/session";

export default function SidebarSheet() {
    const [user, setUser] = useState<any>(null);
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
        try {
            const res = await fetch(`/api/user/${1}`);
            const data = await res.json();

            if (data.user) {
                setUser(data.user);

                const { first_name, last_name, username, email, phone_number } = data.user;
                setUsername(first_name ? `${first_name} ${last_name || ""}`.trim() : username || email);
                if (phone_number) setPhone(phone_number);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }

    async function getCurrentSession() {
        const session = await getSession()
        console.log(JSON.stringify(session))
    }


    useEffect(() => {
        getCurrentSession()
        // if (!user_id) return;

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
                    <DialogTitle className={"hidden"}>Аккаунты</DialogTitle> {/* Скрытый заголовок для доступности */}
                    <div className="relative w-full h-full">
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