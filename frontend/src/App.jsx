import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import EmailVerify from "./pages/EmailVerify"
import Login from "./pages/Login"
import Register from "./pages/Register"
import MainLayout from "./pages/MainLayout"
import UnAuthProtector from "./Components/UnAuthProtector"
import { getSocket, initSocket } from "./socket"
import { useSelector } from "react-redux"
import LandingPage from "./pages/LandingPage"

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
        <Route path="/" element={<LandingPage/>}/>
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
