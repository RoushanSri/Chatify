import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axiosIntance.js";

export const getMessages = createAsyncThunk(
    "message/getMessages",
    async({friendId},{rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token")
            const response = await axiosInstance.get(`/message/${friendId}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const sendMessage = createAsyncThunk(
    "message/sendMessage",
    async({friendId, text, image, replyId},{rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token")
            const response = await axiosInstance.post(`/message/send/${friendId}`, { text, image, replyId }, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const messageSlice = createSlice({
    name:"message",
    initialState:{
        loading:false,
        error:null,
        messages:[]
    },
    extraReducers:(builder)=>
        builder
            .addCase(getMessages.pending,(state)=>{
                state.loading=false
                state.error=null
            })
            .addCase(getMessages.fulfilled,(state, action)=>{
                state.loading=false
                state.messages=action.payload.messages
            })
            .addCase(getMessages.rejected,(state, action)=>{
                state.loading=false
                state.error=action.payload
            })
            .addCase(sendMessage.pending,(state)=>{
                state.loading=false
                state.error=null
            })
            .addCase(sendMessage.fulfilled,(state, action)=>{
                state.loading=false
                state.messages.push(action.payload.message)
            })
            .addCase(sendMessage.rejected,(state, action)=>{
                state.loading=false
                state.error=action.payload
            })
})

export default messageSlice.reducer;