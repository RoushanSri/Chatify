import { io } from "socket.io-client";

let socket;

export const initSocket = (userId) => {
  
  socket = io("https://chatify-cahh.onrender.com",{
    query:{
      userId:userId.userId
    }
  });
};

export const getSocket = () => socket;