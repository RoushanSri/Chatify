import { config } from 'dotenv';
import express from 'express'
import connectDB from './config/db.js';
import cors from "cors";

const app = express();

config()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})