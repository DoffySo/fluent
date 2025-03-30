'use client'
import {Button} from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import {useState} from "react";
import {generateMnemonic, mnemonicToSeed, validateMnemonic} from "@/app/lib/crypto/bip";
import Link from "next/link";

export default function MnemonicComponent() {

    const [customMnemonic, setCustomMnemonic] = useState<boolean>(false)
    const [mnemonic, setMnemonic] = useState<string>("");
    const [mnemonicSeed, setMnemonicSeed] = useState<string>("");
    const [mnemonicValidate, setMnemonicValidate] = useState<boolean>();

    const handleCustomMnemonic = () => {
        setCustomMnemonic(!customMnemonic)
    }

    const handleMnemonic = async () => {
        const mnemonics = generateMnemonic()
        const mnemonicsSeed = await mnemonicToSeed(mnemonics).then(bytes => bytes.toString('hex'));
        const mnemonicsValidate = validateMnemonic(mnemonics);
        setMnemonic(mnemonics);
        setMnemonicSeed(mnemonicsSeed);
        setMnemonicValidate(mnemonicsValidate);
    }

    const handleUpdateMnemonic = async () => {
        const mnemonicsSeed = await mnemonicToSeed(mnemonic).then(bytes => bytes.toString('hex'));
        const mnemonicsValidate = validateMnemonic(mnemonic);
        setMnemonicSeed(mnemonicsSeed);
        setMnemonicValidate(mnemonicsValidate);
    }

    return (
        <>
            <div className={"w-fit space-y-2 flex flex-col border-b border-muted-foreground"}>
                <div className="flex flex-col">
                    <h2 className={`text-xl`}>Mnemonic</h2>
                    <p className={`text-muted-foreground text-sm`}>Mnemonic phrases uses for generating private
                        keys.</p>
                    <p className={`text-muted-foreground text-xs w-90 md:w-96 space-x-1 mt-2`}>
                        <b>Note:</b>
                        We are using bip39 (JavaScript implementation of <Link className={`text-primary hover:underline`} href={"https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"}>Bitcoin BIP39</Link>)
                    </p>
                </div>
                <div className="flex space-x-1">
                    {!customMnemonic && <Button variant={`default`} onClick={() => handleMnemonic()} size={"sm"}>Generate
                        mnemonic</Button>}
                    {customMnemonic &&
                        <Button variant={`default`} onClick={() => handleUpdateMnemonic()} size={"sm"}>Update</Button>}
                    <Button variant={`${customMnemonic ? 'default' : 'outline'}`} onClick={() => handleCustomMnemonic()}
                            size={"sm"}>Custom mnemonic</Button>
                </div>
                <div className={`flex space-x-1`}>
                    <span>Mnemonic:</span>
                    <TextareaAutosize
                        className={`resize-none w-100 outline-none ${customMnemonic ? 'bg-muted-foreground/10 rounded duration-200 transition-all' : ''}`}
                        value={mnemonic} disabled={!customMnemonic} onChange={(e) => {
                        if (customMnemonic) {
                            setMnemonic(e.target.value);
                        }
                    }}/>
                </div>
                <div className={`flex space-x-1`}>
                    <span>Seed:</span>
                    <TextareaAutosize className={`resize-none w-100 outline-none`} value={mnemonicSeed} disabled/>
                </div>
                <div className={`flex space-x-1`}>
                    <span>Validation:</span>
                    <TextareaAutosize className={`resize-none w-100 outline-none`} value={`${mnemonicValidate}`} disabled/>
                </div>
            </div>
        </>
    )
}