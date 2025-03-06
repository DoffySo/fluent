"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import {Skeleton} from "@/components/ui/skeleton";

interface AccountTypes {
    current: boolean | null;
    user_id: number | null;
}

export default function SheetAccount({ current, user_id }: AccountTypes) {
    const [user, setUser] = useState<any>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null);

    useEffect(() => {
        if (!user_id) return;

        async function getUser() {
            try {
                const baseUrl =
                    process.env.NODE_ENV === "development"
                        ? process.env.NEXT_DEV_BASE_URL
                        : process.env.NEXT_BASE_URL
                const res = await fetch(`/api/user/${user_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const data = await res.json();

                if (data.user) {
                    setUser(data.user);

                    const { first_name, last_name, username, email, phone_number } = data.user;
                    setUsername(first_name ? `${first_name} ${last_name || ""}`.trim() : username || email);
                    if (phone_number) setPhone(phone_number);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }

        getUser();
    }, [user_id]);

    // Get initials for AvatarFallback
    const getInitials = (user: any) => {
        const { first_name, last_name, username, email } = user;
        if(!first_name && !last_name && !username && !email) return "null";
        if (first_name) return `${first_name[0]}${last_name ? last_name[0] : ""}`.toUpperCase();
        return (username || email )[0].toUpperCase();
    };

    return (
        <>
            {user ? (
                <div className="account flex gap-1 items-center justify-between cursor-default hover:bg-muted/40 px-1 py-2 rounded-sm">
                    <div className="left flex gap-1 items-center">
                        {current && <div className="current h-2 w-1 mx-1 bg-accent-foreground rounded-full"></div>}
                        {!current && <div className={"w-1 h-2 mx-1"}></div>}
                        <Avatar>
                            <AvatarImage src="https://github.com/shaddcn.png" />
                            <AvatarFallback className="border border-muted-foreground">
                                {getInitials(user)}
                            </AvatarFallback>
                        </Avatar>
                        <span>{username || "No username."}</span>
                        <span className="ms-2">
                <Icon className="scale-150" icon="fluent:emoji-hint-48-regular" width="16" height="16" />
            </span>
                    </div>
                    <div className="right flex gap-1 items-center">
                        <div className="badge w-fit h-fit bg-primary rounded-full text-xs text-muted px-2 py-0.5 font-medium">
                            123
                        </div>
                    </div>
                </div>
            ) : (
                // Showing skeleton while user loading
                <div className="account flex gap-1 items-center justify-between cursor-default hover:bg-muted/40 px-1 py-2 rounded-sm">
                    <div className="left flex gap-1 items-center">
                        {current && <div className="current h-2 w-1 mx-1 bg-accent-foreground rounded-full"></div>}
                        {!current && <div className={"w-1 h-2 mx-1"}></div>}
                        <Skeleton className="w-8 h-8 rounded-full" /> {/* Avatar skeleton */}
                        <Skeleton className="w-24 h-4" /> {/* Username skeleton */}
                        <span className="ms-2">
                <Icon className="scale-150" icon="fluent:emoji-hint-48-regular" width="16" height="16" />
            </span>
                    </div>
                    <div className="right flex gap-1 items-center">
                        <Skeleton className="w-5 h-5 rounded-full" /> {/* Badge skeleton */}
                    </div>
                </div>
            )}
        </>
    );
}
