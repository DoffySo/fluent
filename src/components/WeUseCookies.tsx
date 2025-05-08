'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button";
import {X} from 'lucide-react'
import {AnimatePresence, motion} from "motion/react"
import {useIsMounted} from "usehooks-ts";
import {useEffect, useState} from "react";


export default function WeUseCookies() {
    const [cookiesClosed, setCookiesClosed] = useState<string | null>(null);
    const isMounted = useIsMounted()

    const handleCloseCookieBanner = () => {
        localStorage.setItem('cookies-banner', 'true')
        setCookiesClosed('true')
    }

    useEffect(() => {
        if(isMounted()) {
            setCookiesClosed(
                localStorage.getItem('cookies-banner')
            );
        }
    }, [isMounted]);

    return (
        <>
            <AnimatePresence>
                {!cookiesClosed && (
                    <>
                        <motion.div
                            key={"cookie-banner"}
                            initial={{ opacity: 0, scale: 0, y: 100 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0, y: 1000 }}
                            className="flex absolute z-50 bottom-0 left-1/2 -translate-x-1/2 w-full md:w-8/12 lg:w-6/12 p-4">
                            <Card className={'w-full h-content relative'}>
                                <CardHeader className={'items-center'}>
                                    <CardTitle className={'text-lg'}>Yes, we use cookies! 🍪🍪🍪</CardTitle>
                                    <CardDescription className={'text-xs'}>We use cookies to enhance your browsing
                                        experience. They help us understand how you use our site and improve its
                                        performance.</CardDescription>
                                </CardHeader>
                                <Button onClick={handleCloseCookieBanner} className={'absolute right-0 top-0 text-muted-foreground m-1'} variant={'ghost'}
                                        size={'icon'}>
                                    <X/>
                                </Button>
                            </Card>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}