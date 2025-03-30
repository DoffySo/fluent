import { create } from 'zustand'

type storeType = {
    id: number | null,
    setId: (id: number | null) => void,
}

export const useChatStore = create<storeType>((set) => ({
    id: null,
    setId: (newId: number | null) => set( () => ({
        id: newId
    })),
}));