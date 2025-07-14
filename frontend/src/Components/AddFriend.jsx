import React, { useState } from "react";
import { axiosInstance } from "../lib/axiosIntance";
import { UserPlus } from "lucide-react"
import { useDispatch, useSelector } from "react-redux";

function AddFriend({ onClose }) {
  const [email, setEmail] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {profile} = useSelector(state=>state.user)

  const handleSearch = async () => {
    try {
      setError("");
      setSuccess("");
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get(`/user/search?email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data?.user) {        
        setSearchedUser(res.data);
      } else {
        setError("User not found");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  
  const handleSendRequest = async () => {
    if(!searchedUser || !profile._id) return;
      try{
        const token = localStorage.getItem("token");
        const res = await axiosInstance.post(`/request/sendRequest`, {
           recieverId:searchedUser.user._id
        }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      }catch(e){
        console.log(e);
        
      }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white opacity-100 rounded-xl shadow-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          Add a Friend
        </h2>

        <div className="flex gap-2 mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="border px-3 py-2 rounded w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        {searchedUser && (
          <div className="flex items-center gap-4 border rounded-xl p-4 bg-white shadow-md">
            <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center text-xl font-bold">
              {searchedUser.user.auth.username?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold">{searchedUser.user.auth.username}</p>
              <p className="text-sm text-gray-600">{searchedUser.user.auth.email}</p>
            </div>
            <button
  onClick={handleSendRequest}
  disabled={searchedUser.alreadyFriend || searchedUser.alreadyRequested}
  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
    searchedUser.alreadyFriend || searchedUser.alreadyRequested
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-teal-600 hover:bg-teal-700 text-white"
  }`}
>
  <UserPlus className="w-5 h-5" />
  {searchedUser.alreadyFriend ? "Already Friends" : searchedUser.alreadyRequested?"Pending Request":"Send Request"}
</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddFriend;
