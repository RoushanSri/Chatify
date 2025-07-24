import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "https://chatify-cahh.onrender.com/api/v1",
    withCredentials: true,
})