import Header from "@/app/components/Header";
import Link from "next/link";


function FormItem({children}) {
    return (
        <>
            <div className="form-item flex w-full justify-center items-start my-1 flex-col">
                {children}
            </div>
        </>
    )
}

export default function Signup() {

    return (
        <>
            <div className="wrapper flex flex-col items-center w-full h-screen">
                <Header/>
                <div className="content w-full flex justify-center">
                    <div className="content-container w-full flex flex-col max-w-[1200px] justify-center">
                        <div className="signup w-full h-fit border border-gray-200 p-2 rounded-lg">
                            <div className="signup-container flex items-center justify-center">
                                <div className="form w-fit h-full flex">
                                    <div className="form-container w-full h-full flex flex-col gap-2">
                                        <FormItem>
                                            <div className="flex w-full justify-center">
                                                <h1 className={"text-3xl sm:text-5xl lg:text-6xl font-black"}>Sign In</h1>
                                            </div>
                                        </FormItem>
                                        <FormItem>
                                            <div className="flex w-full justify-center text-center">
                                                <span className={"text-sm md:text-md text-gray-500"}>Sign-in to your account using username and password</span>
                                            </div>
                                        </FormItem>
                                        <FormItem>
                                            <label htmlFor="username" className={"font-medium text-sm"}>Username</label>
                                            <input
                                                className={"border border-gray-300 h-8 rounded-md w-full outline-none px-2"}
                                                type="text" id={"username"} name={"username"} placeholder={"JohnDoe"}/>
                                        </FormItem>
                                        <FormItem>
                                            <label htmlFor="password" className={"font-medium text-sm"}>Password</label>
                                            <input
                                                className={"border border-gray-300 h-8 rounded-md w-full outline-none px-2"}
                                                type="password" id={"password"} name={"password"}
                                                placeholder={"ExtraStrongPassword1234567890"}/>
                                        </FormItem>
                                        <hr className={"bg-neutral-200 text-neutral-200"}/>
                                        <FormItem>
                                            <button
                                                className="btn text-xl font-bold bg-neutral-950 text-white px-8 py-1 rounded-md mx-auto flex hover:cursor-pointer hover:bg-neutral-800 active:bg-neutral-800">
                                                Sign In
                                            </button>
                                        </FormItem>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}