import Header from "@/app/components/Header";
import Link from 'next/link'

import {Icon} from '@iconify/react'

export default function Index() {


  return (
      <div className="wrapper flex flex-col items-center w-full h-screen">
          <Header />
          <div className="content w-full flex justify-center">
              <div className="content-container w-full flex flex-col max-w-[1200px] justify-center">
                  <div className="h-8 flex w-full"></div>
                  <div className="main w-full flex border border-gray-200">
                      <div className="main-container w-full flex flex-col items-center justify-center">
                          <div className="h-16 flex w-full"></div>

                          <div className="hero flex flex-col w-full justify-center items-center gap-3 sm:gap-2 md:gap-1 lg:gap-0">
                              <h1 className="hero__heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black text-center h-16 flex items-center justify-center">
                                  Your encrypted messenger in a browser.
                              </h1>
                              <p className="hero__subheading sm:text-md md:text-lg lg:text-xl text-gray-500 font-medium w-full px-1 sm:px-0 sm:w-2/3 lg:w-2/4 text-center h-16 flex items-center justify-center">
                                  Fluent is a fast and private web messenger with strong encryption, built for secure
                                  communication.
                              </p>
                              <div className="buttons h-32 flex w-full">
                                  <div className="buttons-container flex flex-col sm:flex-row gap-3 sm:gap-0 mt-6 sm:mt-0 w-full justify-center items-center">
                                      <Link href={"signup"}
                                            className="btn flex mx-3 py-2 px-5 rounded-full bg-neutral-950 hover:bg-neutral-800 border border-neutral-950 text-neutral-100 font-semibold text-lg">
                                          Create an Account
                                      </Link>
                                      <Link href={"signin"}
                                            className="btn flex border border-gray-300 hover:cursour-pointer hover:bg-slate-200/60 mx-3 py-2 px-5 rounded-full font-semibold text-lg">
                                          Log-In in Account
                                      </Link>
                                  </div>
                              </div>
                          </div>

                          <div className="h-16 flex w-full"></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}
