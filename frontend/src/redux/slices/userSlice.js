import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axiosIntance";

export const getUserProfile = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/user/getProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addFriend = createAsyncThunk(
  "user/addFriend",
  async ({ friendId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post("/user/addFriend", {friendId}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFriend = createAsyncThunk(
  "user/removeFriend",
  async({friendId},{rejectWithValue})=>{
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.delete(`/user/removeFriend?friendId=${friendId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

const initialState = {
  loading: false,
  error: null,
  profile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addGroup: (state, action) => {
      const { group } = action.payload;
      state.profile.groups.push(group);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload.user;
        state.loading = false;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addFriend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFriend.fulfilled, (state, action) => {
        state.profile.friends = action.payload.data;
        state.loading = false;
      })
      .addCase(addFriend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFriend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFriend.fulfilled, (state, action) => {
        const removedId = action.payload.friendId;
        state.profile.friends = state.profile.friends.filter(
          (friend) => friend._id !== removedId
        );
        state.loading = false;
      })
      .addCase(removeFriend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const {addGroup} =userSlice.actions
export default userSlice.reducer;
