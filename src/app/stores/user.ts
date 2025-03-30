import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
    id: number              | null;
    token: string           | null;
    email: string           | null;
    public_key: string      | null;
    created_at: string      | null;
    last_seen: string       | null;
    first_name: string      | null;
    last_name: string       | null;
    username: string        | null;
    bio: string             | null;
    birthday: string        | null;
    phone_number: string    | null;
    is_premium: boolean     | null;
    is_support: boolean     | null;
    is_admin: boolean       | null;
};

type StoreType = {
    user: User;
    setUser: (user: User) => void;
    fetchUser: () => Promise<void>;
};

export const useUserStore = create<StoreType>()(
    persist(
        (set) => ({
            user: {
                id: null,
                token: null,
                email: null,
                public_key: null,
                created_at: null,
                last_seen: null,
                first_name: null,
                last_name: null,
                username: null,
                bio: null,
                birthday: null,
                phone_number: null,
                is_premium: null,
                is_support: null,
                is_admin: null,
            },
            setUser: (user) => set({ user }),
            fetchUser: async () => {
                // const session = {};
                // if (session?.user_id) {
                //     const res = await fetch(`/api/user/${session.user_id.toString()}`);
                //     if (res.ok) {
                //         const {user} = await res.json();
                //
                //         set({ user });
                //     } else {
                //         console.error("Failed to fetch user data:", res.statusText);
                //     }
                // }
            },
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
