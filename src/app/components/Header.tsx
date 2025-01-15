'use client';

import Link from "next/link";

import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {useRef} from "react";

export default function Header() {

    const container = useRef();
    // const {contextSafe} = useGSAP({scope: container});
    //
    useGSAP(() => {

    }, {scope: container});

    return (
        <header ref={container} className={"header w-full"}>
            <div className="header-container border-b border-neutral-900 w-full max-w-[1200px] mx-auto h-20 flex items-center justify-between">
                <div className="left links flex gap-4 h-16">
                    <Link className="link text-neutral-200 flex my-auto font-black text-2xl hover:text-neutral-400 transition-all duration-100" href={""}>Fluent</Link>
                    <Link className="link text-neutral-200 flex my-auto font-bold text-lg hover:text-neutral-400 transition-all duration-100" href={""}>Test</Link>
                    <Link className="link text-neutral-200 flex my-auto font-bold text-lg hover:text-neutral-400 transition-all duration-100" href={""}>Test</Link>
                </div>
                <div className="right auth flex gap-4">
                    <Link href={"signin"} className="btn signin text-neutral-950 hover:text-neutral-200 font-medium text-lg border px-3 py-1 rounded-xl bg-neutral-300 hover:bg-neutral-950 transition-all duration-100">Sign In</Link>
                    <Link href={"signup"} className="btn signup text-neutral-200 font-medium text-lg border px-3 py-1 rounded-xl bg-neutral-950 hover:bg-neutral-800 transition-all duration-100">Sign Up</Link>
                </div>
            </div>
        </header>
    );
}
