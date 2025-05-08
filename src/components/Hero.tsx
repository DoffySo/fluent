'use client'
import {useIsMounted} from "usehooks-ts";
import AuthDialog from "@/components/AuthDialog";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";

export default function Hero() {
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
                                <AuthDialog buttonClassName={'font-bold text-lg py-6 px-6 w-full md:max-w-96 md:mx-auto'} buttonSize={"lg"}
                                            buttonText={"Let's Get Started"} buttonVariant={"default"}/>
                                <Button className={'text-md mt-2 md:max-w-96 md:mx-auto'} variant={'link'} size={'lg'}>Continue in
                                    Russian</Button>
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