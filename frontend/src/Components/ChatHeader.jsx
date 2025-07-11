import React, { useState } from 'react';
import { 
  MoreVertical, 
  Phone, 
  Video, 
  Search, 
  Trash2, 
  Settings, 
  UserPlus,
  Archive,
  Bell,
  BellOff
} from 'lucide-react';
import Avatar from '@mui/material/Avatar';
import img from "../assets/noImage.webp"

const ChatHeader = ({currentUser}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear this conversation? This action cannot be undone.')) {
      // Add your clear chat logic here
      console.log('Chat cleared');
      setShowDropdown(false);
    }
  };

  const toggleNotifications = () => {
    setIsNotificationsEnabled(!isNotificationsEnabled);
    setShowDropdown(false);
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg">
      <div className="flex items-center gap-3">
          <Avatar alt="Remy Sharp" src={img} />
        <div>
          <h3 className="font-bold text-lg">{currentUser.name}</h3>
          <p className="text-xs text-teal-100">{currentUser.bio}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200">
          <Search size={20} />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200">
          <Phone size={20} />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200">
          <Video size={20} />
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
          >
            <MoreVertical size={20} />
          </button>

          {showDropdown && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowDropdown(false)}
              ></div>
              <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20">
                <button 
                  onClick={handleClearChat}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-3 transition-colors"
                >
                  <Trash2 size={16} />
                  Clear Chat History
                </button>
                
                <button 
                  onClick={toggleNotifications}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                >
                  {isNotificationsEnabled ? <BellOff size={16} /> : <Bell size={16} />}
                  {isNotificationsEnabled ? 'Mute Notifications' : 'Enable Notifications'}
                </button>
                
                <hr className="my-2 border-gray-200" />
                
                <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                  <UserPlus size={16} />
                  Add to Group
                </button>
                
                <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                  <Archive size={16} />
                  Archive Chat
                </button>
                
                <hr className="my-2 border-gray-200" />
                
                <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                  <Settings size={16} />
                  Chat Settings
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;