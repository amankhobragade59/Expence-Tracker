import { create } from "zustand";
import axiosInstance from "../api/axios.js";
import { toast } from "react-hot-toast";
import { redirect } from "react-router-dom";

export const useAuthStore = create((set) => ({
  authUser: null,
  isLoading: false,
  isSigning: false,
  isLogging: false,
  isLoggingOut: false,
  signupUser: async (formData) => {
    try {
      set({isSigning:true});
      const res = await axiosInstance.post("/user/add-user", formData);
      set({ authUser: res.data.user });
      toast.success("Signup successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed!");
    } finally{
      set({isSigning:false});
    }
  },

  loginUser: async (formData) => {
    try {
      set({isLogging:true});
      const res = await axiosInstance.post("/user/login", formData);
      set({ authUser: res.data.user });
      toast.success("Login successful!");
      redirect("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    } finally{
      set({isLogging:false});
    }
  },

  logoutUser: async () => {
    try {
      set({isLoggingOut:true});
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Logout failed!");
    } finally{
      set({isLoggingOut:false});
    }
  },

  getAuthUser: async () => {
    try {
      set({isLoading:true});
      const res = await axiosInstance.post("/auth/user");
      console.log("aaa",res.data.user);
      set({ authUser: res.data.user });
    } catch (error) {
      set({ authUser: null});
      console.error(error);
    } finally{
      console.log("finnaly")
      set({isLoading:false});
    }
  },
}));
