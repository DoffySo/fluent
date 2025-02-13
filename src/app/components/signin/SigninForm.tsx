"use client"
import {useRef, useState} from "react";
import Link from "next/link";
import {generateRSAKeys} from "@/app/lib/crypto";
import {Icon} from "@iconify/react";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {redirect} from "next/navigation";
import {createSession} from "@/app/lib/session";

function FormItem({children}) {
    return (
        <>
            <div className="form-item flex w-full justify-center items-start my-1 flex-col">
                {children}
            </div>
        </>
    )
}

interface FormErrorType {
    text: string
}
function FormError({text} : FormErrorType) {
    return (
        <>
            <span className={"my-2 text-xs text-red-400 font-medium flex gap-1 items-center"}><Icon
                icon="fluent:error-circle-24-regular" width="16" height="16"/> {text}</span>
        </>
    )
}

export function SigninForm() {
    const [emailValue, setEmailValue] = useState<string>("");
    const [passwordValue, setPasswordValue] = useState<string>("");

    const [passwordEmpty, setPasswordEmpty] = useState<boolean>(false);
    const [emailValid, setEmailValid] = useState<boolean>(true);
    const [passwordValid, setPasswordValid] = useState<boolean>(true);
    const [emailEmpty, setEmailEmpty] = useState<boolean>(false);
    const [emailRegistered, setEmailRegistered] = useState<boolean>(true);
    const [loggining, setLoggining] = useState<boolean>(false);
    const [showSuccessful, setShowSuccessful] = useState<boolean>(false);

    const validateEmail = (email: string) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };


    async function handleRegister() {
        setLoggining(true)
        setEmailRegistered(true)
        setPasswordValid(true)

        if(passwordValue.trim() === "") setPasswordEmpty(true)
        else setPasswordEmpty(false)

        if(emailValue.trim() === "") setEmailEmpty(true)
        else setEmailEmpty(false)

        if(!validateEmail(emailValue)) setEmailValid(false)
        else setEmailValid(true)

        if(passwordEmpty || emailEmpty || !emailValid || !emailRegistered) {
            setLoggining(false)
            return;
        } else {
                const body = {
                    email: emailValue.trim(),
                    password: passwordValue.trim()
                }
                const res = await fetch('/api/auth/signin', {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await res.json();
                console.log(data);
                setLoggining(false)
                if(data.userExists == false) {
                    setEmailRegistered(false)
                    return
                }
                if(data.verified == false) {
                    setPasswordValid(false)
                    return
                } else {
                    if(data.status === 201) {
                        setShowSuccessful(true)

                        await createSession(data.user_id)
                        setTimeout (() => {
                            redirect('/chat')
                            setShowSuccessful(false)
                        }, 5000)
                    }
                }
        }


    }

    return (
        <>
            <div className="form w-fit h-full flex">
                <div className="form-container w-full h-full flex flex-col gap-2">
                    <FormItem>
                        <div className="flex w-full justify-center">
                            <h1 className={"text-3xl sm:text-5xl lg:text-6xl font-black"}>Sign In</h1>
                        </div>
                    </FormItem>
                    <FormItem>
                        <div className="flex w-full justify-center text-center">
                            <span className={"text-sm md:text-md text-gray-500"}>Sign In into your account using email and password</span>
                        </div>
                    </FormItem>
                    <FormItem>
                        {/*<label htmlFor="email" className={"font-medium text-sm"}>Email</label>*/}
                        <Label htmlFor={"email"} className={`${emailEmpty || !emailValid || !emailRegistered ? "text-destructive" : "text-foreground"}e my-1`}>Email</Label>
                        <input
                            className={`border border-gray-300 h-8 rounded-md w-full outline-none px-2 transition-all duration-100 ${emailEmpty || !emailRegistered ? 'border-red-400' : ''}`}
                            onChange={(e) => setEmailValue(e.target.value)}
                            type="email" id={"email"} name={"email"} placeholder={"john.doe@email.com"}/>
                        {emailEmpty &&
                            <FormError text={"Email is required"} />
                        }
                        {!emailValid &&
                            <FormError text={"Enter a valid email"} />
                        }
                        {!emailRegistered &&
                            <FormError text={"An account with this e-mail address does not exist"} />
                        }
                    </FormItem>
                    <FormItem>
                        {/*<label htmlFor="password" className={"font-medium text-sm"}>Password</label>*/}
                        <Label htmlFor={"password"} className={`${passwordEmpty || !passwordValid ? "text-destructive" : "text-foreground"} my-1`}>Password</Label>
                        <input
                            className={`border border-gray-300 h-8 rounded-md w-full outline-none px-2 transition-all duration-100 ${passwordEmpty || !passwordValid ? 'border-red-400' : ''}`}
                            type="password" id={"password"} name={"password"}
                            onChange={(e) => setPasswordValue(e.target.value)}
                            placeholder={"ExtraStrongPassword1234567890"}/>
                        {passwordEmpty &&
                            <FormError text={"Password is required"}/>
                        }
                        {!passwordValid &&
                            <FormError text={"Incorrect password"}/>
                        }
                    </FormItem>
                    <hr className={"bg-muted-foreground text-muted-foreground"}/>
                    <FormItem>
                        <Button disabled={loggining} onClick={() => handleRegister()} size={"lg"} className={"font-bold text-lg px-6 py-2 hover:cursor-pointer mx-auto"}>
                            {loggining && "Please wait..."}
                            {!loggining && "Sign In"}
                        </Button>
                        {showSuccessful &&
                            <Label className={"text-green-600 text-md font-normal my-2 mx-auto flex gap-1 items-center"}>
                                <Icon icon="fluent:checkmark-circle-48-regular" width="16" height="16" />
                                Successful signed in. Redirecting in a few seconds...
                            </Label>
                        }
                    </FormItem>
                    <FormItem>
                        <Link className={"text-muted-foreground group flex text-sm gap-1 mx-auto"} href={"/signup"}>Don&#39;t have an account? <span className={"text-blue-500 group-hover:underline"}>Sign up</span></Link>
                    </FormItem>
                </div>
            </div>
        </>
    )
}