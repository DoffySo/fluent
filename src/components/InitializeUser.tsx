'use client'

import { useEffect } from 'react'
import { useUserStore } from '@/stores/user'

export function UserInitializer() {
    const fetchUser = useUserStore((state) => state.fetchUser)

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    return null
}
