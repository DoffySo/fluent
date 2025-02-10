import Header from "@/app/components/Header";
import Link from "next/link";
import {SignupForm} from "@/app/components/signup/SignupForm";

export default function Signup() {


    return (
        <>
            <div className="wrapper flex flex-col items-center w-full h-screen">
                <Header/>
                <div className="content w-full flex justify-center">
                    <div className="content-container w-full flex flex-col max-w-[1200px] justify-center">
                        <div className="signup w-full h-fit border border-gray-200 p-2 rounded-lg">
                            <div className="signup-container flex items-center justify-center">
                                <SignupForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}