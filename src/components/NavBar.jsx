import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL, API_ENDPOINTS } from "../constants/appConstant";
import { removeUser } from "../store/slices/userSlice";


const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
       await axios.post(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGOUT}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <>
      <div className="navbar bg-gradient-to-r from-green-100 to-pink-100 text-gray-800 sticky top-0 z-50  px-4 md:px-8">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl text-gray-800">
            SwipeSoul
          </Link>
        </div>
        {user && (
          <div className="flex-none gap-2">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto bg-white text-gray-900"
              />
            </div>
            <p className="text-2xm font-medium">{user.firstName} {user.lastName}</p>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile"
                    src={user?.photoUrl}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogOut}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
