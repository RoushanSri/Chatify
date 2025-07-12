import { Loader } from 'lucide-react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getUserProfile } from '../redux/slices/userSlice';

function UnAuthProtector({children}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {token} = useSelector((state)=>state.auth)
    const {profile, loading} = useSelector(state=>state.user)

    const isLoading = loading

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(!token){
            navigate("/login")
        }
    })

    useEffect(() => {
        if(!profile )
            dispatch(getUserProfile()).then((res) => {
                if (res.error) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            });
        
    }, [ profile, token ]);

  return (
    <>
        {
            isLoading?<Loader/>:children
        }   
    </>
  )
}

export default UnAuthProtector
