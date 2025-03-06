'use client'
import Link from 'next/link'
import {getSession} from "@/app/lib/session";
import {Icon} from '@iconify/react'
import {Button} from "@/components/ui/button";
import {redirect} from "next/navigation";
import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {useUserStore} from "@/app/stores/user";


export default function Hero() {
    const user = useUserStore((state) => state.user);

    return (
            <div className="hero flex flex-col w-full justify-center items-center gap-3 sm:gap-2 md:gap-1 lg:gap-0">
                <div className="w-full flex flex-col pb-6 py-4 px-2">
                        <div className={`flex`}>
                            <div className={`flex flex-col w-full md:w-1/2 gap-6 text-wrap flex-wrap text-center sm:text-start`}>
                                <div className={`conquera flex flex-col text-2xl sm:text-4xl font-black gap-1 break-words`}>
                                    <span className={``}>
                                        Your Encrypted
                                    </span>
                                    <div>
                                    <span>
                                        Messenger In
                                    </span>
                                    </div>
                                    <div className={``}>
                                        <span>A Browser</span>
                                    </div>
                                </div>
                                <div className={`boston`}>
                                    <span className={`xs:text-md sm:text-xl`}>Fluent is a fast and private web messenger with strong encryption, built for secure communication.</span>
                                </div>
                                <div className={`flex gap-4 sm:gap-2 boston flex-col sm:flex-row`}>
                                    {user.token && (
                                        <>
                                            <Button className={`font-medium text-lg hover:cursor-pointer`}>Proceed to chats</Button>
                                            <Button className={`font-medium text-lg hover:cursor-pointer hover:underline dark:hover:no-underline`} variant={"ghost"}>Log Out</Button>
                                        </>
                                    )}
                                    {!user.token && (
                                        <>
                                    <Button className={`font-medium sm:font-semibold text-lg hover:cursor-pointer mx-auto sm:mx-0 w-2/3 sm:w-1/2`}>Sign In</Button>
                                        </>
                                        )}
                                </div>
                            </div>
                        </div>
                </div>
            </div>
    )
}