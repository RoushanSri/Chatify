import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js"
import userSlice from "./slices/userSlice.js";
import messageSlice from "./slices/messageSlice.js"
import requestSlice from "./slices/requestSlice.js"
import groupSlice from "./slices/groupSlice.js"

export const store = configureStore({
    reducer:{
        auth: authSlice,
        user: userSlice,
        message: messageSlice,
        request: requestSlice,
        group: groupSlice
    }
})