import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors';
import channelRouter from './router/channel-router.js'

const app = express();

app.use(cors());
app.use(channelRouter);
app.use(express.static('public'));

export const httpServer = createServer(app);
export const io = new Server(httpServer, { 
    cors : "*"
});

io.on("connection", (socket) => {
    socket.on("join_room", (roomId) => {
        console.log("Here");
        socket.join(roomId);
    })

    socket.on('image', ({image, roomId}) => {
        socket.to(roomId).emit('image', image);
    })

    socket.on('message', ({message, roomId}) => {
        socket.to(roomId).emit('message', message);
    })
})

httpServer.listen(process.env.PORT, () => {
    console.log("Server Is Running Now");
});
