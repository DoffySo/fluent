import { create } from 'zustand'

type Search = {
    value: string
    isSearching: boolean
} | null

interface SearchState {
    search: Search
    setSearch: (value: Search) => void
    setSearchValue: (value: string) => void
    setSearching: (isSearching: boolean) => void
}

export const useSearchStore = create<SearchState>((set) => ({
    search: null,

    setSearch: (value) => set({ search: value }),

    setSearchValue: (value) =>
        set((state) => ({
            search: state.search
                ? { ...state.search, value }
                : { value, isSearching: false },
        })),

    setSearching: (isSearching) =>
        set((state) => ({
            search: state.search
                ? { ...state.search, isSearching }
                : { value: '', isSearching },
        })),
}))
