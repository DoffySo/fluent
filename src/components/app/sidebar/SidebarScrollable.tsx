'use client';

import { useEffect, useState } from 'react';
import SidebarChat from "@/components/app/sidebar/SidebarChat";
import {useUserStore} from "@/stores/user";
import {supabase} from "@/lib/supabase/client"

export default function SidebarScrollable() {
    const [chats, setChats] = useState<any[]>([]);
    const [error, setError] = useState(false);
    const user = useUserStore(state => state.user);

    useEffect(() => {
        if (!user?.id) return;

        const fetchUserChats = async () => {
            try {
                const { data: participantData, error: participantError } = await supabase
                    .from('ChatParticipant')
                    .select('chat:chatId(*)')
                    .eq('userId', user.id);

                if (participantError) throw participantError;

                const userChats = participantData.map((item: any) => item.chat);
                setChats(userChats || []);
            } catch (err) {
                console.error('Error fetching chats:', err);
                setError(true);
            }
        };

        fetchUserChats();

        const participantChanges = supabase
            .channel('chat_participant_changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'ChatParticipant',
                    filter: `userId=eq.${user.id}`,
                },
                async (payload) => {
                    if (payload.eventType === 'INSERT') {
                        const { data: chatData, error: chatError } = await supabase
                            .from('Chat')
                            .select('*')
                            .eq('id', payload.new.chatId)
                            .single();

                        if (!chatError) {
                            setChats(prev => [...prev, chatData]);
                        }
                    } else if (payload.eventType === 'DELETE') {
                        setChats(prev => prev.filter(chat => chat.id !== payload.old.chatId));
                    }
                }
            )
            .subscribe();

        const chatChanges = supabase
            .channel('chat_updates')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'Chat',
                },
                (payload) => {
                    setChats(prev => prev.map(chat =>
                        chat.id === payload.new.id ? { ...chat, ...payload.new } : chat
                    ));
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(participantChanges);
            supabase.removeChannel(chatChanges);
        };
    }, [user?.id]);

    if (error) {
        return <div className="text-red-500 text-center py-6">Failed to load chats</div>;
    }

    if (chats.length === 0) {
        return <div className="text-muted-foreground text-center py-6">No chats</div>;
    }

    return (
        <div className="sidebar-chats h-full w-full max-w-full overflow-y-auto overflow-x-hidden">
            <div className="sidebar-chats__container w-full max-w-full flex flex-col gap-1">
                {chats.map((chat) => (
                    <SidebarChat key={chat.id} chatId={chat.id} />
                ))}
            </div>
        </div>
    );
}