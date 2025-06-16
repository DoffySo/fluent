import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["userId"],
    credentials: true
  }
});

const connectedUsers = {}; 

io.on("connection", (socket) => {
  const userId = socket.handshake.headers?.userid;

  if (userId) {
    io.emit("user_online", userId);
    if (!connectedUsers[userId]) {
      connectedUsers[userId] = [];
    }

    connectedUsers[userId].push(socket.id);
    console.log(`User ${userId} connected with socket ID: ${socket.id}. Total sockets for user: ${connectedUsers[userId].length}`);
    // console.log("Current connected users:", JSON.stringify(connectedUsers, null, 2));
  } else {
    console.warn("A connection attempted without a userId in headers.");
  }

        socket.on("request_user_status", (requestedUserId, callback) => {
        const isOnline = !!connectedUsers[requestedUserId] && connectedUsers[requestedUserId].length > 0;
        console.log(`Client requested status for ${requestedUserId}. Is online: ${isOnline}`);

        if (typeof callback === 'function') {
            callback(isOnline);
        }
        });

        socket.on("request_all_online_users", (callback) => {
            const onlineUserIds = Object.keys(connectedUsers);
            console.log(`Client requested all online users. Count: ${onlineUserIds.length}`);
            if (typeof callback === 'function') {
                callback(onlineUserIds);
            }
        });

        socket.on("typing", (chatId, userId) => {
            console.log(`User ${userId} is typing in chat ${chatId}`);
            io.emit("user_typing", chatId, userId);
        })
        socket.on("stopped_typing", (chatId, userId) => {
            console.log(`User ${userId} is typing in chat ${chatId}`);
            io.emit("user_stopped_typing", chatId, userId);
        })

    socket.on("disconnect", (sockettwo) => {
    const userId = socket.handshake.headers?.userid;

    if (userId && connectedUsers[userId]) {
        const index = connectedUsers[userId].indexOf(socket.id);

        if (index > -1) {
        connectedUsers[userId].splice(index, 1);
        console.log(`Socket ${socket.id} disconnected for user ${userId}. Remaining sockets for user: ${connectedUsers[userId].length}`);

        io.emit("user_offline", userId);
        if (connectedUsers[userId].length === 0) {
            delete connectedUsers[userId];
            console.log(`User ${userId} fully disconnected (no active sockets).`);
        }
        } else {
            console.warn(`Socket ${socket.id} not found for user ${userId} during disconnect.`);
        }
        
        console.log("Current connected users:", JSON.stringify(connectedUsers, null, 2));
    } else {
        console.warn(`A socket disconnected, but userId was not found or user already removed. Socket ID: ${socket.id}`);
    }
    });
});

httpServer.listen(3001, () => {
  console.log('Socket.IO server listening on port 3001');
});