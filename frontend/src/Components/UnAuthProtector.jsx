import { Loader } from 'lucide-react';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function UnAuthProtector({children}) {

    const navigate = useNavigate()
    const {loading} = useSelector((state)=>state.auth)

    const isLoading = loading

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(!token){
            navigate("/login")
        }
    })

  return (
    <>
        {
            isLoading?<Loader/>:children
        }   
    </>
  )
}

export default UnAuthProtector
