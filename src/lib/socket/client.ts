import { io, Socket } from "socket.io-client";

let socketInstance: Socket | null = null;

export function getSocket(userId: string): Socket {
    if (!socketInstance) {
        socketInstance = io('http://localhost:3001/', {
            withCredentials: true,
            extraHeaders: {
                "userId": userId // Убедитесь, что userId всегда актуален
            }
        });

        // Дополнительная обработка событий соединения
        socketInstance.on('connect', () => {
            console.log('Socket connected:', socketInstance?.id);
        });
        socketInstance.on('disconnect', () => {
            console.log('Socket disconnected');
            socketInstance = null; // Сброс экземпляра при отключении
        });
        socketInstance.on('connect_error', (error) => {
            console.error('Socket connection error:', error.message);
            socketInstance = null; // Сброс экземпляра при ошибке
        });
    } else {
        // Если сокет уже есть, но userId изменился, переподключаем его
        // (Это может быть излишним, если userId устанавливается при первом подключении)
        const currentUserId = socketInstance.io.opts.extraHeaders?.userId;
        if (currentUserId !== userId) {
            console.log("User ID changed, reconnecting socket...");
            socketInstance.io.opts.extraHeaders.userId = userId;
            socketInstance.disconnect().connect();
        }
    }
    return socketInstance;
}