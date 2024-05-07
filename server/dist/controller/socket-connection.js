"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectSocket = void 0;
const connectSocket = (io) => {
    const onlineUsers = [];
    io.on('connection', (socket) => {
        console.log('The socket connected successfully');
        // to recieve the message 
        socket.on('message', (message) => {
            console.log("this is the message", message);
            if (onlineUsers.includes(message)) {
                socket.to(message).emit("getmsg", message);
            }
        });
        socket.on('getId', (socketid) => {
            console.log('this is id');
            onlineUsers.push(socketid);
        });
        console.log(onlineUsers);
    });
    // Here disconnect the socket 
    io.on('disconnect', () => {
        console.log('The socket is disconnected');
    });
};
exports.connectSocket = connectSocket;
