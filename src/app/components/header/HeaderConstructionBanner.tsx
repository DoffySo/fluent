import {Icon} from "@iconify/react";
import FeedbackDialog from "@/app/components/dialogs/feedback";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
// import { cookies } from 'next/headers'

export default function HeaderConstructionBanner() {
    const [isClosed, setIsClosed] = useState(() => {
        return localStorage.getItem("constructionbanner") === "true";
    });

    useEffect(() => {
        const handleStorageChange = () => {
            setIsClosed(localStorage.getItem("constructionbanner") === "true");
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const hideBanner = () => {
        localStorage.setItem("constructionbanner", "true");
        setIsClosed(true);
    };

    return (
        <>
            {!isClosed &&
                <>
                    <div className={`header-subheader bg-neutral-200 dark:bg-neutral-900 h-fit w-full`}>
                        <div
                            className={`header-subheader__container flex flex-col md:flex-row items-center h-full justify-center gap-2 text-xs md:text-sm boston pt-1 md:pt-0 md:h-12`}>
                    <span className={`flex gap-1 font-semibold text-xs md:text-md uppercase items-center`}>
                        <Icon icon="fluent:warning-48-regular" width="24" height="24"/>
                        Under construction
                    </span>
                            <span className={`items-center font-medium`}>
                        Give us feedback of the website in
                            <>
                                <FeedbackDialog/>
                            </>
                        .
                    </span>
                            <Button onClick={() => hideBanner()} className={`hover:cursor-pointer items-center`}
                                    variant={"ghost"}>
                                <Icon className={``} icon="fluent:dismiss-48-filled" width="24" height="24"/>
                            </Button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}