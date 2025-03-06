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


interface IProps {
    isMobile: boolean
    signIn: boolean | true
}

export default function AuthDialog({isMobile, signIn} : IProps) {
    const [isSignin, setIsSignin] = useState(signIn);

    async function toggleSign() {
        setIsSignin(!isSignin);
    }

    return (
        <>
        <Dialog>
            <DialogTrigger asChild>
                {
                    !isMobile ? (
                        <Button className={"hover:cursor-pointer hidden md:flex"} size={"sm"}>
                            Sign In
                        </Button>
                    ) : (
                        <Button
                            className={`text-muted-foreground flex items-center hover:text-accent-foreground duration-100 p-0 h-4 hover:no-underline hover:cursor-pointer`}
                            variant={"link"}>Sign In</Button>
                    )
                }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <Image className={`dark:invert flex mx-auto`} src={"FluentLogo.svg"} width={128} height={42}/>
                    </DialogTitle>
                </DialogHeader>
                <div className={`flex flex-col items-center boston`}>
                    {
                        isSignin ? (
                            <>
                                <h2 className={`text-2xl md:text-xl font-bold text-center`}>Sign in to Fluent</h2>
                                <p className={`text-sm md:text-xs text-muted-foreground text-center`}>Sign in or create
                                    an account to continue</p>
                                <div className="flex flex-col mt-3 w-2/3 md:w-1/2 h-16 md:h-14">
                                    <label className={`text-md md:text-sm text-muted-foreground`}
                                           htmlFor="email">Email</label>
                                    <input className={`border rounded py-1 px-2 text-sm h-full`} type="email"
                                           id={"email"}/>
                                </div>
                                <div className="flex flex-col mt-2 w-2/3 md:w-1/2 h-16 md:h-14">
                                    <label className={`text-md md:text-sm text-muted-foreground`}
                                           htmlFor="password">Password</label>
                                    <input className={`border rounded py-1 px-2 text-sm h-full`} type="repeatpassword"
                                           id={"password"}/>
                                </div>
                                <div className="flex flex-col mt-4 w-2/3 md:w-1/2 h-10 md:h-8">
                                    <Button className={`w-full p-0 flex h-full font-medium text-md`}>Sign In</Button>
                                </div>

                                <p className={`text-sm md:text-xs text-muted-foreground mt-4 gap-1 flex items-center text-center flex-wrap justify-center`}>
                                    Don't have a Fluent account?
                                    <Button onClick={() => toggleSign()}
                                            className={`p-0 text-sm md:text-xs text-blue-400 hover:cursor-pointer underline-offset-1 h-full`}
                                            variant={`link`}>Sign Up</Button>
                                </p>
                            </>
                        ) : (
                            <>
                                    <h2 className={`text-2xl md:text-xl font-bold text-center`}>Sign up in Fluent</h2>
                                    <p className={`text-sm md:text-xs text-muted-foreground text-center`}>Sign in or
                                        create an account to continue</p>
                                    <div className="flex flex-col mt-3 w-2/3 md:w-1/2 h-16 md:h-14">
                                        <label className={`text-md md:text-sm text-muted-foreground`}
                                               htmlFor="email">Email</label>
                                        <input className={`border rounded py-1 px-2 text-sm h-full`} type="email"
                                               id={"email"}/>
                                    </div>
                                    <div className="flex flex-col mt-2 w-2/3 md:w-1/2 h-16 md:h-14">
                                        <label className={`text-md md:text-sm text-muted-foreground`}
                                               htmlFor="password">Password</label>
                                        <input className={`border rounded py-1 px-2 text-sm h-full`} type="password"
                                               id={"password"}/>
                                    </div>
                                    <div className="flex flex-col mt-2 w-2/3 md:w-1/2 h-16 md:h-14">
                                        <label className={`text-md md:text-sm text-muted-foreground`}
                                               htmlFor="repeatpassword">Repeat password</label>
                                        <input className={`border rounded py-1 px-2 text-sm h-full`}
                                               type="repeatpassword"
                                               id={"repeatpassword"}/>
                                    </div>
                                    <div className="flex flex-col mt-2 w-2/3 md:w-1/2 h-10 md:h-8">
                                        <Button className={`w-full p-0 flex h-full font-medium text-md`}>Sign
                                            Up</Button>
                                    </div>
                                    <p className={`text-sm md:text-xs text-muted-foreground mt-4 gap-1 flex items-center text-center flex-wrap justify-center`}>
                                        Already have a Fluent account?
                                        <Button onClick={() => toggleSign()}
                                                className={`p-0 text-sm md:text-xs text-blue-400 hover:cursor-pointer underline-offset-1 h-full`}
                                                variant={`link`}>Sign In</Button>
                                    </p>
                            </>
                        )
                    }
                                    <Separator className={`mt-4`}/>
                                    <p className={`text-sm md:text-xs text-muted-foreground mt-4 flex items-center text-center flex-wrap justify-center`}>
                                        By signing in, you agree to our <Link
                                        className={`text-blue-400 hover:underline underline-offset-2 text-sm md:text-xs p-0 mx-1`}
                                        href={"#"}>Terms of Service</Link> and <Link
                                        className={`text-blue-400 hover:underline underline-offset-2 text-sm md:text-xs p-0 ms-1`}
                                        href={"#"}>Privacy Policy</Link>.
                                    </p>

                </div>
            </DialogContent>
        </Dialog>
        </>
    )
}