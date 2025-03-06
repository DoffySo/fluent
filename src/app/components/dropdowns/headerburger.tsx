import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Icon} from "@iconify/react";
import {Button} from "@/components/ui/button";
import {Switch} from "@/components/ui/switch";
import { useTheme } from 'next-themes'
import Link from "next/link";
import {useUserStore} from "@/app/stores/user";
import AuthDialog from "@/app/components/dialogs/auth";

interface ILinks {
    id: number
    text: string
    href: string
}
interface HeaderBurgerProps {
    links: ILinks[]
}

export default function HeaderBurger({links}) {
    const user = useUserStore((state) => state.user);
    const { theme, setTheme } = useTheme()

    function handleTheme() {
        if (theme === "dark") {
            setTheme("light")
        } else {
            setTheme("dark")
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size={"sm"} className={"hover:cursor-pointer flex md:hidden"}>
                        <Icon icon="fluent:line-horizontal-3-48-filled" width="21" height="21"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {user.token && (
                        <>
                    <DropdownMenuLabel>
                        <Link href={'/chat'} className={`text-muted-foreground flex items-center hover:text-accent-foreground duration-100`}>
                            Proceed to chats
                        </Link>
                    </DropdownMenuLabel>
                    <DropdownMenuLabel>
                        <Link href={'/logout'} className={`text-muted-foreground flex items-center hover:text-accent-foreground duration-100`}>
                            Log Out
                        </Link>
                    </DropdownMenuLabel>
                        </>
                        )
                    }
                    {!user.token && (
                        <>
                            <DropdownMenuLabel>
                                <AuthDialog isMobile={true} signIn={true} />
                            </DropdownMenuLabel>
                        </>
                    )
                    }
                    <DropdownMenuSeparator />
                    {
                        links.map(link =>
                            <DropdownMenuLabel key={link.id} className="flex items-center">
                                <Link className="link text-muted-foreground flex items-center hover:text-accent-foreground duration-100" key={link.id} href={link.href}>
                                    {link.text}
                                </Link>
                            </DropdownMenuLabel>
                        )
                    }
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>
                        <div className={`flex items-center w-full justify-between`}>
                            <label htmlFor={"theme-switch"}>
                                <Icon icon="fluent:weather-sunny-48-regular" width="21" height="21" />
                            </label>
                            <Switch onCheckedChange={() => handleTheme()} checked={(theme == 'dark')} id={"theme-switch"} />
                            <label htmlFor={"theme-switch"}>
                                <Icon icon="fluent:weather-moon-48-regular" width="21" height="21" />
                            </label>
                        </div>
                    </DropdownMenuLabel>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}