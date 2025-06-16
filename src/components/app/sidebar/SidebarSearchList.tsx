'use client'
import {useSearchStore} from "@/stores/search";
import {useEffect, useState} from "react";
import SearchUser from "@/components/app/search/SearchUser";

export default function SidebarSearchList() {
    const search = useSearchStore((state) => state.search)
    const [searchResults, setSearchResults] = useState<{ users: any[]; chats: any[] } | null>(null);


    useEffect(() => {
        const controller = new AbortController();

        async function fetchResults() {
            if (!search?.value) return;

            try {
                const res = await fetch(`/api/user/search?query=${encodeURIComponent(search.value)}`, {
                    signal: controller.signal
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch');
                }

                const data = await res.json();
                setSearchResults(data);
            } catch (err) {
                if (err.name !== 'AbortError') console.error(err);
            }
        }

        fetchResults();

        return () => controller.abort();
    }, [search?.value]);



    return (
        <>
            <div className="flex w-full px-2 py-2">
                <div className="flex flex-col w-full gap-6">
                    {searchResults?.users?.length < 1 && (
                        <span>Searching...</span>
                    )}

                    {searchResults?.users?.length > 0 && (
                        <div className="users">
                            <h4 className="text-sm text-foreground font-bold">Users</h4>
                            <ul>
                                {searchResults.users.map((user) => (
                                    <SearchUser id={user.id} firstName={user.firstName} />
                                ))}
                            </ul>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}