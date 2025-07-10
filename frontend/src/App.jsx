import React from "react"
import AuthLayout from "./pages/AuthLayout"
import { Route, Routes } from "react-router-dom"
import EmailVerify from "./pages/EmailVerify"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthLayout/>}/>
        <Route path="/verify-email" element={<EmailVerify/>}/>
      </Routes>
    </>
  )
}

export default App
