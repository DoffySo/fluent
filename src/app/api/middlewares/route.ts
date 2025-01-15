import {NextRequest} from 'next/server';

export function middleware(req: NextRequest) {
    const currentTheme = localStorage.getItem("theme");
    let newTheme: string;
    if (!currentTheme) {
        newTheme = (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) ? "dark" : "light";
    } else {
        newTheme = (currentTheme === 'dark' ? 'light' : 'dark');
    }

    return localStorage.setItem("theme", newTheme);
}