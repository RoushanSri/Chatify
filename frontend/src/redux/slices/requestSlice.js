import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axiosIntance.js";

export const fetchRequest = createAsyncThunk(
  "request/fetchRequest",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(`/request/fetchRequest`, {
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

export const fetchRequestCount = createAsyncThunk(
  "request/fetchRequestCount",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(`/request/fetchRequestCount`, {
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

const requestSlice = createSlice({
  name: "request",
  initialState: {
    loading: false,
    error: null,
    requests: [],
    count: 0
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchRequest.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload.requests;
      })
      .addCase(fetchRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRequestCount.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchRequestCount.fulfilled, (state, action) => {
        state.loading = false;
        state.count = action.payload.count;
      })
      .addCase(fetchRequestCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

});

export default requestSlice.reducer;
