import Link from "next/link";

import gsap from "gsap";
import {Icon} from "@iconify/react";
// import {useGSAP} from "@gsap/react";
// import {useRef} from "react";

export default function Header() {

    const links = [
        {
            id: 1,
            text: "FAQ",
            href: "/faq",
        },
        {
            id: 2,
            text: "Applications",
            href: "/apps",
        },
        {
            id: 3,
            text: "API",
            href: "/docs",
        }
    ]


    return (
        <header className={"header w-full flex justify-center"}>
            <div className="header-container w-full max-w-[1200px] mx-auto h-20 flex items-center justify-between">
                <div className="left links flex gap-4 h-16">
                    <div className="logo flex items-center w-24">
                        <Link className="link text-neutral-900 flex items-center my-auto font-extrabold text-2xl" href={"/"}>Fluent</Link>
                    </div>
                    <ul className="links hidden md:flex items-center gap-3 text-sm text-gray-500">
                        {
                            links.map(link =>
                            <li key={link.id} className="flex items-center">
                                <Link className="link text-neutral-500 flex items-center hover:text-gray-700 duration-100" key={link.id} href={link.href}>
                                    {link.text}
                                </Link>
                            </li>
                            )
                        }
                    </ul>
                </div>
                <div className="right auth flex gap-4">
                    <Link href={"signin"}
                          className="btn signin hidden md:flex border font-semibold tracking-wide text-sm border-neutral-300 items-center justify-center w-18 h-8 rounded-md hover:bg-slate-200/60">Sign
                        In</Link>
                    <Link href={"signup"}
                          className="btn signup font-semibold tracking-wide text-sm hidden md:flex border border-neutral-950 bg-neutral-950 text-white w-18 h-8 items-center justify-center rounded-md">Sign
                        Up</Link>
                    <button className="btn flex md:hidden bg-neutral-950 text-white w-8 h-8 rounded-md text-center flex items-center justify-center mx-2">
                        <Icon icon="fluent:line-horizontal-3-24-filled" width="21" height="21"/>
                    </button>
                </div>
            </div>
        </header>
    );
}
