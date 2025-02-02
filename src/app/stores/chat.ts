import { create } from 'zustand'

type storeType = {
    id: number | null,
    setId: (id: number) => void,
}

export const useChatStore = create<storeType>((set) => ({
    id: null,
    setId: (newId: number) => set( () => ({
        id: newId
    })),
}));