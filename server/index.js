// импорты и настройка Express сервера  
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const app = express();
const { addUser, findUser, getRoomUsers, removeUsers } = require('./users'); 

const route = require('./route');

// настройка CORS и маршрутов
app.use(cors({ origin: "*" }));
app.use(route);

// создание http сервера и подключение сокет.ио
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// подкл клиентов через сокет
io.on('connection', (socket) => {
    let currentUser = null;

    // обработка события joun(вход в комнату)
    socket.on('join', ({ name, room }) => {
        socket.join(room);
        const { user, isExist } = addUser({ name, room });
        currentUser = user;

        const userMessage = isExist ? `${user.name}, join again` : `Joined ${user.name}`;
       
        socket.emit('message', {
            data: { user: { name: 'Admin' }, message: userMessage },
        });
        socket.broadcast.to(user.room).emit('message', {
            data: { user: { name: 'Admin' }, message: `${user.name} has joined` },
        });

        io.to(user.room).emit('room', {
            data: { users: getRoomUsers(user.room) },
        });
    });

    // обработка события send (отправка сообщения)
    socket.on('sendMessage', ({ message, params }) => {
        const user = findUser(params);

        if (user) {
            io.to(user.room).emit('message', { data: { user, message } });
        }
    });

    // left(покидание комнаты)
    socket.on('leftRoom', ({ params }) => {
        const user = removeUsers(params);  
        if (user) {
            const { room, name } = user;
            io.to(room).emit('message', {
                data: { user: { name: 'Admin' }, message: `${name} has left` },
            });
            io.to(room).emit('room', {
                data: { users: getRoomUsers(room) },
            });
        }
    });
});

// запуск сервера
server.listen(5000, () => {
    console.log('Server is running');
});
