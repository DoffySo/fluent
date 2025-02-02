"use client";

import { useEffect, useState } from "react";
import {Icon} from '@iconify/react'

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const [theme, setTheme] = useState<string | null>('system')

    useEffect(() => {
        setMounted(true)

        if(localStorage.getItem("theme"))
        {
            document.documentElement.classList.add(localStorage.getItem("theme") as string);
        }
    }, [])

    if(!mounted) return null

    const toggleTheme = (theme: string) => {
        localStorage.setItem("theme", theme)
        setTheme(theme);
        document.documentElement.classList.remove('light');
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add(theme);
    }


    const handleClick = () => {
        if(theme === 'dark' || theme === 'system') {
            toggleTheme('light');
        } else {
            toggleTheme('dark');
        }
    }

    return (
        <>
            <button onClick={() => handleClick()}
                    className="btn bg-neutral-100 text-black hover:cursor-pointer w-8 h-8 flex justify-center items-center rounded-full">
                <span className="flex">
                    {theme == "dark" && <Icon icon="fluent:weather-sunny-48-regular" width="24" height="24"/>}
                    {theme != "dark" && <Icon icon="fluent:weather-moon-48-regular" width="24" height="24"/>}
                </span>
            </button>
        </>
    )
};