import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { X } from 'lucide-react';
import Avatar from '@mui/material/Avatar';
import img from '../assets/noImage.webp';

function FriendList({ onClose, onAddFriendToGroup, currentGroup }) {
  const { profile } = useSelector((state) => state.user);
  const [friends, setFriends] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([])

  useEffect(() => {
    if (Array.isArray(profile?.friends)) {
      setFriends(profile.friends);
    } else {
      setFriends([]);
    }
  }, [profile]);

  const toggleMember = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 overflow-auto max-h-screen">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 transition cursor-pointer"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <h2 className="text-2xl font-bold text-center text-teal-700 mb-6">
          Add Friends to Group
        </h2>

        <div className="mb-2 w-full flex justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Select Members to Add
          </label>
          <span className="text-sm text-gray-400 font-thin">
            Selected: {selectedMembers.length} Members
          </span>
        </div>

        <div className="max-h-80 overflow-y-auto space-y-2 pr-2">
          {friends.length > 0 ? (
            friends.map((friend) => {
              const isAlreadyInGroup = friend.groups?.includes(currentGroup._id);
              return (
              <button
                disabled={isAlreadyInGroup}
                key={friend._id}
                onClick={() => toggleMember(friend._id)}
                className={`flex items-center gap-3 p-2 w-full border rounded-xl cursor-pointer transition ${
                  isAlreadyInGroup
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
          : selectedMembers.includes(friend._id)
          ? 'bg-teal-100 border-teal-400'
          : 'hover:bg-gray-100'
                }`}
              >
                <Avatar src={img} />
                <div className="text-sm">
                  <p className="font-semibold">{friend.auth.username}</p>
                  <p className="text-xs text-gray-500">{friend.bio}</p>
                </div>
              </button>
            )})
          ) : (
            <p className="text-gray-500 text-sm text-center">No friends available</p>
          )}
            <button onClick={()=>onAddFriendToGroup(selectedMembers)} className='w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 rounded-xl font-medium hover:from-teal-700 hover:to-teal-800 transition cursor-pointer'>Add to the Group</button>
        </div>
      </div>
    </div>
  );
}

export default FriendList;
