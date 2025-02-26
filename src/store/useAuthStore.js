import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { persist,createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";

export const useAuthStore = create(persist((set) => ({
  authUser: null,
 
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/checkauth",{withCredentials:true,});
    } catch (error) {
      toast.error(error.response.data.message);
      set({ authUser: null });
    } 
  },

  user: async (data) => {
    set({ authUser: data });
  },

  logout: async () => {
    try {
      await axiosInstance.post("/logout",{withCredentials:true,})
      set({ authUser: null });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}),
  {
        name:"user-storage",
        storage:createJSONStorage(()=>sessionStorage),
  }
));
