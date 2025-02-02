const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const users = {};
const calls = {};

app.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log('A client connected');


        socket.on('online', (data) => {
            if(data.id) {
                users[socket.id] = data.id;
                calls[data.id] = socket.id;
                console.log(`A user (id: ${data.id}) connected`);
                console.log(`Created/Updated ${data.id} userid room to calls [roomid: ${socket.id}]`);
            }
        })

        socket.on('disconnect', () => {
            console.log('A client disconnected');
            delete users[socket.id];
        });
    });

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});