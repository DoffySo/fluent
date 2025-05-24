'use client';

import { useEffect, useState } from 'react';
import SidebarChat from "@/components/app/sidebar/SidebarChat";

export default function SidebarScrollable() {
    const [chats, setChats] = useState<any[]>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await fetch('/api/chats/get', {
                    credentials: 'include',
                });

                if (!res.ok) throw new Error();

                const data = await res.json();
                setChats(data);
            } catch {
                setError(true);
            }
        };

        fetchChats();
    }, []);

    if (error) {
        return <div className="text-red-500 text-center py-6">Ошибка загрузки чатов</div>;
    }

    if (chats.length === 0) {
        return <div className="text-muted-foreground text-center py-6">No chats...</div>;
    }

    return (
        <div className="sidebar-chats h-full w-full max-w-full overflow-y-auto overflow-x-hidden">
            <div className="sidebar-chats__container w-full max-w-full flex flex-col gap-1">
                {chats.map((chat: any) => (
                    <SidebarChat key={chat.id} chatId={chat.id} />
                ))}
            </div>
        </div>
    );
}
