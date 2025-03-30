'use client'
import {Button} from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import {useState} from "react";
import {initSodium, generateKeyPairFromPassphrase, encryptFilePreview, decryptFilePreview, UintToBase64, Base64ToUint} from "@/app/lib/crypto/encrypt";

import {generateMnemonic} from "@/app/lib/crypto/bip";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {decrypt} from "next/dist/server/app-render/encryption-utils";

export default function FileEncryptionComponent() {
    initSodium()

    const [mnemonic, setMnemonic] = useState<string>("");
    const [publicKey, setPublicKey] = useState<string>("");
    const [privateKey, setPrivateKey] = useState<string>("");
    const [file, setFile] = useState<File>();
    const [encryptedFile, setEncryptFile] = useState<File>();
    const [encryptedFileUint, setEncryptedFileUint] = useState<Uint8Array>();
    const [decryptedFileUint, setDecryptedFileUint] = useState<Uint8Array>();

    const handleKeypair = async () => {
        const {publicKey, privateKey} = generateKeyPairFromPassphrase(mnemonic);
        setPublicKey(UintToBase64(publicKey))
        setPrivateKey(UintToBase64(privateKey))
    }

    const handleMnemonic = async () => {
        const mnemonics = generateMnemonic()
        setMnemonic(mnemonics);
    }

    const handleEncryptFile = async () => {
        const encryptedFile = await encryptFilePreview(file!, Base64ToUint(publicKey))
        setEncryptedFileUint(Base64ToUint(encryptedFile))
    }
    const handleDecryptFile = async () => {
        const decryptedFile = await decryptFilePreview(encryptedFile!, Base64ToUint(privateKey), Base64ToUint(publicKey))
        setDecryptedFileUint(Base64ToUint(decryptedFile))
    }


    return (
        <>
            <div className={"w-fit space-y-2 flex flex-col border-b border-muted-foreground"}>
                <div className="flex flex-col">
                    <h2 className={`text-xl`}>File Encryption</h2>
                    <p className={`text-muted-foreground text-sm`}>
                        Encrypt/decrypt file using receiver&#39;s public and private key
                    </p>
                    <p className={`text-muted-foreground text-xs w-90 md:w-96 space-x-1 mt-2`}>
                        <b>Note:</b>
                        We are using <Link className={`text-primary hover:underline`}
                                           href={"https://www.npmjs.com/package/libsodium-wrappers"}>libsodium</Link>library,
                        and its <code>crypto_box_seal</code> to encrypt/decrypt files.</p>
                </div>
                <div className="flex space-x-1">
                    <Button size={"sm"} onClick={() => handleKeypair()}>Generate keypair</Button>
                    <Button size={"sm"} onClick={() => handleEncryptFile()}>Encrypt</Button>
                    <Button size={"sm"} onClick={() => handleDecryptFile()}>Decrypt</Button>
                </div>
                <div className={`flex space-x-1`}>
                    <span>File to encrypt:</span>
                    <Input type={"file"} onChange={(e) => {
                        if (e.target.files) {
                            setFile(e.target.files[0])
                        }
                    }}/>
                </div>
                <div className={`flex space-x-1`}>
                    <span>File to decrypt:</span>
                    <Input type={"file"} onChange={(e) => {
                        if (e.target.files) {
                            setEncryptFile(e.target.files[0])
                        }
                    }}/>
                </div>
                <div className={`flex space-x-1`}>
                    <span>Public Key:</span>
                    <TextareaAutosize className={`resize-none w-100 outline-none`} value={publicKey} disabled/>
                </div>
                <div className={`flex space-x-1`}>
                    <span>Private Key:</span>
                    <TextareaAutosize className={`resize-none w-100 outline-none`} value={privateKey} disabled/>
                </div>
                <div className={`flex space-x-1`}>
                    <span>Encrypted:</span>
                    <TextareaAutosize maxRows={12} className={`resize-none w-100 outline-none`} value={UintToBase64(encryptedFileUint!)} disabled/>
                </div>
                <div className={`flex space-x-1`}>
                    <span>Decrypted:</span>
                    <TextareaAutosize maxRows={12} className={`resize-none w-100 outline-none`} value={UintToBase64(decryptedFileUint!)} disabled/>
                </div>
            </div>
        </>
    )
}