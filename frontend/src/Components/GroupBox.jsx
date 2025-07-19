import Avatar from "@mui/material/Avatar";
import React from "react";
import img from "../assets/noImage.webp"
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeFriend } from "../redux/slices/userSlice";
import toast from "react-hot-toast";

function GroupBox({ group, currentGroup, setCurrentUser, setCurrentGroup }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch()

  const handleMenuOpen = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

//   const handleRemoveFriend = () => {
//     const toastId = toast.loading("Removing friend!!")
//     handleMenuClose();
//     dispatch(removeFriend({friendId:user._id}))
//     .then((res)=>{
//       if(res.error)
//         toast.error("Error while removing friend",{
//         id:toastId
//       })
//       toast.success("Friend Removed Successfully!!",{
//         id:toastId
//       })
//     })
//   };
  return (
    <div
      onClick={() => {
        setCurrentUser(null)
        setCurrentGroup(group)
      }}
      className={`w-full ${
        currentGroup?._id === group._id ? "bg-teal-900" : ""
      } text-white hover:bg-teal-800 transition-colors duration-200 rounded-lg cursor-pointer`}
    >
      <div className="flex w-full p-3 items-center gap-3">
            <Avatar src={img}/> 
        <div className="flex flex-col flex-1 min-w-0">
          <span className="font-semibold truncate">{group.name}</span>
          <p className="text-gray-300 text-sm truncate">
            Group
          </p>
        </div>
        {group.unreadCount > 0 && (
          <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {group.unreadCount}
          </span>
        )}
        <div onClick={(e) => e.stopPropagation()}>
          <IconButton
            size="small"
            onClick={handleMenuOpen}
            aria-controls={open ? "user-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreVertIcon className="text-white" />
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onClick={(e) => e.stopPropagation()}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                backgroundColor: "#1f2937",
                color: "white",
                borderRadius: 2,
                mt: 1,
                minWidth: 160,
                boxShadow:
                  "0px 4px 12px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <MenuItem
            //   onClick={handleRemoveFriend}
              sx={{
                "&:hover": {
                  backgroundColor: "#14b8a6",
                  color: "white",
                },
              }}
            >
              Leave Group
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default GroupBox;
