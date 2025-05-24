import { create } from 'zustand'

type Chat = {
    id: string | null
} | null

interface ChatState {
    chat: Chat
    setChat: (chat: Chat) => void
}

export const useChatStore = create<ChatState>((set) => ({
    chat: null,
    setChat: (chat) => set({ chat }),
}))
