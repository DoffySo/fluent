"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/app/stores/user";

export function UserProvider({ initialUser, children }: { initialUser: any, children: React.ReactNode }) {
    const setUser = useUserStore((state) => state.setUser);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        if (initialUser) {
            setUser(initialUser);
        }
        setIsHydrated(true);
    }, [initialUser, setUser]);

    if (!isHydrated) return null;

    return <>{children}</>;
}
