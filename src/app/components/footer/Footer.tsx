import Image from "next/image";
import Link from "next/link";
import {Icon} from "@iconify/react";
import {Separator} from "@/components/ui/separator";

export default function Footer() {
    return (
        <>
            <div className={`footer flex mt-4 w-full h-27 py-2 px-1`}>
                <div className="footer-container w-full flex flex-col gap-2">
                    <div className="flex w-full h-12 justify-between items-center">
                        <div className="left">
                            <Image className={`dark:invert w-21 h-12 md:w-32 md:h-12`} alt={"Fluent"} src={"FluentLogo.svg"} width={96} height={32} />
                        </div>
                        <div className="right links">
                            <Link href={"https://github.com/DoffySo/fluent"}>
                                <Icon className={`w-8 h-8 md:w-12 md:h-12`} icon="mdi:github" />
                            </Link>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex w-full justify-center items-start gap-3 md:gap-2 h-10 boston">
                        <p className={`text-xs md:text-sm text-center gap-1 flex flex-wrap`}>All Rights Reserved. <span>© {new Date().getFullYear()}</span></p>
                        <div className="links flex items-center gap-2 md:gap-1">
                            <Link className={`text-blue-400 text-xs md:text-sm hover:underline underline-offset-2`} href={"#"}>Privacy Policy</Link>
                            <Link className={`text-blue-400 text-xs md:text-sm hover:underline underline-offset-2`} href={"#"}>Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}