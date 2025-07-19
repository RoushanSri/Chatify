import { MessageCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import UserBox from "../Components/UserBox";
import ChatContainer from "../Components/ChatContainer";
import {useDispatch, useSelector} from "react-redux"
import { logoutUser } from "../redux/slices/authSlice";
import {useNavigate} from "react-router-dom"
import { getSocket } from "../socket";
import AddFriend from "../Components/AddFriend";
import FriendRequests from "../Components/FriendRequests";
import { incrementRequestCount } from "../redux/slices/requestSlice";
import toast from "react-hot-toast";
import CreateGroup from "../Components/CreateGroup";
import GroupBox from "../Components/GroupBox";
import FriendList from "../Components/FriendList";
import GroupList from "../Components/GroupList";

function MainLayout() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {profile} = useSelector(state=>state.user)
    const {count} = useSelector(state=>state.request)

    const [friends, setfriends] = useState([])
    const [groupS, setGroups] = useState([])
    const [addFriend, setAddFriend] = useState(false)
    const [showRequests, setShowRequests] = useState(false);
    const [createGroup, setCreateGroup] = useState(false)
    const [friendList, setFriendList] = useState(false)
    const [groupList, setGroupList] = useState(false)

    useEffect(() => {
        if (Array.isArray(profile?.friends)) {
            setfriends(profile.friends);
        } else {
            setfriends([]);
        }
        if(Array.isArray(profile?.groups))
            setGroups(profile.groups)
        else
            setGroups([]);
    }, [profile]);

    useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewRequest = (request) => {
      toast.success("New Request!!")
      dispatch(incrementRequestCount())
    };

    socket.on("newRequest", handleNewRequest);

    return () => {
      socket.off("newRequest", handleNewRequest);
    };
  }, []);

    const [currentUser, setCurrentUser] = useState(null)
    const [currentGroup, setCurrentGroup] = useState(null)

    const LogOut = ()=>{
        const toastId = toast.loading("Logging Out...")
        dispatch(logoutUser())
        const socket = getSocket();
        if (socket?.connected) {
            socket.disconnect();
        }
        localStorage.removeItem("token")
        toast.success("Logged Out successfully",{
            id:toastId
        })
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

        <div className="flex gap-6 items-center">
            <button
            onClick={() => setCreateGroup(true)}
            className="text-white bg-teal-800 hover:bg-teal-700 font-semibold px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer"
        >
            Create Group
        </button>
        <button
            onClick={() => setShowRequests(true)}
            className="text-white bg-teal-800 hover:bg-teal-700 font-semibold px-4 py-2 rounded-lg transition-colors duration-300 relative cursor-pointer"
        >
            Friend Requests
            {count!=0 && <span className="absolute w-5 h-5 -top-2 -right-2 bg-red-700 text-white p-2 rounded-full text-sm flex justify-center items-center">{count}</span>}
        </button>
        <button
            onClick={() => setAddFriend(true)}
            className="text-white bg-teal-800 hover:bg-teal-700 font-semibold px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer"
        >
            Add Friend
        </button>
        <button
            onClick={() => {
                LogOut()
            }}
            className="text-white bg-teal-800 hover:bg-teal-700 font-semibold px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer"
        >
            Logout
        </button>
        </div>
    </div>
</div>


        <div className="flex-1 flex min-h-0 relative">
            <div className="flex flex-col bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 w-1/4 p-5 overflow-y-auto min-h-0">
                {
                    Array.isArray(groupS) && groupS.map((group, idx) => (
                        <GroupBox group={group} key={group._id} currentGroup={currentGroup} setCurrentGroup={setCurrentGroup} setCurrentUser={setCurrentUser}/>
                    ))
                }
                {
                   Array.isArray(friends) && friends.map((user, idx) => (
                        <UserBox user={user} key={user._id} setCurrentUser={setCurrentUser} currentUser={currentUser} setCurrentGroup={setCurrentGroup}/>
                    ))
                }
            </div>
            <div className="flex-1 overflow-y-auto min-h-0">
                <ChatContainer currentUser={currentUser} currentGroup={currentGroup} setFriendList={setFriendList} setGroupList={setGroupList}/>
            </div>
            {
                addFriend && (<div className="absolute top-1/2 left-1/2"><AddFriend onClose={()=>setAddFriend(false)}/></div>)
            }
            {
                showRequests && (<div className="absolute top-1/2 left-1/2"><FriendRequests onClose={()=>setShowRequests(false)}/></div>)
            }
            {
                createGroup && (<div className="absolute"><CreateGroup onClose={()=>setCreateGroup(false)}/></div>)
            }
            {
                friendList && (<div className="absolute top-1/2 left-1/2"><FriendList onClose={()=>setFriendList(false)} currentGroup={currentGroup} onAddFriendToGroup={(selectedMembers)=>console.log(selectedMembers)
                }/></div>)
            }
            {
                groupList && (<div className="absolute top-1/2 left-1/2"><GroupList onClose={()=>setGroupList(false)} currentUser={currentUser} onSelectGroup={()=>console.log("add to this group")
                }/></div>)
            }
        </div>
    </div>
);
}

export default MainLayout;
