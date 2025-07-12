import { MessageCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import UserBox from "../Components/UserBox";
import ChatContainer from "../Components/ChatContainer";
import {useDispatch, useSelector} from "react-redux"
import { logoutUser } from "../redux/slices/authSlice";
import {useNavigate} from "react-router-dom"
import { getSocket } from "../socket";

function MainLayout() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {profile} = useSelector(state=>state.user)

    const [friends, setfriends] = useState([])

    useEffect(()=>{
        setfriends(profile?.friends)
    },[profile])

    const [currentUser, setCurrentUser] = useState(null)

    const LogOut = ()=>{
        dispatch(logoutUser())
        const socket = getSocket();
        if (socket?.connected) {
            socket.disconnect();
        }
        localStorage.removeItem("token")
        navigate("/login");
    }

return (
    <div className="w-full h-screen flex flex-col">
        <div className="w-full bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900">
    <div className="flex justify-between items-center p-3 px-5">
        <div className="text-3xl font-bold text-white flex items-center gap-2">
            <div className="bg-white rounded-lg p-2 hover:scale-110 transition-transform duration-300 ease-in-out">
                <MessageCircle color="#008479" fill="#008479" />
            </div>
            Chatify
        </div>

        <button
            onClick={() => {
                LogOut()
            }}
            className="text-white bg-teal-800 hover:bg-teal-700 font-semibold px-4 py-2 rounded-lg transition-colors duration-300"
        >
            Logout
        </button>
    </div>
</div>


        <div className="flex-1 flex min-h-0">
            <div className="flex flex-col bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 w-1/4 p-5 overflow-y-auto min-h-0">
                {
                    friends.map((user, idx) => (
                        <UserBox user={user} key={user.id} setCurrentUser={setCurrentUser} currentUser={currentUser}/>
                    ))
                }
            </div>
            <div className="flex-1 overflow-y-auto min-h-0">
                <ChatContainer currentUser={currentUser}/>
            </div>
        </div>
    </div>
);
}

export default MainLayout;
