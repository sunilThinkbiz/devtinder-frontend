import axios from "axios";
import React, { useState } from "react";
import { API_BASE_URL, API_ENDPOINTS } from "../constants/appConstant";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { Toast, useToast } from "../common/Toast";

export const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isForgotForm, setIsForgotForm] = useState(false);
  const [isSignupForm, setIsSignupForm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast, showSuccess, showError } = useToast();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`,
        {
          email: emailId,
          password: password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data.user));
      showSuccess("Login successful!");
      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      showError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleForgotPassword = async () => {
    // Validation for forgot password fields only
    if (!emailId || !password || !confirmPassword) {
      showError("Please fill in all fields (Email, New Password, and Confirm Password)!");
      return;
    }

    if (password !== confirmPassword) {
      showError("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      showError("Password must be at least 6 characters long!");
      return;
    }

    try {
      const res = await axios.patch(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.FOGOTPASSWORD}`,
        {
          email: emailId,
          newPassword: password,
          confirmPassword: confirmPassword,
        },
        { withCredentials: true }
      );
      showSuccess("Password reset successfully!");
      if (res.data.data?.user) {
        dispatch(addUser(res.data.data.user));
      }
      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      const errorMessage = 
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        "Failed to reset password. Please try again.";
      showError(errorMessage);
    }
  };

  const handleSignup = async () => {
    // Validation for signup fields only
    if (!firstName || !lastName || !emailId || !password || !gender) {
      showError("Please fill in all fields (First Name, Last Name, Email, Password, and Gender)!");
      return;
    }

    if (password.length < 6) {
      showError("Password must be at least 6 characters long!");
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.SIGNUP}`,
        {
          firstName: firstName,
          lastName: lastName,
          email: emailId,
          password: password,
          gender: gender,
        },
        { withCredentials: true }
      );
      showSuccess("Sign up successful!");
      dispatch(addUser(res.data.data.user));
      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      const errorMessage = 
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        "SignUp failed. Please try again.";
      showError(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] w-full px-4 mb-2">
      <div className="card bg-white w-96 shadow-2xl border border-gray-100">
        <div className="card-body">
          <h2 className="card-title text-gray-800">
            {isLoginForm && !isForgotForm && !isSignupForm ? "Login" : 
             isForgotForm ? "Forgot Password" : 
             "Sign Up"}
          </h2>

          {/* SIGNUP FIELDS: First Name, Last Name, Gender */}
          {isSignupForm && (
            <>
              <label className="form-control w-full max-w-xs my-2">
                <span className="label-text">First Name</span>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <span className="label-text">Last Name</span>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </>
          )}

          {/* EMAIL - Common field for all forms */}
          <label className="form-control w-full max-w-xs my-2">
            <span className="label-text">Email</span>
            <input
              type="email"
              value={emailId}
              className="input input-bordered w-full"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>

          {/* PASSWORD - For Login and Sign Up */}
          {(isLoginForm && !isForgotForm && !isSignupForm) || isSignupForm ? (
            <label className="form-control w-full max-w-xs my-2">
              <span className="label-text">Password</span>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          ) : null}

          {/* FORGOT PASSWORD FIELDS: New Password, Confirm Password */}
          {isForgotForm && (
            <>
              <label className="form-control w-full max-w-xs my-2">
                <span className="label-text">New Password</span>
                <input
                  type="password"
                  value={password}
                  className="input input-bordered w-full"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <span className="label-text">Confirm Password</span>
                <input
                  type="password"
                  value={confirmPassword}
                  className="input input-bordered w-full"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
            </>
          )}

          {/* GENDER - Only for Sign Up */}
          {isSignupForm && (
            <label className="form-control w-full max-w-xs my-2">
              <span className="label-text">Gender</span>
              <select
                value={gender}
                className="select select-bordered w-full"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          )}

          {/* BUTTON */}
          <div className="mt-4">
            <button
              className="btn w-full bg-pink-500 text-white border-none hover:bg-pink-600 shadow-md"
              onClick={
                isLoginForm && !isForgotForm && !isSignupForm
                  ? handleLogin
                  : isForgotForm
                  ? handleForgotPassword
                  : handleSignup
              }
            >
              {isLoginForm && !isForgotForm && !isSignupForm
                ? "Login"
                : isForgotForm
                ? "Forgot Password"
                : "Sign Up"}
            </button>
          </div>

          {/* LINKS - Only show in Login form */}
          {isLoginForm && !isForgotForm && !isSignupForm && (
            <div className="flex flex-row justify-evenly mt-4">
              <button
                className="text-sm text-gray-600 hover:text-gray-800"
                onClick={() => {
                  setIsForgotForm(true);
                  setIsSignupForm(false);
                }}
              >
                Forgot password?
              </button>

              <button
                className="text-sm text-pink-500 hover:text-pink-600"
                onClick={() => {
                  setIsSignupForm(true);
                  setIsForgotForm(false);
                }}
              >
                Create account
              </button>
            </div>
          )}

          {/* Back to Login links */}
          {(isForgotForm || isSignupForm) && (
            <div className="flex flex-row justify-center mt-4">
              <button
                className="text-sm text-pink-500 hover:text-pink-600"
                onClick={() => {
                  setIsLoginForm(true);
                  setIsForgotForm(false);
                  setIsSignupForm(false);
                }}
              >
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>

      {/* TOAST */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};
