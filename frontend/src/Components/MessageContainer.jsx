import { CornerUpLeft } from "lucide-react";
import React from "react";

function MessageContainer({ message, currentUser, onReply }) {
  const isCurrentUser = (sender) => {
    return sender._id !== currentUser._id;
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };  

  return (
    <div
      key={message._id}
      className={`flex flex-col ${
        isCurrentUser(message.senderId) ? "items-end" : "items-start"
      } group`}
    >
      <div
        className={`px-4 py-3 rounded-2xl max-w-xs lg:max-w-md relative shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 ${
          isCurrentUser(message.senderId)
            ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white"
            : "bg-white border border-gray-200 text-gray-800"
        }`}
      >
        {!isCurrentUser(message.senderId) && (
          <p className="text-xs font-medium text-teal-600 mb-1">
            {message.senderId.auth.username}
          </p>
        )}
        {message.repliedTo && (
            <div
              className={`mb-2 px-3 py-2 rounded-md border-l-4 ${
                isCurrentUser(message.senderId)
                  ? "bg-white/20 border-white text-white"
                  : "bg-gray-100 border-teal-500 text-gray-800"
              }`}
            >
              <p className="text-xs font-semibold">
                {message.repliedTo.senderId?.auth?.username || "Unknown User"}
              </p>
              <p className="text-xs italic line-clamp-2">
                {message.repliedTo.text?.trim() || "[Image]"}
              </p>
            </div>
          )}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.text}
        </p>
        <button
        title="Reply"
        onClick={() => onReply?.(message)}
        className={`absolute top-1/3 text-xs ${isCurrentUser(message.senderId)?"-left-6":"-right-6"} p-1 hidden group-hover:flex items-center gap-1 text-gray-400 hover:text-teal-500 transition`}
      >
        <CornerUpLeft size={14} />
      </button>
      </div>
      <span
        className={`text-xs text-gray-400 mt-1 ${
          isCurrentUser(message.senderId) ? "mr-2" : "ml-2"
        }`}
      >
        {formatTime(message.createdAt)}
      </span>
    </div>
  );
}

export default MessageContainer;
