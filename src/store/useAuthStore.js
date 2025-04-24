import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";

export const useAuthStore = create(persist((set) => ({
  authUser: null,
  token: false,

  checkAuth: async () => {
    try {
      await axiosInstance.get("/checkauth", { withCredentials: true, });
      set({ token: true });
    } catch (error) {
      set({ authUser: null });
      set({ token: false });
    }
  },

  user: (data) => {
    set({ authUser: data });
  },

  logout: async () => {
    try {
      await axiosInstance.post("/logout", { withCredentials: true, })
      set({ authUser: null });
      set({ token: false });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}),
  {
    name: "user-storage",
    storage: createJSONStorage(() => sessionStorage),
  }
));
