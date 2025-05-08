'use client'

import { useEffect, useRef, useState } from 'react'
import { useChatFoldersStore } from '@/stores/chatFolders'
import { useUserStore } from '@/stores/user'

export default function SidebarChatFolders() {
    const [selectedFolderIdx, setSelectedFolderIdx] = useState(0)
    const [carretX, setCarretX] = useState(0)
    const [carretWidth, setCarretWidth] = useState(0)

    const folderRefs = useRef<(HTMLDivElement | null)[]>([])
    const containerRef = useRef<HTMLDivElement | null>(null)
    const scrollRef = useRef<HTMLDivElement | null>(null)

    const user = useUserStore((state) => state.user)
    const { chatFolders, isLoading, fetchChatFolders } = useChatFoldersStore()

    useEffect(() => {
        if (user?.id) fetchChatFolders(user.id)
    }, [user?.id, fetchChatFolders])

    useEffect(() => {
        const selectedEl = folderRefs.current[selectedFolderIdx]
        const containerEl = containerRef.current
        if (selectedEl && containerEl) {
            const containerRect = containerEl.getBoundingClientRect()
            const elementRect = selectedEl.getBoundingClientRect()
            const offsetX = elementRect.left - containerRect.left
            setCarretX(offsetX)
            setCarretWidth(elementRect.width)

            selectedEl.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            })
        }
    }, [selectedFolderIdx])

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        const handleWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                el.scrollLeft += e.deltaY
                e.preventDefault()
            }
        }

        el.addEventListener('wheel', handleWheel, { passive: false })
        return () => el.removeEventListener('wheel', handleWheel)
    }, [])

    if (!chatFolders || chatFolders.length === 0) return null

    const folders = [{ id: 'all', name: 'All Chats' }, ...chatFolders]

    return (
        <div
            ref={scrollRef}
            className="sidebar-header__folders overflow-x-auto overflow-y-hidden"
        >
            <div
                ref={containerRef}
                className="folders relative h-8 flex items-end py-1 gap-4 px-3"
            >
                {folders.map((folder, idx) => (
                    <div
                        key={folder.id}
                        ref={(el) => (folderRefs.current[idx] = el)}
                        onClick={() => setSelectedFolderIdx(idx)}
                        className={`folder h-6 text-sm flex items-end text-nowrap cursor-default hover:text-foreground transition-all duration-100 ${
                            idx === selectedFolderIdx
                                ? 'text-foreground'
                                : 'text-muted-foreground'
                        }`}
                    >
                        <span>{folder.name}</span>
                    </div>
                ))}

                <div
                    className="carret absolute bottom-0 h-1 bg-foreground rounded-t-[4px] transition-all duration-300"
                    style={{
                        left: `${carretX}px`,
                        width: `${carretWidth}px`,
                    }}
                />
            </div>
        </div>
    )
}
