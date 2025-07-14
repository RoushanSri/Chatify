import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequest } from "../redux/slices/requestSlice.js";
import Button from "@mui/material/Button";
import { addFriend } from "../redux/slices/userSlice.js";

function FriendRequests({ onClose }) {
  const dispatch = useDispatch();
  const { requests, loading, error } = useSelector((state) => state.request);

  useEffect(() => {
    dispatch(fetchRequest());
  }, [dispatch]);

  const handleRespond = (id, accept) => {
    if (accept) dispatch(addFriend({ friendId: id }));
    else {
      //will handle
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Friend Requests</h2>

        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : requests.length === 0 ? (
          <div className="text-gray-500 text-center">No friend requests</div>
        ) : (
          requests.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between border p-3 rounded-lg mb-3"
            >
              <div>
                <p className="font-medium">{user.senderId?.auth.username}</p>
                <p className="text-sm text-gray-500">
                  {user.senderId?.auth.email}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleRespond(user.senderId._id, true)}
                  variant="success"
                >
                  Accept
                </Button>
                <Button
                  onClick={() => handleRespond(user.senderId._id, false)}
                  variant="destructive"
                >
                  Reject
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FriendRequests;
