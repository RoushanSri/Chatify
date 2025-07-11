import React from "react"
import { Route, Routes } from "react-router-dom"
import EmailVerify from "./pages/EmailVerify"
import Login from "./pages/Login"
import Register from "./pages/Register"
import MainLayout from "./pages/MainLayout"

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/verify-email" element={<EmailVerify/>}/>
        <Route path="/" element={<MainLayout/>}/>
      </Routes>
    </>
  )
}

export default App
