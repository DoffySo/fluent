'use client';

import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabase/client";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {generateMnemonic, validateMnemonic} from "@/lib/crypto/bip";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerClose
} from "@/components/ui/drawer";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import {useMediaQuery} from "usehooks-ts";
import {CircleAlert, Copy} from "lucide-react";
import {useUserStore} from "@/stores/user";
import {
    initSodium,
    generateKeyPairFromPassphrase,
    UintToBase64,
    encryptMessage,
    decryptMessage
} from "@/lib/crypto/encrypt";
import {loadKey, saveKey} from "@/lib/idb";

export function PassphraseEdit() {
    const [mnemonic, setMnemonic] = useState<string>("");
    const [dbMnemonic, setDbMnemonic] = useState<string | null>(null);
    const [loading, setLoading] = useState(true)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width: 768px)");
    const user = useUserStore(state => state.user)

    const handleGenerateMnemonic = () => setMnemonic(generateMnemonic());
    const handleClearMnemonic = () => setMnemonic("");
    const handleCopyMnemonic = () => {
        navigator.clipboard.writeText(mnemonic);
        alert("Copied!");
    };
    const handleGenerateKeyPair = async () => {
        await initSodium()
        const {publicKey, privateKey} = generateKeyPairFromPassphrase(mnemonic);

        // Save our keys into IndexedDB
        await saveKey("public-key", publicKey)
        await saveKey("private-key", privateKey)

        const encryptedPassphrase = encryptMessage(mnemonic, publicKey, privateKey);
        setLoading(true)

        const response = await fetch('/api/me/update/passphrase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phrase: encryptedPassphrase.ciphertext,
                nonce: encryptedPassphrase.nonce
            }),
            credentials: 'include'
        });

        const result = await response.json();
        const responsePublicKey = await fetch('/api/me/update/publickey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                publicKey: UintToBase64(publicKey),
            }),
            credentials: 'include'
        });
        console.log(responsePublicKey);
        const resultPublicKey = await responsePublicKey.json();
        console.log(resultPublicKey);


        if (!response.ok || !responsePublicKey.ok) {
            setLoading(false)
            setIsDrawerOpen(false);
            throw new Error(result.error || 'Update failed');
        }
        setIsDrawerOpen(false);
        setLoading(false)
        handleClearMnemonic()

    }

    useEffect(() => {
        const loadMessages = async () => {
            try {
                setLoading(true)
                const { data, error } = await supabase
                    .from('User')
                    .select(`encryptedPhraseToVerify`)
                    .eq('id', user?.id)

                if (error) throw error

                setDbMnemonic(data[0].encryptedPhraseToVerify);

            } catch (err) {
                console.error('Passphrase load error:', err)
            } finally {
                setLoading(false)
            }
        }

        loadMessages()
    }, [user])

    useEffect(() => {
        const channel = supabase
            .channel(`mnemonic-${user?.id}-realtime`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'User',
                    filter: `id=eq.${user?.id}`,
                },
                async (payload) => {
                    const {encryptedPhraseToVerify} = payload.new
                    setDbMnemonic(encryptedPhraseToVerify)
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [user])

    return (
        <div className="passphrase">
            <div className="passphrase-container flex flex-col items-center w-10/12 md:w-6/12 mx-auto">
                {loading ? (
                    <>
                        Loading
                    </>
                ) : !dbMnemonic ? (
                    <>
                        <h1 className={"text-lg font-bold text-red-400"}>
                            You haven&#39;t set a passphrase
                        </h1>
                    </>
                ) : (
                    <>
                        <h1 className={"text-lg font-bold text-green-400"}>
                            You have set a passphrase
                        </h1>
                    </>
                )}
                <div className="flex flex-col mt-6 w-full md:w-10/12 gap-2">
                    <div className="flex items-center gap-1">
                        <Input
                            onChange={(e) => setMnemonic(e.target.value)}
                            value={mnemonic}
                            placeholder={"Enter a passphrase..."}
                        />
                        {isMobile ? (
                            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                                <DrawerTrigger asChild>
                                    <Button disabled={!mnemonic}>Save</Button>
                                </DrawerTrigger>
                                <DrawerContent>
                                    <div className="min-h-96 py-2 px-1 items-center flex flex-col gap-1">
                                        <h1>Your Mnemonic:</h1>
                                        <span className={"text-sm text-center"}>
                                            {mnemonic}
                                            <Button size={"sm"} className={"px-1 py-0 mx-1 h-fit"} onClick={handleCopyMnemonic}>Copy</Button></span>
                                        {!validateMnemonic(mnemonic) && (
                                            <>
                                                <div className={"w-full justify-center flex"}>
                                                    <span className={"text-center text-xs text-rose-400"}>
                                                        Your mnemonic phrase may be weaken. We recommend to use bip39 generation.
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                        <span className="text-xs text-muted-foreground text-center">
                                            Make sure to save this mnemonic. It’s required to access your account.
                                        </span>
                                        <div className="flex flex-col mt-4 gap-2">
                                            <span>Are you sure to save this?</span>
                                            <Button onClick={handleGenerateKeyPair}>Save</Button>
                                            <DrawerClose asChild>
                                                <Button variant={"ghost"}>No, I&#39;m not totally sure</Button>
                                            </DrawerClose>
                                        </div>
                                        {
                                            dbMnemonic && (
                                                <>
                                                <span
                                                    className={"flex text-sm items-center justify-center gap-2 text-red-400 mt-2"}>
                                                    <CircleAlert className={"w-6 h-6"}/>
                                                    <span className={"font-bold"}>If you update your passphrase you will lost all previous data!</span>
                                                </span>
                                                </>
                                            )
                                        }
                                    </div>
                                </DrawerContent>
                            </Drawer>
                        ) : (
                            <Dialog open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                                <DialogTrigger asChild>
                                    <Button disabled={!mnemonic}>Save</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <div className="items-center flex flex-col gap-1">
                                        <h1>Your Mnemonic:</h1>
                                        <span className={"text-md text-center flex items-center"}>
                                            {mnemonic}
                                            <Button onClick={handleCopyMnemonic} variant={"outline"} size={"icon"}
                                                    className={"w-5 h-5 mx-1"}>
                                                <Copy className="max-w-3 max-h-3"/>
                                            </Button>
                                        </span>
                                        {!validateMnemonic(mnemonic) && (
                                            <>
                                                <div className={"w-full justify-center flex"}>
                                                    <span className={"text-center text-xs text-rose-400"}>
                                                        Your mnemonic phrase may be weaken. We recommend to use bip39 generation.
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                        <span className="text-xs text-muted-foreground text-center">
                                            Make sure to save this mnemonic. It’s required to access your account.
                                        </span>
                                        <div className="flex flex-col mt-4 gap-2">
                                            <span>Are you sure to save this?</span>
                                            <Button onClick={handleGenerateKeyPair}>Save</Button>
                                            <DialogClose asChild>
                                                <Button variant={"ghost"}>No, I&#39;m not totally sure</Button>
                                            </DialogClose>
                                        </div>
                                        {
                                            dbMnemonic && (
                                                <>
                                                <span
                                                    className={"flex text-sm items-center justify-center gap-2 text-red-400 mt-2"}>
                                                    <CircleAlert className={"w-6 h-6"}/>
                                                    <span className={"font-bold"}>If you update your passphrase you will lost all previous data!</span>
                                                </span>
                                                </>
                                            )
                                        }
                                    </div>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Button onClick={handleGenerateMnemonic} size={"sm"}>Generate random passphrase</Button>
                        <div className="flex w-full gap-1 justify-between md:justify-center">
                            {mnemonic && <Button onClick={handleCopyMnemonic}>Copy</Button>}
                            {mnemonic && <Button onClick={handleClearMnemonic}>Clear</Button>}
                        </div>
                        <span className={"text-muted-foreground text-xs"}>
                            Generates passphrase using BIP39.
                            <br />
                            <span className={"text-[11px] text-gray-400"}>
                                *JavaScript implementation of Bitcoin BIP39: Mnemonic code for generating deterministic keys
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
