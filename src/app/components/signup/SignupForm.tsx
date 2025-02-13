"use client"
import {useRef, useState} from "react";
import Link from "next/link";
import {generateRSAKeys} from "@/app/lib/crypto";
import {Icon} from "@iconify/react";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {redirect} from "next/navigation";

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

export function SignupForm() {
    const [emailValue, setEmailValue] = useState<string>("");
    const [passwordValue, setPasswordValue] = useState<string>("");
    const [repeatpasswordValue, setRepeatPasswordValue] = useState<string>("");
    const [checkedValue, setCheckedValue] = useState<boolean>(false);

    const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);
    const [passwordEmpty, setPasswordEmpty] = useState<boolean>(false);
    const [emailValid, setEmailValid] = useState<boolean>(true);
    const [emailEmpty, setEmailEmpty] = useState<boolean>(false);
    const [emailTaken, setEmailTaken] = useState<boolean>(false);
    const [errorChecked, setErrorChecked] = useState<boolean>(false);
    const [registering, setRegistering] = useState<boolean>(false);
    const [showSuccessful, setShowSuccessful] = useState<boolean>(false);

    const validateEmail = (email: string) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };


    async function handleRegister() {
        setRegistering(true)
        setEmailTaken(false)

        if(passwordValue.trim() === "") setPasswordEmpty(true)
        else setPasswordEmpty(false)

        if(emailValue.trim() === "") setEmailEmpty(true)
        else setEmailEmpty(false)

        if (passwordValue !== repeatpasswordValue) setPasswordMismatch(true)
        else setPasswordMismatch(false)

        if(!checkedValue) setErrorChecked(true)
        else setErrorChecked(false)

        if(!validateEmail(emailValue)) setEmailValid(false)
        else setEmailValid(true)

        if(passwordMismatch || errorChecked || passwordEmpty || emailEmpty || !emailValid || emailTaken) {
            setRegistering(false)
            return;
        } else {
                const {publicKey, privateKey} = await generateRSAKeys();
                const body = {
                    email: emailValue.trim(),
                    password: passwordValue.trim(),
                    publicKey: publicKey
                }
                const res = await fetch('/api/auth/signup', {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await res.json();
                console.log(data);
                if(data.error === "User already exists") {
                    console.log(data.error == "User already exists");
                    setEmailTaken(true)
                }
                if(data.status === 201) {
                    setShowSuccessful(true)

                    setTimeout (() => {
                        redirect('/chat')
                        setShowSuccessful(false)
                    }, 5000)
                }
                setRegistering(false)
        }


    }

    return (
        <>
            <div className="form w-fit h-full flex">
                <div className="form-container w-full h-full flex flex-col gap-2">
                    <FormItem>
                        <div className="flex w-full justify-center">
                            <h1 className={"text-3xl sm:text-5xl lg:text-6xl font-black"}>Sign Up</h1>
                        </div>
                    </FormItem>
                    <FormItem>
                        <div className="flex w-full justify-center text-center">
                            <span className={"text-sm md:text-md text-gray-500"}>Sign up a new account using email and password</span>
                        </div>
                    </FormItem>
                    <FormItem>
                        {/*<label htmlFor="email" className={"font-medium text-sm"}>Email</label>*/}
                        <Label htmlFor={"email"} className={`${emailEmpty || !emailValid || emailTaken ? "text-destructive" : "text-foreground"}e my-1`}>Email</Label>
                        <input
                            className={`border border-gray-300 h-8 rounded-md w-full outline-none px-2 transition-all duration-100 ${emailEmpty || emailTaken ? 'border-red-400' : ''}`}
                            onChange={(e) => setEmailValue(e.target.value)}
                            type="email" id={"email"} name={"email"} placeholder={"john.doe@email.com"}/>
                        {emailEmpty &&
                            <FormError text={"Email is required"} />
                        }
                        {!emailValid &&
                            <FormError text={"Enter a valid email"} />
                        }
                        {emailTaken &&
                            <FormError text={"Email already taken"} />
                        }
                    </FormItem>
                    <FormItem>
                        {/*<label htmlFor="password" className={"font-medium text-sm"}>Password</label>*/}
                        <Label htmlFor={"password"} className={`${passwordMismatch || passwordEmpty ? "text-destructive" : "text-foreground"} my-1`}>Password</Label>
                        <input
                            className={`border border-gray-300 h-8 rounded-md w-full outline-none px-2 transition-all duration-100 ${passwordMismatch || passwordEmpty ? 'border-red-400' : ''}`}
                            type="password" id={"password"} name={"password"}
                            onChange={(e) => setPasswordValue(e.target.value)}
                            placeholder={"ExtraStrongPassword1234567890"}/>
                        {passwordEmpty &&
                            <FormError text={"Password is required"}/>
                        }
                    </FormItem>
                    <FormItem>
                        {/*<label htmlFor="password_repeat" className={"font-medium text-sm"}>Repeat*/}
                        {/*    Password</label>*/}
                        <Label htmlFor={"password_repeat"} className={`${passwordMismatch ? "text-destructive" : "text-foreground"} my-1 font-normal`}>Repeat Password</Label>
                        <input
                            className={`border border-gray-300 h-8 rounded-md w-full outline-none px-2 transition-all duration-100 ${passwordMismatch ? 'border-red-400' : ''}`}
                            type="password" id={"password_repeat"} name={"password_repeat"}
                            onChange={(e) => setRepeatPasswordValue(e.target.value)}
                            placeholder={"ExtraStrongPassword1234567890"}/>
                        {passwordMismatch &&
                            <FormError text={"Passwords do not match"} />
                        }
                    </FormItem>
                    <hr className={"bg-neutral-200 text-neutral-200"}/>
                    <FormItem>
                    <div className={`items-start gap-1 w-full flex flex-col`}>
                            <div className="flex items-start gap-1">
                                {/*<input name="terms" id={"terms"} type="checkbox"*/}
                                {/*       onChange={(e) => setCheckedValue(e.target.checked)}/>*/}
                                <Checkbox onCheckedChange={(e) => setCheckedValue(e)} id="terms" />
                                <label htmlFor="terms" className={"font-medium text-xs w-full max-w-96"}>I have
                                    read,
                                    understood, and agree to the <Link
                                        className={"text-blue-700 hover:underline"} href={"#"}>terms and
                                        conditions</Link> outlined. By
                                    proceeding, I acknowledge that I am bound by the terms and
                                    conditions of
                                    this agreement.</label>
                            </div>
                            {errorChecked &&
                                <FormError text={"You must check the box to agree to the terms and conditions."} />
                            }
                        </div>
                    </FormItem>
                    <hr className={"bg-neutral-200 text-neutral-200"}/>
                    <FormItem>
                        <Button disabled={registering} onClick={() => handleRegister()} size={"lg"} className={"font-bold text-lg px-6 py-2 hover:cursor-pointer mx-auto"}>
                            {registering && "Please wait..."}
                            {!registering && "Sign Up"}
                        </Button>
                        {showSuccessful &&
                            <Label className={"text-green-600 text-md font-normal my-2 mx-auto flex gap-1 items-center"}>
                                <Icon icon="fluent:checkmark-circle-48-regular" width="16" height="16" />
                                Successful signed up. Redirecting in a few seconds...
                            </Label>
                        }
                    </FormItem>
                    <FormItem>
                        <Link className={"text-muted-foreground group flex text-sm gap-1 mx-auto"} href={"/signin"}>Already have an account? <span className={"text-blue-500 group-hover:underline"}>Sign in</span></Link>
                    </FormItem>
                </div>
            </div>
        </>
    )
}