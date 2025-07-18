import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axiosIntance.js";

export const createGroup = createAsyncThunk(
    "group/createGroup",
    async({name, description, members},{rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token")
            const response = await axiosInstance.post(`/group/createGroup`,{
                name,
                description,
                members
            },{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.messagep);
        }
    }
)

export const addMember = createAsyncThunk(
    "group/addMember",
    async({friendId, groupId},{rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token")
            const response = await axiosInstance.post(`/group/addMember/${groupId}`, { friendId }, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.messagep);
        }
    }
)

const groupSlice = createSlice({
    name:"group",
    initialState:{
        loading:false,
        error:null,
        group:null
    },
    extraReducers:(builder)=>
        builder
            .addCase(createGroup.pending,(state)=>{
                state.loading=false
                state.error=null
            })
            .addCase(createGroup.fulfilled,(state, action)=>{
                state.loading=false
                state.group=action.payload.group
            })
            .addCase(createGroup.rejected,(state, action)=>{
                state.loading=false
                state.error=action.payload
            })
            .addCase(addMember.pending,(state)=>{
                state.loading=false
                state.error=null
            })
            .addCase(addMember.fulfilled,(state, action)=>{
                state.loading=false
                state.group = action.payload.group;
                
            })
            .addCase(addMember.rejected,(state, action)=>{
                state.loading=false
                state.error=action.payload
            })
})

export default groupSlice.reducer;