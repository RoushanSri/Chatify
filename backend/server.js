import { config } from 'dotenv';
import express from 'express'
import connectDB from './config/db.js';
import cors from "cors";
import authRoutes from './routes/auth.route.js'
import userRoutes from "./routes/user.routes.js"
import messageRoutes from "./routes/message.routes.js"
import { app, server } from './config/socket.js';

config()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/message', messageRoutes)

const PORT = process.env.PORT;

server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})