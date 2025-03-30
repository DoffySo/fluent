'use client'
import {Button} from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import {useEffect, useState} from "react";
import {initSodium, hashPassword, verifyPassword, saltFromPassword} from "@/app/lib/crypto/encrypt";
import Link from "next/link";

export default function HashingComponent() {

    initSodium()

    const [password, setPassword] = useState<string>("");
    const [hashedPassword, setHashedPassword] = useState<string>("");
    const [passwordSalt, setPasswordSalt] = useState<string>("");
    const [passwordVerify, setPasswordVerify] = useState<boolean>();

    const handleHash = async () => {
        const hash = await hashPassword(password)
        const salt = await saltFromPassword(hash)

        console.log("salt", salt)

        setHashedPassword(hash);
        setPasswordSalt(salt)
    }

    const handleVerifyPassword = async () => {
        const verified = await verifyPassword(password, hashedPassword)
        setPasswordVerify(verified)
    }

    return (
        <>
            <div className={"w-fit space-y-2 flex flex-col border-b border-muted-foreground"}>
                <div className="flex flex-col">
                    <h2 className={`text-xl`}>Hashing</h2>
                    <p className={`text-muted-foreground text-sm`}>
                        Hashing passwords
                    </p>
                    <p className={`text-muted-foreground text-xs w-90 md:w-96 space-x-1 mt-2`}>
                        <b>Note:</b>
                        We are using <Link className={`text-primary hover:underline`}
                                           href={"https://www.npmjs.com/package/bcryptjs"}>bcryptjs</Link>library,
                        and its <code>hash</code> function to hash/verify password.</p>
                </div>
                <div className="flex space-x-1">
                    <Button size={"sm"} onClick={() => handleHash()}>Generate hash</Button>
                    <Button size={"sm"} onClick={() => handleVerifyPassword()}>Verify password</Button>
                </div>
                <div className={`flex flex-col space-x-1`}>
                    <span className={`w-fit`}>Password: <sup className={`text-xs text-red-600 dark:text-red-400 uppercase`}>* DONT USE YOUR REAL PASSWORD</sup></span>
                    <TextareaAutosize
                        className={`resize-none w-full lg:w-100 outline-none bg-muted-foreground/10 p-1`}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}/>
                </div>
                <div className={`flex space-x-1`}>
                    <span>Hash:</span>
                    <TextareaAutosize className={`resize-none w-100 outline-none`} value={hashedPassword} disabled/>
                </div>
                <div className={`flex space-x-1`}>
                    <span>Salt:</span>
                    <TextareaAutosize className={`resize-none w-100 outline-none`} value={passwordSalt} disabled/>
                </div>
                <div className={`flex space-x-1`}>
                    <span>Verify:</span>
                    <TextareaAutosize className={`resize-none w-100 outline-none`} value={`${passwordVerify}`} disabled/>
                </div>
            </div>
        </>
    )
}