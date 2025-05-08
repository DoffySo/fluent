import { create } from 'zustand'

type User = {
    id: string
    email: string
    firstName: string,
    lastName: string,
    username: string,
    phone: string,
    isAdmin: boolean,
    isSupport: boolean,
    isVerified: boolean,
} | null

interface UserState {
    user: User
    setUser: (user: User) => void
    fetchUser: () => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    fetchUser: async () => {
        try {
            const res = await fetch('/api/me/current')
            if (res.ok) {
                const data = await res.json()
                set({ user: data.user })
            } else {
                set({ user: null })
            }
        } catch (error) {
            set({ user: null })
        }
    },
}))
