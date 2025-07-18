import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import img from "../assets/noImage.webp"


function CreateGroup({ onClose }) {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [friends, setFriends] = useState([])

  const {profile} = useSelector(state=>state.user)

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call logic here
    console.log({ groupName, description, selectedMembers });
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
          Create New Group
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Name
            </label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-600"
              rows="3"
              placeholder="Write a short description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <div className="mb-2 w-full flex justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Select at least one Member
            </label>
            <span className="text-sm text-gray-400 font-thin">Selected: {selectedMembers.length} Members</span>
            </div>
            <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
              {friends.length > 0 ? (
                friends.map((friend) => (
                  <div
                    key={friend._id}
                    className={`flex items-center gap-3 p-2 border rounded-xl cursor-pointer transition ${
                      selectedMembers.includes(friend._id)
                        ? "bg-teal-100 border-teal-400"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => toggleMember(friend._id)}
                  >
                    <Avatar src={img}/>
                    <div className="text-sm">
                      <p className="font-semibold">{friend.auth.username}</p>
                      <p className="text-xs text-gray-500">{friend.bio}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center">
                  No friends available
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 rounded-xl font-medium hover:from-teal-700 hover:to-teal-800 transition cursor-pointer"
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateGroup;
