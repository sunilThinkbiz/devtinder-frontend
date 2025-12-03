import React from 'react'
import { useSelector } from 'react-redux'

const NavBar = () => {

 const user = useSelector((state) => state.user);
const userProfile = user?.data?.user;

const isUserLoggedIn = !!userProfile;
const showProfileImage = !!userProfile?.photoUrl;
// add users first name and last name
const displayName = isUserLoggedIn ? `${userProfile.firstName} ${userProfile.lastName}` : "Guest";


  return (
    <>
   <div className="navbar bg-gradient-to-r from-green-100 to-pink-100 text-gray-800">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl text-gray-800">SwipeSoul</a>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto bg-white text-gray-900" />
    </div>
      <p>{displayName}</p>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
         {isUserLoggedIn && showProfileImage ?(
        <img
          alt="Profile"
          src={userProfile.photoUrl}
          className="w-10 h-10 rounded-full"
        />
      ) : (
       <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      )}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
</>
  )
}

export default NavBar

