import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL:
        import.meta.env.NODE_ENV === "devlopment"
            ? "http://localhost:5001"
            : import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
})