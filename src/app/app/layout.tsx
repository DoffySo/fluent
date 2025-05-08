'use client';

import Sidebar from "@/components/app/sidebar/Sidebar";
import { useSelectedLayoutSegments } from "next/navigation";
import { useEffect, useState } from "react";
import {UserInitializer} from "@/components/InitializeUser";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const segments = useSelectedLayoutSegments(); // получаем вложенные сегменты
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const update = () => setIsMobile(window.innerWidth < 768);
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const isNestedRoute = segments.length > 0;
    const shouldHideSidebar = isMobile && isNestedRoute;

    return (
        <div className="flex md:gap-1">
            <UserInitializer />
            {!shouldHideSidebar && <Sidebar />}
            <main className="flex flex-1">{children}</main>
        </div>
    );
}
