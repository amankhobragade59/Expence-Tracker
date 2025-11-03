import React, { useEffect, useState } from "react";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
export default function Login() {
  const {isLogging,loginUser,authUser,getAuthUser} = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(()=>{
    if(authUser){
       navigate("/");
    }
  },[authUser,navigate])

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Basic validation
    if (!formData.email) return setError("Please enter your email.");
    if (!formData.password) return setError("Please enter your password.");
    // Simple email pattern check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) return setError("Please enter a valid email address.");

    await loginUser(formData);
    
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-900 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-zinc-700 rounded-2xl shadow-md p-8 space-y-6"
        aria-label="login form"
      >
        <h2 className="text-2xl font-semibold text-white text-center">Sign in</h2>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 p-2 rounded">{error}</div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData,email:e.target.value})}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Password
          </label>
          <div className="mt-1 relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({...formData,password:e.target.value})}
              required
              minLength={6}
              className="block w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 pr-12"
              placeholder="••••••••"
            />

            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm px-2 py-1 rounded-md focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <p className="mt-2 text-xs text-white">Password must be at least 6 characters.</p>
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
           {isLogging ? <>Submitting...</>:<>Sign in </>} 
          </button>
        </div>

        <p className="text-center text-sm text-white">
          Don’t have an account?<NavLink to='/signup' className="text-indigo-300 hover:underline">Sign up</NavLink>
        </p>
      </form>
    </div>
  );
}

