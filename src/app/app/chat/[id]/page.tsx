import Chat from "@/components/app/chat/Chat"

export default function ChatPage({ params }: { params: { id: string } }) {
    return <Chat id={params.id} />
}
