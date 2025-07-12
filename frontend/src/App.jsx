import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import EmailVerify from "./pages/EmailVerify"
import Login from "./pages/Login"
import Register from "./pages/Register"
import MainLayout from "./pages/MainLayout"
import UnAuthProtector from "./Components/UnAuthProtector"
import { getSocket, initSocket } from "./socket"
import { useDispatch, useSelector } from "react-redux"

function App() {
  
  const {profile} = useSelector(state=>state.user)

  useEffect(() => {
    if(!profile?._id) return
    
    initSocket({userId:profile._id});
    const socket = getSocket();

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, [profile?._id]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/verify-email" element={<EmailVerify/>}/>
        <Route path="/u/" element={<UnAuthProtector>
          <MainLayout/>
          </UnAuthProtector>}/>
      </Routes>
    </>
  )
}

export default App
