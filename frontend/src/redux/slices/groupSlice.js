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
        groups:[]
    },
    extraReducers:(builder)=>
        builder
            .addCase(createGroup.pending,(state)=>{
                state.loading=false
                state.error=null
            })
            .addCase(createGroup.fulfilled,(state, action)=>{
                state.loading=false
                state.groups.push(action.payload.group)
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
                const updatedGroup = action.payload.group;
                const index = state.groups.findIndex(g => g._id === updatedGroup._id);
                if (index !== -1) {
                    state.groups[index] = updatedGroup;
                } else {
                    state.groups.push(updatedGroup);
                }
            })
            .addCase(addMember.rejected,(state, action)=>{
                state.loading=false
                state.error=action.payload
            })
})

export default groupSlice.reducer;