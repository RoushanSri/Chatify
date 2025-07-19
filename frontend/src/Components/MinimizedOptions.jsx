import React from "react";
import { MessageCircle, Users, UserPlus, Bell, LogOutIcon } from "lucide-react";
import { useSelector } from "react-redux";

function MinimizedOptions({
  setAddFriend,
  setShowRequests,
  setCreateGroup,
  setShowMinChat,
  showMinChat,
  LogOut,
}) {

  const { count } = useSelector((state) => state.request);

  const handleChat = () => {
    setShowMinChat(!showMinChat);
  };

  const handleCreateGroup = () => {
    setCreateGroup(true);
  };

  const handleFriendRequests = () => {
    setShowRequests(true);
  };

  const handleAddFriend = () => {
    setAddFriend(true);
  };

  return (
    <div className="flex flex-col space-y-2 p-2">
      <button
        onClick={handleChat}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-500 hover:bg-teal-600 text-white transition-colors duration-200"
        title="Chat"
      >
        <MessageCircle size={20} />
      </button>

      <button
        onClick={handleCreateGroup}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-500 hover:bg-teal-600 text-white transition-colors duration-200"
        title="Create Group"
      >
        <Users size={20} />
      </button>

      <button
        onClick={handleFriendRequests}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-500 hover:bg-teal-600 text-white transition-colors duration-200 relative"
        title="Friend Requests"
      >
        <Bell size={20} />
        {count!==0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex justify-center items-center text-sm"><div>{count}</div></span>}
      </button>

      <button
        onClick={handleAddFriend}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-500 hover:bg-teal-600 text-white transition-colors duration-200"
        title="Add Friend"
      >
        <UserPlus size={20} />
      </button>

      <button
        onClick={LogOut}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
        title="Logout"
      >
        <LogOutIcon size={20} />
      </button>
    </div>
  );
}

export default MinimizedOptions;
