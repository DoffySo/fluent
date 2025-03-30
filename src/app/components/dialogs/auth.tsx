"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {useState} from "react";
import {Checkbox} from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator"
import {Icon} from "@iconify/react";
import { toast } from "sonner"
import { Mail } from "lucide-react"
import {createClient} from "@/app/utils/supabase/client";
import { Input } from "@/components/ui/input"
import {z} from 'zod'
import AuthForm from "@/app/components/dialogs/AuthForm";


interface IProps {
    isMobile: boolean | undefined;
    signIn: boolean | true;
    forceShow: boolean | true;
    isSmall: boolean | false;
    text: string | undefined;
    textWeight: string | undefined;
    icon: string | undefined;
    iconWidth: number | 21;
    iconHeight: number | 21;
}

export default function AuthDialog({isMobile, signIn, forceShow, text, textWeight, icon, iconWidth, iconHeight} : IProps) {
    const [isSignin, setIsSignin] = useState(signIn);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const supabase = createClient()
    async function toggleSign() {
        setIsSignin(!isSignin);
    }

    const handleLoginGitHub = () => {
        supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: location.origin + '/auth/callback',
            }
        })
    }

    return (
        <>
        <Dialog>
            <DialogTrigger asChild>
                {
                    !isMobile || forceShow ? (
                            <Button className={`boston hover:cursor-pointer ${textWeight ? textWeight : 'font-normal'} ${!forceShow ? "hidden md:flex" : "flex"}`} size={'sm'}>
                                {
                                    icon &&
                                    <Icon icon={icon} width={`${iconWidth}`} height={`${iconHeight}`} />
                                }
                                {text || "Sign In"}
                            </Button>


                    ) : (
                        <Button
                            className={`boston text-muted-foreground flex items-center hover:text-accent-foreground duration-100 p-0 h-4 hover:no-underline hover:cursor-pointer ${textWeight ? textWeight : 'font-normal'}`}
                            variant={"link"}>
                            {
                                icon &&
                                <Icon icon={icon} width={`${iconWidth}`} height={`${iconHeight}`} />
                            }
                            {text || "Sign In"}
                        </Button>
                    )
                }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <Image alt={"Fluent"} className={`dark:invert flex mx-auto`} src={"FluentLogo.svg"} width={128} height={42}/>
                    </DialogTitle>
                </DialogHeader>
                <div className={`flex flex-col items-center boston`}>
                    <AuthForm />
                    <Separator className={`mt-4`}/>
                    <p className={`text-xs w-full text-muted-foreground text-start mt-2`}>
                        By signing in, you agree to our <Link
                        className="text-foreground hover:underline underline-offset-2" href="/tos">Terms of
                        Service</Link> and <Link
                        className="text-black dark:text-white hover:underline underline-offset-2" href="/privacy">Privacy
                        Policy</Link>.
                    </p>

                </div>
            </DialogContent>
        </Dialog>
        </>
    )
}