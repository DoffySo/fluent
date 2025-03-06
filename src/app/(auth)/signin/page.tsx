import Header from "@/app/components/header/Header";
import Link from "next/link";
import {SigninForm} from "@/app/components/signin/SigninForm";


function FormItem({children}) {
    return (
        <>
            <div className="form-item flex w-full justify-center items-start my-1 flex-col">
                {children}
            </div>
        </>
    )
}

export default function Signin() {

    return (
        <>
            <div className="wrapper flex flex-col items-center w-full h-screen">
                <Header/>
                <div className="content w-full flex justify-center">
                    <div className="content-container w-full flex flex-col max-w-[1200px] justify-center">
                        <div className="signin w-full h-fit border border-gray-200 p-2 rounded-lg">
                            <div className="signin-container flex items-center justify-center">
                                <SigninForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}