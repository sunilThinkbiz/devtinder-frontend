import React, {useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { API_BASE_URL, API_ENDPOINTS } from '../constants/appConstant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../store/slices/userSlice'

const Layout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  
   
    const fetchUserProfile = async() => {
      try{
         if(userData) return;
         const res = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.USERS.PROFILE}`, {withCredentials: true});
       dispatch(addUser(res.data));
      }catch (error) {
      if (error.response?.status === 401) {
        console.log("User not authenticated");
        navigate("/login");
      } else {
        console.error("Error fetching profile:", error);
      }
      }
  };
useEffect(() => {
 fetchUserProfile();
   
  }, []);
 
  return (
    <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default Layout

