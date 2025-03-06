import Header from "@/app/components/header/Header";
import Hero from "@/app/components/Hero";
import Image from 'next/image'
import {Icon} from "@iconify/react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Footer from "@/app/components/footer/Footer";

export default function Index() {

  return (
      <div className="wrapper flex flex-col items-center w-full h-screen">
          <Header />
          <div className="content w-full flex justify-center">
              <div className="content-container w-full flex flex-col justify-center">
                  <div className="h-8 flex w-full"></div>
                  <div className="main w-full flex">
                      <div className="main-container w-full flex flex-col items-center justify-center">
                          <Hero/>
                      </div>
                  </div>
                  <div className="h-16 flex w-full"></div>
                  <div className="features w-full flex">
                      <div
                          className="features-container w-full flex flex-col items-center justify-center gap-4 justify-center h-full">
                          <h2 className={`conquera text-2xl sm:text-3xl lg:text-5xl font-black text-center`}>Why Fluent?</h2>
                          <p className={`boston text-sm md:text-md text-muted-foreground text-center px-4 md:px-0`}>We provide an
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
                  <div className="h-16 flex w-full"></div>
                  <div className="source mt-16">
                      <div className="source-container flex flex-col items-center px-4 sm:px-2 lg:px-0 w-full sm:w-1/2 lg:w-1/3 mx-auto gap-1">
                          <Icon icon="mdi:github" width="96" height="96"/>
                          <h2 className={`boston text-4xl font-bold`}>
                              Source-Available
                          </h2>
                          <p className={`boston text-center text-sm text-muted-foreground`}>
                              Our entire codebase is available on GitHub with a source-available license. Anyone can
                              view and contribute.
                          </p>
                          <Button className={`p-0 hover:cursor-pointer font-medium boston text-md font-semibold mt-4`}>
                              <Link className={`px-4`} href={"https://github.com/DoffySo/fluent"}>Contribute</Link>
                          </Button>
                      </div>
                  </div>
                  <div className="h-8 flex w-full"></div>
              </div>
          </div>
          <Footer />
      </div>
  );
}
