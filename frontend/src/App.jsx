import React from "react"
import { Route, Routes } from "react-router-dom"
import EmailVerify from "./pages/EmailVerify"
import Login from "./pages/Login"
import Register from "./pages/Register"
import MainLayout from "./pages/MainLayout"
import UnAuthProtector from "./Components/UnAuthProtector"

function App() {

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
