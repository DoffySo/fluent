'use client'
import {generateMnemonic, mnemonicToSeed, validateMnemonic} from "@/app/lib/crypto/bip";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import TextareaAutosize from "react-textarea-autosize";
import {ThemeSwitcher} from "@/app/components/ThemeSwitcher";
import Link from "next/link";
import MnemonicComponent from "@/app/components/encryption/Mnemonic";
import EncryptionComponent from "@/app/components/encryption/Encryption";
import HashingComponent from "@/app/components/encryption/Hashing";
import FileEncryptionComponent from "@/app/components/encryption/FileEncryption";

export default function Encryption() {



    return (
        <>
            <div className="flex flex-col w-screen h-screen px-1 pt-2 pb-6 md:px-6 md:py-24 items-center lg:items-start overflow-x-hidden">
                <div className="flex flex-col space-y-1">
                    <div className="flex space-x-3 items-center">
                        <h1 className={`text-3xl font-bold`}>Encryption tests</h1>
                        <ThemeSwitcher></ThemeSwitcher>
                        <Link className={`hover:underline underline-offset-1`} href={"/"}>Back</Link>
                    </div>
                    <div className="flex">
                        <p className={`text-muted-foreground text-sm`}>Here you can test our encryption system</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-flow-row-dense space-y-1 space-x-1 mt-10">
                    <MnemonicComponent />
                    <EncryptionComponent />
                    <HashingComponent />
                    <FileEncryptionComponent />
                </div>
                <div className="flex flex-col mt-10 w-125 mx-auto">
                    <h1 className={`text-lg font-bold`}>The full source code can be found in our GitHub repository:</h1>
                    <div className="flex flex-wrap space-y-4 space-x-4 mt-4">
                        <Link className={`text-sm hover:underline underline-offset-2`} href={"https://github.com/DoffySo/fluent/blob/main/src/app/(app)/encryption/page.tsx"}>This page</Link>
                        <Link className={`text-sm hover:underline underline-offset-2`} href={"https://github.com/DoffySo/fluent/blob/main/src/app/components/encryption/Mnemonic.tsx"}>Mnemonic Component</Link>
                        <Link className={`text-sm hover:underline underline-offset-2`} href={"https://github.com/DoffySo/fluent/blob/main/src/app/components/encryption/Encryption.tsx"}>Encryption Component</Link>
                        <Link className={`text-sm hover:underline underline-offset-2`} href={"https://github.com/DoffySo/fluent/blob/main/src/app/components/encryption/Hashing.tsx"}>Hashing Component</Link>
                        <Link className={`text-sm hover:underline underline-offset-2`} href={"https://github.com/DoffySo/fluent/blob/main/src/app/components/encryption/FileEncryption.tsx"}>File Encryption Component</Link>
                        <Link className={`text-sm hover:underline underline-offset-2`} href={"https://github.com/DoffySo/fluent/blob/main/src/app/lib/crypto/encrypt.ts"}>encrypt.ts</Link>
                        <Link className={`text-sm hover:underline underline-offset-2`} href={"https://github.com/DoffySo/fluent/blob/main/src/app/lib/crypto/bip.ts"}>bip.ts</Link>
                    </div>
                </div>
            </div>
        </>
    )
}