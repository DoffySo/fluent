'use client'
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import {Separator} from "@/components/ui/separator";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {useMediaQuery} from "usehooks-ts";
import {useActionState, useRef, useState} from "react";
import {authUserAction} from "@/app/actions/auth-actions";
import {CircleAlert} from 'lucide-react'

interface IAuthDialogProps {
    buttonText?: string;
    buttonVariant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    buttonSize?:  "default" | "sm" | "lg" | "icon" | null | undefined;
    buttonClassName?: string;
}

const INITIAL_STATE = {
    data: null,
    zodErrors: null,
    message: null
}


export default function AuthDialog({buttonText = "Sign In", buttonVariant = "outline", buttonSize = 'sm', buttonClassName}: IAuthDialogProps) {
    const [avatarUrl, setAvatarUrl] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isWaitingAuth, setWaitingAuth] = useState<boolean>(false);
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [formState, formAction] = useActionState(authUserAction, INITIAL_STATE)

    console.log(formState, "client")

    const handleAuth = () => {
        setWaitingAuth(true);
    }

    return (
        <>
            {isMobile ? (
                <>
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button size={buttonSize} className={buttonClassName} variant={buttonVariant}>{buttonText}</Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <div className="mx-auto w-full max-w-sm">
                                <DrawerHeader className={`items-center flex w-full`}>
                                    <DrawerTitle className={`text-2xl font-bold`}>Sign In</DrawerTitle>
                                    <DrawerDescription className={`text-xs`}>Sign in or create an account to continue</DrawerDescription>
                                </DrawerHeader>
                                <div className={`min-h-48 w-2/3 flex mx-auto`}>
                                    <div className="flex flex-col gap-2 w-full">
                                        <div className="via-oauth flex flex-col gap-1 w-full">
                                            <Button disabled={isWaitingAuth} variant={'outline'}>Continue with GitHub</Button>
                                            <Button disabled={isWaitingAuth} variant={'outline'}>Continue with Google</Button>
                                        </div>
                                        <Separator className={`my-1`} />
                                        <div className="via-email pb-2 flex flex-col gap-3 w-full">
                                            <form action={formAction}>
                                                <div className="email flex flex-col gap-2 py-2">
                                                    <Label>Email</Label>
                                                    <Input name={"email"} disabled={isWaitingAuth} value={email!}
                                                           onChange={e => setEmail(e.target.value)} className={``}/>
                                                    {formState.zodErrors?.email?.map((error, idx) => (
                                                        <span key={idx} className="text-red-400 text-xs py-px mb-1 flex items-center gap-1 whitespace-nowrap">
                                                            <CircleAlert className="min-w-4 w-4 min-h-4 h-4" />
                                                            {error}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="password flex flex-col gap-2 py-2">
                                                    <Label>Password</Label>
                                                    <Input name={"password"} type={"password"} disabled={isWaitingAuth} value={password!}
                                                           onChange={e => setPassword(e.target.value)} className={``}/>

                                                    {formState.zodErrors?.password?.map((error, idx) => (
                                                        <span key={idx} className="text-red-400 text-xs py-px mb-1 flex items-center gap-1 whitespace-nowrap">
                                                            <CircleAlert className="min-w-4 w-4 min-h-4 h-4" />
                                                            {error}
                                                        </span>
                                                    ))}
                                                </div>
                                                <Button disabled={!email || !password || isWaitingAuth}
                                                        className={`my-1 w-full`} type={"submit"}>Sign In</Button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <DrawerFooter>
                                    <Separator className={`my-1`}/>
                                    <p className={`text-xs w-full text-muted-foreground text-center`}>
                                        By signing in, you agree to our <Link
                                        className="text-foreground hover:underline underline-offset-2" href="/tos">Terms
                                        of
                                        Service</Link> and <Link
                                        className="text-black dark:text-white hover:underline underline-offset-2"
                                        href="/privacy">Privacy
                                        Policy</Link>.
                                    </p>
                                    {/*<DrawerClose asChild>*/}
                                    {/*    <Button variant="outline">Cancel</Button>*/}
                                    {/*</DrawerClose>*/}
                                </DrawerFooter>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </>
            ) : (
                <>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size={buttonSize} className={buttonClassName} variant={buttonVariant}>{buttonText}</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader className={`items-center flex w-full`}>
                                <DialogTitle className={`text-2xl font-bold`}>Sign In</DialogTitle>
                                <DialogDescription className={`text-xs`}>Sign in or create an account to continue</DialogDescription>
                            </DialogHeader>
                            <div className={`w-2/3 flex mx-auto`}>
                                <div className="flex flex-col gap-2 w-full">
                                    <div className="via-oauth flex flex-col gap-1 w-full">
                                        <Button disabled={isWaitingAuth} variant={'outline'}>Continue with
                                            GitHub</Button>
                                        <Button disabled={isWaitingAuth} variant={'outline'}>Continue with
                                            Google</Button>
                                    </div>
                                    <Separator className={`my-1`}/>
                                    <div className="via-email pb-2 flex flex-col gap-3 w-full">
                                        <form action={formAction}>
                                            <div className="email flex flex-col gap-2 py-2">
                                                <Label>Email</Label>
                                                <Input name={"email"} disabled={isWaitingAuth} value={email!}
                                                       onChange={e => setEmail(e.target.value)} className={``}/>
                                                {formState.zodErrors?.email?.map((error, idx) => (
                                                    <span key={idx}
                                                          className="text-red-400 text-xs py-px mb-1 flex items-center gap-1 whitespace-nowrap">
                                                            <CircleAlert className="min-w-4 w-4 min-h-4 h-4"/>
                                                        {error}
                                                        </span>
                                                ))}
                                            </div>
                                            <div className="password flex flex-col gap-2 py-2">
                                                <Label>Password</Label>
                                                <Input name={"password"} type={"password"} disabled={isWaitingAuth}
                                                       value={password!}
                                                       onChange={e => setPassword(e.target.value)} className={``}/>

                                                {formState.zodErrors?.password?.map((error, idx) => (
                                                    <span key={idx}
                                                          className="text-red-400 text-xs py-px mb-1 flex items-center gap-1 whitespace-nowrap">
                                                            <CircleAlert className="min-w-4 w-4 min-h-4 h-4"/>
                                                        {error}
                                                        </span>
                                                ))}
                                            </div>
                                            <Button disabled={!email || !password || isWaitingAuth}
                                                    className={`my-1 w-full`} type={"submit"}>Sign In</Button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <div className="flex flex-col w-full">
                                    <Separator className={`mb-2`}/>
                                    <p className={`text-xs w-full text-muted-foreground text-center`}>
                                        By signing in, you agree to our <Link
                                        className="text-foreground hover:underline underline-offset-2" href="/tos">Terms
                                        of
                                        Service</Link> and <Link
                                        className="text-black dark:text-white hover:underline underline-offset-2"
                                        href="/privacy">Privacy
                                        Policy</Link>.
                                    </p>
                                </div>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                </>
            )}
        </>
    );
}
