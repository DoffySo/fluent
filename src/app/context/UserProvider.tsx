"use client";

import React, { useEffect, useState } from "react";
import { useUserStore } from "@/app/stores/user";
import {User} from "@supabase/auth-js";

export function UserProvider({user, children}: {
    children: React.ReactNode,
    user?: User | undefined
}) {
    const setUser = useUserStore((state) => state.setUser);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        if (user) {
            setUser(user);
        }
        setIsHydrated(true);
    }, [user, setUser]);

    if (!isHydrated) return null;

    return <>{children}</>;
}
