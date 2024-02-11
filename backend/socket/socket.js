import {Server} from 'socket.io';
import express from "express";
import http from 'http';


const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

export const receiverSocketId =(receiverid)=>{
    return userSocketMap[receiverid];
}

const userSocketMap={};

io.on("connection", (socket) => {
    console.log("a user connected",socket.id);
    const userId = socket.handshake.query.userId;
    if (userId != 'undefined') userSocketMap[userId] = socket.id;
    //io emit used to send events to all clients
    io.emit("getUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("user disconnected",socket.id);
        delete userSocketMap[userId];
        io.emit("getUsers", Object.keys(userSocketMap));
    });
});



export {io,app,server};