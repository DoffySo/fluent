import Header from "@/app/components/header/Header";
import Hero from "@/app/components/Hero";
import {Icon} from "@iconify/react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Footer from "@/app/components/footer/Footer";
import ApplicationsSection from "@/app/components/index/applications";
import FeaturesSection from "@/app/components/index/features";
import SourceSection from "@/app/components/index/source";

export default function Index() {

  return (
      <div className="wrapper flex flex-col items-center w-full h-screen">
          <Header />
          <div className="content w-full flex justify-center">
              <div className="content-container w-full flex flex-col justify-center">
                  <div className="main w-full flex mt-20">
                      <div className="main-container w-full flex flex-col items-center justify-center">
                          <Hero/>
                      </div>
                  </div>
                  <FeaturesSection />
                  <ApplicationsSection />
                  <SourceSection />
              </div>
          </div>
          <Footer/>
      </div>
  );
}
