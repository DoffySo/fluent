'use client'
import {Moon, Sun} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useTheme} from "next-themes";
import {useMediaQuery} from "usehooks-ts";


export default function SidebarChangeTheme() {
    const {setTheme, theme, systemTheme} = useTheme();
    const isMobile = useMediaQuery("(max-width: 768px)");


    const handleTheme = () => {
        if(theme != "dark" || systemTheme != "dark") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }
    return (
        <>
            {
                !isMobile ? (
                    <>
                        <Button className={"ml-auto"} onClick={() => handleTheme()} size={"icon"} variant={"ghost"}>
                            {theme == "dark" ? (
                                <>
                                    <Sun />
                                </>
                            ) : (
                                <>
                                    <Moon />
                                </>
                            )}
                            <span className="sr-only">Toggle Theme</span>
                        </Button>
                    </>
                ) : (
                    <>
                    </>
                )
            }
        </>
    )
}