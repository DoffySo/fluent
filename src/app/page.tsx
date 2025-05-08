import Hero from "@/components/Hero";
import WeUseCookies from "@/components/WeUseCookies";
import { getCurrentUser } from '@/lib/auth'
import {Button} from "@/components/ui/button";
import HeroSigned from "@/components/HeroSigned";

export default async function Home() {
    const user = await getCurrentUser()
    return (
        <>
            {
                !user ? (
                    <>
                        <Hero/>
                    </>
                ) : (
                    <>
                        <HeroSigned/>
                    </>
                )
            }
            <WeUseCookies/>
        </>
    )
}