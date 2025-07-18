import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import ChatBox from './ChatBox.jsx'

const ChatContainer = ({ currentUser, currentGroup }) => {
  return (
    <>
      {!currentUser&&!currentGroup ? (
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <MessageCircle size={40} className="text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to Chat
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Select a conversation from the sidebar to start chatting, or search for someone new to connect with.
            </p>

            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h4 className="font-semibold text-gray-800 mb-2">💡 Quick Tips</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Click on any conversation to start chatting</li>
                <li>• Use the search bar to find specific messages</li>
                <li>• Create groups for team conversations</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <ChatBox currentUser={currentUser} currentGroup={currentGroup}/>
      )}
    </>
  );
};

export default ChatContainer;