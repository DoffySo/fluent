'use client'
import {Button} from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import {useState} from "react";
import {initSodium, generateKeyPairFromPassphrase, UintToBase64} from "@/app/lib/crypto/encrypt";

import {generateMnemonic} from "@/app/lib/crypto/bip";
import Link from "next/link";

export default function EncryptionComponent() {
    initSodium()

    const [mnemonic, setMnemonic] = useState<string>("");
    const [publicKey, setPublicKey] = useState<string>("");
    const [privateKey, setPrivateKey] = useState<string>("");

    const handleMnemonic = async () => {
        const mnemonics = generateMnemonic()
        setMnemonic(mnemonics);
    }

    const handleKeypair = async () => {
        const {publicKey, privateKey} = generateKeyPairFromPassphrase(mnemonic);
        setPublicKey(UintToBase64(publicKey))
        setPrivateKey(UintToBase64(privateKey))
    }

    return (
        <>
            <div className={"w-fit space-y-2 flex flex-col border-b border-muted-foreground"}>
                <div className="flex flex-col">
                    <h2 className={`text-xl`}>Encryption</h2>
                    <p className={`text-muted-foreground text-sm w-90 md:w-96`}>
                        Mnemonic phrases used to generate private and public keys.
                    </p>
                    <p className={`text-muted-foreground text-xs w-90 md:w-96 space-x-1 mt-2`}>
                        <b>Note:</b>
                        We are using <Link className={`text-primary hover:underline`} href={"https://www.npmjs.com/package/libsodium-wrappers"}>libsodium</Link>library, and its <code>crypto_box_easy</code> function to encrypt/decrypt message.</p>
                </div>
                <div className="flex space-x-1">
                    <Button size={"sm"} onClick={() => handleMnemonic()}>Generate mnemonic</Button>
                    <Button size={"sm"} onClick={() => handleKeypair()}>Generate keypair</Button>
                </div>
                <div className={`flex space-x-1`}>
                    <span>Mnemonic:</span>
                    <TextareaAutosize
                        className={`resize-none w-full lg:w-100 outline-none`} value={mnemonic} disabled/>
                </div>
                <div className={`flex space-x-1`}>
                    <span>Public Key:</span>
                    <TextareaAutosize className={`resize-none w-100 outline-none`} value={publicKey} disabled/>
                </div>
                <div className={`flex space-x-1`}>
                    <span>Private Key:</span>
                    <TextareaAutosize className={`resize-none w-100 outline-none`} value={privateKey} disabled/>
                </div>
            </div>
        </>
    )
}