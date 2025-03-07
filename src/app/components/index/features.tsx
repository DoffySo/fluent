import Image from "next/image";
import Link from "next/link";
import {Icon} from "@iconify/react";

export default function FeaturesSection() {
    return (
        <>
            <div className="features w-full flex mt-16">
                <div
                    className="features-container w-full flex flex-col items-center justify-center gap-4 justify-center h-full">
                    <h2 className={`conquera text-2xl sm:text-3xl lg:text-5xl font-black text-center`}>Why
                        Fluent?</h2>
                    <p className={`boston text-sm md:text-md text-muted-foreground text-center px-4 md:px-0`}>We
                        provide an
                        open-source
                        platform and are constantly evolving to bring you the best experience.</p>
                    <div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl max-h-5xl mx-auto px-2 py-1 mt-8">

                        {/* Real-Time Sync */}
                        <div className="border rounded-md p-4 flex flex-col items-center gap-2 relative">
                            <div
                                className="background absolute w-full h-full left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 -z-10 bg-radial from-sky-400/24 to-blue-800/14 dark:to-indigo-900/14 blur-xl"></div>
                            <div className="content w-full h-full flex flex-col items-center gap-2">
                                <div className="flex justify-center mb-4">
                                    <Image src="vercel.svg" alt="Icon" height={48} width={48}/>
                                </div>
                                <h3 className="boston text-2xl xl:text-3xl font-black text-primary">Real-Time
                                    Sync</h3>
                                <p className="text-muted-foreground text-sm flex text-center">Instant updates
                                    across
                                    all devices. No delays, no refreshes—just seamless messaging.</p>
                                <Link target={"_blank"} href="https://github.com/DoffySo/fluent"
                                      className="text-blue-400 flex gap-1 items-center hover:gap-3 duration-200">
                                    Read Source
                                    <Icon icon="fluent:arrow-right-48-filled" width="16" height="16"/>
                                </Link>
                            </div>
                        </div>

                        {/*End-to-End Encryption*/}
                        <div className="border rounded-md p-4 flex flex-col items-center gap-2 relative">
                            <div className="content w-full h-full flex flex-col items-center gap-2">
                                <div
                                    className="background absolute w-full h-full left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 -z-10 bg-radial from-sky-400/24 to-blue-800/14 dark:to-indigo-900/14 blur-xl"></div>
                                <div className="flex justify-center mb-4">
                                    <Image src="vercel.svg" alt="Icon" height={48} width={48}/>
                                </div>
                                <h3 className="boston text-2xl xl:text-3xl font-black text-primary">End-to-End
                                    Encryption</h3>
                                <p className="text-muted-foreground text-sm flex text-center">Your messages, your
                                    privacy. We use cutting-edge encryption to keep your conversations secure.</p>
                                <Link target={"_blank"} href="https://github.com/DoffySo/fluent"
                                      className="text-blue-400 flex gap-1 items-center hover:gap-3 duration-200">
                                    Read Source
                                    <Icon icon="fluent:arrow-right-48-filled" width="16" height="16"/>
                                </Link>
                            </div>
                        </div>

                        {/* Global Access */}
                        <div className="border rounded-md p-4 flex flex-col items-center gap-2 relative">
                            <div className="content w-full h-full flex flex-col items-center gap-2">
                                <div
                                    className="background absolute w-full h-full left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 -z-10 bg-radial from-sky-400/24 to-blue-800/14 dark:to-indigo-900/14 blur-xl"></div>
                                <div className="flex justify-center mb-4">
                                    <Image src="vercel.svg" alt="Icon" height={48} width={48}/>
                                </div>
                                <h3 className="boston text-2xl xl:text-3xl font-black text-primary">Global
                                    Access</h3>
                                <p className="text-muted-foreground text-sm flex text-center">Connect with people
                                    worldwide without restrictions. Fast, reliable, and censorship-free.</p>
                                <Link target={"_blank"} href="https://github.com/DoffySo/fluent"
                                      className="text-blue-400 flex gap-1 items-center hover:gap-3 duration-200">
                                    Read Source
                                    <Icon icon="fluent:arrow-right-48-filled" width="16" height="16"/>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}