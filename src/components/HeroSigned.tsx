'use client'
import {useIsMounted} from "usehooks-ts";
import AuthDialog from "@/components/AuthDialog";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function HeroSigned() {
    const [isLoaded, setIsLoaded] = useState(false);
    const isMounted = useIsMounted()

    useEffect(() => {
        if(isMounted()) setIsLoaded(true);
    }, [isMounted])

    return (
        <>

            {isMounted() ?
                (<>
                    <div className="flex w-screen h-screen items-center justify-center">
                        <div className="flex flex-col items-center justify-around w-10/12 md:w-9/12 h-96">
                            <div className="flex">
                                <h1 className={'text-5xl sm:text-6xl font-normal text-center'}>Welcome to Fluent</h1>
                            </div>
                            <div className="flex flex-col w-full md:w-2/3">
                                <Button className={"text-lg font-bold w-fit p-0 mx-auto"} size={"lg"}>
                                    <Link className={"w-full flex px-4"} href={"/app"}>Continue in Fluent</Link>
                                </Button>
                                <Button className={'text-md mt-2 md:max-w-96 md:mx-auto'} variant={'link'} size={'lg'}>Log Out</Button>
                            </div>
                        </div>
                    </div>
                </>)
                : (
                    <>
                        <div className="flex w-screen h-screen items-center justify-center">
                            <div className="flex flex-col items-center justify-around w-10/12 h-96">
                                <div className="flex">
                                    <h1 className={'text-6xl font-normal text-center'}>Fluent</h1>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}