import Sidebar from "@/components/app/sidebar/Sidebar";
import {UserInitializer} from "@/components/InitializeUser";
import {NoPassphrase} from "@/components/NoPassphrase";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex w-screen">
            <NoPassphrase />
            <UserInitializer />
            <Sidebar />
            <main className="flex flex-1 relative">{children}</main>
        </div>
    );
}
