import Link from "next/link";
import SidebarHeader from "@/components/app/sidebar/SidebarHeader";
import SidebarScrollable from "@/components/app/sidebar/SidebarScrollable";

export default function Sidebar() {
    return (
        <>
            <div className="sidebar w-full md:w-4/12 xl:w-3/12 bg-background h-screen md:border-r">
                <div className="sidebar-container flex flex-col gap-1 h-full">
                    <SidebarHeader />
                    <SidebarScrollable />
                </div>
            </div>
        </>
    )
}