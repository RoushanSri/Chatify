import {Server} from "socket.io"
import express from 'express'
import http from "http"

const app = express()

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"https://chatify-phi-seven.vercel.app"
    }
})

export function getRecieverSocketId(userId) {
  return userSocketMap[userId];
}

const userSocketMap = {};

io.on("connection", (socket)=>{
    console.log("A user Connected ",socket.id);    

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    socket.on("disconnect",()=>{
        console.log("A User disconnected", socket.id);
        delete userSocketMap[userId];
    })
})

export {app, server, io};