'use client'
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";

export default function Index() {


  return (
      <div className="wrapper flex flex-col items-center w-full h-screen">
          <Header />
          <div className="content w-full flex justify-center">
              <div className="content-container w-full flex flex-col max-w-[1200px] justify-center">
                  <div className="h-8 flex w-full"></div>
                  <div className="main w-full flex">
                      <div className="main-container w-full flex flex-col items-center justify-center border border-accent border-dashed">
                          <div className="h-16 flex w-full"></div>
                          <Hero />
                          <div className="h-16 flex w-full"></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}
