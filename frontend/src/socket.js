import { io } from "socket.io-client";

let socket;

export const initSocket = (userId) => {
  
  socket = io("http://localhost:8080",{
    query:{
      userId:userId.userId
    }
  });
};

export const getSocket = () => socket;