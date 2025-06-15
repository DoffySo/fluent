'use server'

import { pusherServer } from '@/lib/pusher/server'

export async function sendTyping(chatId: string, userId: string) {
    await pusherServer.trigger(`chat-${chatId}`, 'typing', { userId })
}
