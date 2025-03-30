'use client'
import {Input} from "@/components/ui/input";
import {Icon} from "@iconify/react";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {prisma} from "@/app/lib/prisma";

type AuthErrors = {
    email: {
        empty: boolean;
        exists: boolean;
        invalid: boolean;
    };
    password: {
        empty: boolean;
        minLength: boolean;
        maxLength: boolean;
    };
};


export default function AuthForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailEmpty, setEmailEmpty] = useState<boolean>(false);
    const [emailExists, setEmailExists] = useState<boolean>(false);
    const [emailInvalid, setEmailInvalid] = useState<boolean>(false);

    const [passwordEmpty, setPasswordEmpty] = useState<boolean>(false);
    const [passwordMinLength, setPasswordMinLength] = useState<boolean>(false);
    const [passwordMaxLength, setPasswordMaxLength] = useState<boolean>(false);



    const handleEmail = (value) => {
        setEmail(value.trim())

        setEmailEmpty(false)
        setEmailInvalid(false)

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(value.trim() == "") setEmailEmpty(true)
        if (!emailRegex.test(value)) {
            setEmailInvalid(true);
        }
    }
    const handlePassword = (value) => {
        setPassword(value);

        setPasswordEmpty(false)
        setPasswordMinLength(false)
        setPasswordMaxLength(false)

        if(value.trim() == "") setPasswordEmpty(true)
        if(value.trim().length < 6) setPasswordMinLength(true)
        if(value.trim().length > 21) setPasswordMaxLength(true)
    }

    const handleAuth = async () => {
        const body = {
            email: email.trim()
        }
        const res = await fetch('/api/auth/find', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json();
        const usersExists = data.status === 201;

    }

    return (
        <>
            <div className={`flex flex-col space-y-2 w-full items-center`}>
                <h2 className={`text-2xl md:text-xl font-bold text-center`}>Sign in to Fluent</h2>
                <p className={`text-sm md:text-xs text-muted-foreground text-center`}>Sign in or create an account to
                    continue</p>
                <div className="flex flex-col space-y-1 w-2/3">
                    <label className={`text-md md:text-sm text-muted-foreground`}
                           htmlFor="email">Email</label>
                    <Input id="email" type="email" onChange={(e) => {
                        handleEmail(e.target.value)
                    }} />
                    <div className="errors flex flex-col space-y-1 mt-2">
                        <AnimatePresence>
                        { emailEmpty &&
                            <motion.span
                                initial={{
                                    opacity: 0,
                                    x: -30,
                                    scale: 0.8
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    x: -30,
                                    scale: 0.8
                                }}
                                transition={{type: 'ease-in', duration: 0.1}}
                                className={`text-xs text-red-400 flex gap-1 items-center`}>
                                <Icon icon="fluent:error-circle-48-regular" width="16" height="16"/>
                                Email Cannot Be Empty
                            </motion.span>
                        }
                        </AnimatePresence>
                        <AnimatePresence>
                        { emailExists &&
                            <motion.span
                                initial={{
                                    opacity: 0,
                                    x: -30,
                                    scale: 0.8
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    x: -30,
                                    scale: 0.8
                                }}
                                transition={{type: 'ease-in', duration: 0.1}} className={`text-xs text-red-400 flex gap-1 items-center`}>
                                <Icon icon="fluent:error-circle-48-regular" width="16" height="16"/>
                                Email Already Exists
                            </motion.span>
                        }
                        </AnimatePresence>
                        <AnimatePresence>
                        { emailInvalid &&
                            <motion.span
                                initial={{
                                    opacity: 0,
                                    x: -30,
                                    scale: 0.8
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    x: -30,
                                    scale: 0.8
                                }}
                                transition={{type: 'ease-in', duration: 0.1}} className={`text-xs text-red-400 flex gap-1 items-center`}>
                                <Icon icon="fluent:error-circle-48-regular" width="16" height="16"/>
                                Check Email
                            </motion.span>
                        }
                        </AnimatePresence>
                    </div>
                </div>
                <div className="flex flex-col space-y-1 w-2/3">
                    <label className={`text-md md:text-sm text-muted-foreground`}
                           htmlFor="password">Password</label>
                    <Input id="password" type="password" onChange={(e) => handlePassword(e.target.value)} value={password} />
                    <div className="errors flex flex-col space-y-1 mt-2">
                        <AnimatePresence>
                            { passwordMinLength &&
                                <motion.span
                                        initial={{
                                        opacity: 0,
                                        x: -30,
                                        scale: 0.8
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        x: -30,
                                        scale: 0.8
                                    }}
                                    transition={{type: 'ease-in', duration: 0.1}}
                                    className={`text-xs text-red-400 flex gap-1 items-center`}>
                                    <Icon icon="fluent:error-circle-48-regular" width="16" height="16"/>
                                    Password must be at least 6 characters.
                                </motion.span>
                            }
                        </AnimatePresence>
                        <AnimatePresence>
                            { passwordMaxLength &&
                                <motion.span
                                        initial={{
                                        opacity: 0,
                                        x: -30,
                                        scale: 0.8
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        x: -30,
                                        scale: 0.8
                                    }}
                                    transition={{type: 'ease-in', duration: 0.1}}
                                    className={`text-xs text-red-400 flex gap-1 items-center`}>
                                    <Icon icon="fluent:error-circle-48-regular" width="16" height="16"/>
                                    Password must not exceed 21 characters.
                                </motion.span>
                            }
                        </AnimatePresence>
                        <AnimatePresence>
                            { passwordEmpty &&
                                <motion.span
                                        initial={{
                                        opacity: 0,
                                        x: -30,
                                        scale: 0.8
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        x: -30,
                                        scale: 0.8
                                    }}
                                    transition={{type: 'ease-in', duration: 0.1}}
                                    className={`text-xs text-red-400 flex gap-1 items-center`}>
                                    <Icon icon="fluent:error-circle-48-regular" width="16" height="16"/>
                                    Password cannot be empty
                                </motion.span>
                            }
                        </AnimatePresence>
                    </div>
                </div>
                <Button onClick={() => handleAuth()} variant={"secondary"} className={`font-medium hover:cursor-pointer`}
                        size={'default'}>
                    <Icon icon="fluent:mail-28-regular" width="21" height="21"/>
                    Continue With Email
                </Button>

            </div>
        </>
    )
}