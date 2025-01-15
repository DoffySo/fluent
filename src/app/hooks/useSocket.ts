import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const socketIo = io();

        console.log("Connecting to socket...");

        socketIo.on('connect', () => {
            setIsConnected(true);
            console.log("Connected");
        });

        socketIo.on('disconnect', () => {
            setIsConnected(false);
            console.log("Connected");
        });

        socketIo.on('chat message', (msg: string) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        setSocket(socketIo);

        return () => {
            socketIo.disconnect();
        };
    }, []);

    const sendMessage = (message: string) => {
        if (socket) {
            socket.emit('chat message', message);
        }
    };

    return { isConnected, messages, sendMessage };
};