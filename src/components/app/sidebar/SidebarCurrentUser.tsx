'use client'
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useUserStore} from "@/stores/user";

export default function SidebarCurrentUser() {
    const user = useUserStore((state) => state.user)
    return (
        <>
            <div className="currentUser px-3">
                <div className="currentUser-container flex items-center h-12 gap-2">
                    <Avatar className={"currentUser__avatar w-12 h-12"}>
                        <AvatarImage></AvatarImage>
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <div className="currentUser__name flex flex-col">
                        <div className="currentUser__name-email flex items-center gap-1 text-foreground">
                            <span className={"text-md font-medium"}>{user?.firstName}</span>
                            <span className={"text-md font-medium"}>{user?.lastName}</span>
                        </div>
                        <div className="currentUser__name-email flex items-center gap-1 text-muted-foreground">
                            <span className={"text-sm"}>{user?.email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}