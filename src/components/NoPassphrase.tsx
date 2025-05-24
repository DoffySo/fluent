'use client'
import {
    ShieldAlert
} from 'lucide-react'
import {useChatStore} from "@/stores/chat";
import {useMediaQuery} from "usehooks-ts";
import Link from "next/link";
import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabase/client";
import {useUserStore} from "@/stores/user";


export function NoPassphrase() {
    const chat = useChatStore(state => state.chat);
    const user = useUserStore(state => state.user);
    const isMobile = useMediaQuery('(max-width: 768px)')
    const isDesktop = useMediaQuery('(min-width: 768px)')
    const [loading, setLoading] = useState<boolean>(true)
    const [dbMemonic, setDbMnemonic] = useState<boolean>(false)

    useEffect(() => {
        const loadMessages = async () => {
            try {
                setLoading(true)
                const { data, error } = await supabase
                    .from('User')
                    .select(`encryptedPhraseToVerify`)
                    .eq('id', user?.id)

                if (error) throw error

                setDbMnemonic(!!data[0].encryptedPhraseToVerify);

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
            .channel(`passphrase-${user?.id}-realtime`)
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
                    setDbMnemonic(!!encryptedPhraseToVerify)
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [user])
    return (
        <>
            {(!chat?.id && !dbMemonic) && !loading && (
                <>
                    <div className="passphrase-banner fixed bottom-1 w-full px-1 py-1 z-40 duration-200 transition-all">
                        <div
                            className={`passphrase-banner__container w-12/12 md:w-4/12 mx-auto flex h-12 px-4 py-1 rounded-md bg-red-700/60 dark:bg-rose-700/40 backdrop-blur-sm items-center justify-center gap-1`}>
                            <span className={"text-white"}>
                                <ShieldAlert className={"min-h-4 min-w-4 w-auto h-auto"}/>
                            </span>
                            <span className={"text-xs lg:text-sm font-bold text-white"}>
                                Missing passphrase. This weakens your security.
                            </span>
                            <Link className={"text-xs lg:text-sm font-normal hover:underline underline-offset-2 text-muted dark:text-muted-foreground hover:text-white duration-100"} href={"/app/settings/passphrase"}>Add Passphrase</Link>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}