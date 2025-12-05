import React, {useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { API_BASE_URL, API_ENDPOINTS } from '../constants/appConstant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../store/slices/userSlice'
import { Toast, useToast } from '../common/Toast'

const Layout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const { toast, showError } = useToast();
  
   
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
        showError(error.response?.message ||"Error fetching profile. Please try again.");
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
        {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  )
}

export default Layout

