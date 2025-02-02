"use client"
import {useState} from "react";

export default function Chat({chatid}: {chatid?: number}) {
    const [selectedChat, setSelectedChat] = useState<number | null>(null);

    return (
        <>
            { selectedChat &&
            <div className="chat min-w-full w-full sm:border-l h-full border-gray-200">
                chat
            </div>
            }
        </>
    )
}