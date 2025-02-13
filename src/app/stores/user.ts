import { create } from 'zustand';
import { getSession } from "@/app/lib/session";

type User = {
    id: number | null;
    token: string | null;
    username: string | null;
    email: string | null;
    first_name: string | null;
    last_name: string | null;
    public_key: string | null;
    phone_number: string | null;
};

type storeType = {
    user: User;
    updateUser: (token: string) => void;
    setUser: (token: string) => void;
};

export const useUserStore = create<storeType>((set) => ({
    user: {
        id: null,
        token: null,
        username: null,
        email: null,
        first_name: null,
        last_name: null,
        public_key: null,
        phone_number: null,
    },

    // Update user data by fetching it from the API using the user_id from the session
    updateUser: async (token) => {
        const session = await getSession();
        if (session?.user_id) {
            // Fetch user data from the API using the user_id from the session
            const res = await fetch(`/api/user/${session.user_id.toString()}`);
            const userData = await res.json();

            if (userData) {
                // Update the state with the fetched user data
                set(() => ({
                    user: {
                        token: token,
                        id: userData.user.id,
                        username: userData.user.username,
                        email: userData.user.email,
                        first_name: userData.user.first_name,
                        last_name: userData.user.last_name,
                        public_key: userData.user.public_key,
                        phone_number: userData.user.phone_number,
                    },
                }));
            }
        }
    },

    // Set user data by fetching it from the API using the user_id from the session
    setUser: async (token) => {
        const session = await getSession();
        if (session?.user_id) {
            // Fetch user data from the API using the user_id from the session
            const res = await fetch(`/api/user/${session.user_id.toString()}`);
            const userData = await res.json();

            if (userData) {

                // Set the state with the fetched user data
                set(() => ({
                    user: {
                        token: token,
                        id: userData.user.id,
                        username: userData.user.username,
                        email: userData.user.email,
                        first_name: userData.user.first_name,
                        last_name: userData.user.last_name,
                        public_key: userData.user.public_key,
                        phone_number: userData.user.phone_number,
                    },
                }));
            }
        }
    },
}));
