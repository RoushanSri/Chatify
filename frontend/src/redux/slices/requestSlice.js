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
  reducers: {
  incrementRequestCount: (state) => {
    state.count += 1;
  },
  decrementRequestCount: (state) => {
    state.count -= 1;
  }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchRequest.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchRequest.fulfilled, (state, action) => {
        state.loading = false;
        const requests=action.payload.requests
        state.requests = requests;
        state.count= requests.length
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

export const {incrementRequestCount, decrementRequestCount} =requestSlice.actions
export default requestSlice.reducer;
