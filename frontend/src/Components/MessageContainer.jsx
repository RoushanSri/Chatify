import React from "react";

function MessageContainer({ message, currentUser }) {
  const isCurrentUser = (sender) => {
    return sender.id === currentUser.id;
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };  

  return (
    <div
      key={message.id}
      className={`flex flex-col ${
        isCurrentUser(message.sender) ? "items-end" : "items-start"
      } group`}
    >
      <div
        className={`px-4 py-3 rounded-2xl max-w-xs lg:max-w-md shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 ${
          isCurrentUser(message.sender)
            ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white"
            : "bg-white border border-gray-200 text-gray-800"
        }`}
      >
        {!isCurrentUser(message.sender) && (
          <p className="text-xs font-medium text-teal-600 mb-1">
            {message.sender.name}
          </p>
        )}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.text}
        </p>
      </div>
      <span
        className={`text-xs text-gray-400 mt-1 ${
          isCurrentUser(message.sender) ? "mr-2" : "ml-2"
        }`}
      >
        {formatTime(message.timestamp)}
      </span>
    </div>
  );
}

export default MessageContainer;
