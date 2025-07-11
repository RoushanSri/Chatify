import Avatar from "@mui/material/Avatar";
import React from "react";
import img from "../assets/noImage.webp"

function UserBox({ user, setCurrentUser, currentUser }) {
  return (
    <div
      onClick={() => setCurrentUser(user)}
      className={`w-full ${
        currentUser?.id === user.id ? "bg-teal-900" : ""
      } text-white hover:bg-teal-800 transition-colors duration-200 rounded-lg cursor-pointer`}
    >
      <div className="flex w-full p-3 items-center gap-3">
            <Avatar src={img}/> 
        <div className="flex flex-col flex-1 min-w-0">
          <span className="font-semibold truncate">{user.name}</span>
          <p className="text-gray-300 text-sm truncate">
            {user.lastMessage || "No messages yet."}
          </p>
        </div>
        {user.unreadCount > 0 && (
          <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {user.unreadCount}
          </span>
        )}
      </div>
    </div>
  );
}

export default UserBox;
