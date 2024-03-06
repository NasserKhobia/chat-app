import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET","POST"],
    }
})

export const getReceiverSocketId = (reseverId) =>{
    return userSocketMap[reseverId];
}
const userSocketMap = {}; //{userId:socketId }


console.log('hi');

io.on('connection',(socket)=>{
    console.log('user connected to server',socket.id);
    const userId = socket.handshake.query.userId;
    console.log(userId);
    if(userId != 'undefined'){
        userSocketMap[userId] = socket.id
    }
    //io.emit  it use to send event  to all connected client
    io.emit('getOnlineUsers',Object.keys(userSocketMap));
    socket.on('disconnect',()=>{
        console.log('user disconected to server',socket.id);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers',Object.keys(userSocketMap));
    })
})

export {app,io,server}