import axios from "axios";
import React, { useState } from "react";
import { API_BASE_URL, API_ENDPOINTS } from "../constants/appConstant";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { Toast, useToast } from "../common/Toast";

export const Login = () => {
  const [emailId, setEmailId] = useState(" ");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { toast, showSuccess, showError } = useToast();
  
  const handleLogin = async () => {
   try{
    const res = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
        email: emailId,
        password: password,
      },{withCredentials: true});
     dispatch(addUser(res.data.data.user));
     showSuccess("Login successful!");
     setTimeout(() => navigate("/"), 500);
   }catch(error){
    showError(error.response?.data?.message || "Login failed. Please try again.")
   }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] w-full px-4">
      <div className="card bg-white w-96 shadow-2xl border border-gray-100">
        <div className="card-body">
          <h2 className="card-title text-gray-800">Login</h2>
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                value={emailId}
                className="grow"
                placeholder="Email"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 mt-4">
              <input
                type="password"
                value={password}
                className="grow"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="mt-4">
            <button
              className="btn w-full bg-pink-500 text-white border-none hover:bg-pink-600 shadow-md hover:shadow-lg transition-all"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div className="flex flex-row justify-evenly mt-4">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
              Forgot password?
            </a>
            <Link to="/signup" className="text-sm text-pink-500 hover:text-pink-600">
              Create account
            </Link>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

