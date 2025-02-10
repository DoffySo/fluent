"use client"
import {useRef, useState} from "react";
import Link from "next/link";
import {generateRSAKeys} from "@/app/lib/crypto";
import {Icon} from "@iconify/react";

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
    const [emailValue, setemailValue] = useState<string>("");
    const [passwordValue, setPasswordValue] = useState<string>("");
    const [repeatpasswordValue, setRepeatPasswordValue] = useState<string>("");
    const [checkedValue, setCheckedValue] = useState<boolean>(false);

    const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);
    const [passwordEmpty, setPasswordEmpty] = useState<boolean>(false);
    const [emailValid, setEmailValid] = useState<boolean>(true);
    const [emailEmpty, setEmailEmpty] = useState<boolean>(false);
    const [emailTaken, setEmailTaken] = useState<boolean>(false);
    const [errorChecked, setErrorChecked] = useState<boolean>(false);

    const validateEmail = (email: string) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };


    async function handleRegister() {
        setPasswordEmpty(false)
        setPasswordMismatch(false)
        setErrorChecked(false)
        setEmailEmpty(false)
        setEmailTaken(false)
        setEmailValid(true)

        if(passwordValue.trim() === "") setPasswordEmpty(true)
        if(emailValue.trim() === "") setEmailEmpty(true)
        if (passwordValue !== repeatpasswordValue) setPasswordMismatch(true)
        if(!checkedValue) setErrorChecked(true)
        if(!validateEmail(emailValue)) setEmailValid(true)

        if(passwordMismatch || errorChecked || passwordEmpty || emailEmpty || !emailValid) {
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
                        <label htmlFor="email" className={"font-medium text-sm"}>Email</label>
                        <input
                            className={`border border-gray-300 h-8 rounded-md w-full outline-none px-2 transition-all duration-100 ${emailEmpty || emailTaken ? 'border-red-400' : ''}`}
                            onChange={(e) => setemailValue(e.target.value)}
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
                    <label htmlFor="password" className={"font-medium text-sm"}>Password</label>
                        <input
                            className={`border border-gray-300 h-8 rounded-md w-full outline-none px-2 transition-all duration-100 ${passwordMismatch || passwordEmpty ? 'border-red-400' : ''}`}
                            type="password" id={"password"} name={"password"}
                            onChange={(e) => setPasswordValue(e.target.value)}
                            placeholder={"ExtraStrongPassword1234567890"}/>
                        {passwordEmpty &&
                            <FormError text={"Password is required"} />
                        }
                    </FormItem>
                    <FormItem>
                    <label htmlFor="password_repeat" className={"font-medium text-sm"}>Repeat
                            Password</label>
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
                                <input name="terms" id={"terms"} type="checkbox"
                                       onChange={(e) => setCheckedValue(e.target.checked)}/>
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
                        <button
                            onClick={() => handleRegister()}
                            className="btn text-xl font-bold bg-neutral-950 text-white px-8 py-1 rounded-md mx-auto flex hover:cursor-pointer hover:bg-neutral-800 active:bg-neutral-800">
                            Sign Up
                        </button>
                    </FormItem>
                </div>
            </div>
        </>
    )
}