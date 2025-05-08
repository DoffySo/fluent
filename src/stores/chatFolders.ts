import {create} from 'zustand'

interface Chat {
    id: string
    type: string
    lastMessageText: string
    createdAt: string
}

interface ChatFolderItem {
    chatId: string
    folderId: string
    userId: string
    chat: Chat
}

interface ChatFolder {
    id: string
    name: string
    userId: string
    items: ChatFolderItem[]
    createdAt: string
    updatedAt: string
}

interface ChatFoldersState {
    chatFolders: ChatFolder[] | null
    isLoading: boolean
    error: string | null
    fetchChatFolders: (userId: string) => Promise<void>
}

export const useChatFoldersStore = create<ChatFoldersState>((set) => ({
    chatFolders: null,
    isLoading: false,
    error: null,
    fetchChatFolders: async (userId: string) => {
        set({ isLoading: true, error: null })

        try {
            const response = await fetch(`/api/me/chatfolders?userId=${userId}`) // API для получения папок
            if (!response.ok) {
                throw new Error('Error when loading chat folders...')
            }

            const data = await response.json()

            set({ chatFolders: data, isLoading: false })
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
        }
    },
}))
