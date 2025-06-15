import { create } from 'zustand'

interface Message {
    id: string
    message: string
    ogMessage?: string
    pinned: boolean,
    isOwn: boolean,
    createdAt: string
    messageNonce: string
    user: {
        id: string
        firstName: string
    }
}

interface PinnedStore {
    messages: Message[] | null,
    pinnedMessageId: string | null,
    scrollToPinned: string | null,
    setPinnedMessageId: (id: string | null) => void
    setScrollToPinned: (id: string | null) => void
    setMessages: (messages: Message[] | null) => void
}

export const usePinnedStore = create<PinnedStore>((set) => ({
    messages: null,
    pinnedMessageId: null,
    scrollToPinned: null,
    setPinnedMessageId: (id) => set({ pinnedMessageId: id }),
    setScrollToPinned: (id) => set({ scrollToPinned: id }),
    setMessages: (messages) => set({ messages: messages }),
}))
