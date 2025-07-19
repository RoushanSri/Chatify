import React from 'react';
import { useSelector } from 'react-redux';
import { X } from 'lucide-react';

function GroupList({ onSelectGroup, onClose, currentUser }) {
  const { profile } = useSelector((state) => state.user);

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
          Select a Group
        </h2>

        {profile?.groups?.length > 0 ? (
          <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
            {profile.groups.map((group) => {
              const isUserAlreadyMember = group.members.includes(currentUser._id)

              return (
                <button
                  key={group._id}
                  onClick={() => onSelectGroup(group)}
                  disabled={isUserAlreadyMember}
                  className={`w-full p-4 rounded-xl transition flex justify-between items-center ${
                    isUserAlreadyMember
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <p className="font-semibold">{group.name}</p>
                    <p className="text-sm text-gray-500">
                      {group.description || 'No description'}
                    </p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                    {group.members.length} members
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-sm text-center">
            You are not part of any groups yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default GroupList;
