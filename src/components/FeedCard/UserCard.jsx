import axios from "axios";
import React, { useState } from "react";
import { API_BASE_URL } from "../../constants/appConstant";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFeed } from "../../store/slices/feedSlice";

const UserCard = ({ user }) => {
  
  const navigate = useNavigate();
  const [loadingAction, setLoadingAction] = useState(false); 
  const dispatch=useDispatch()
  const {_id,firstName, lastName, age, about, gender, skills, photoUrl } = user;

  const handleReqeust = async (status,userId) => {
    setLoadingAction(true);
    try {
      await axios.post(`${API_BASE_URL}/request/send/${status}/${userId}`, {}, { withCredentials: true });
      dispatch(removeFeed(userId))
      navigate("/"); // go back to requests/Feed page
    } catch (error) {
      console.log("something went wrong",error)
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-[30px] overflow-hidden w-80 mx-auto transition hover:shadow-2xl">
      {/* IMAGE */}
      <div className="h-80 w-full">
        <img src={photoUrl} alt="photo" className="w-full h-full object-cover" />
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-t-[30px] -mt-10 pt-6 pb-4 px-5 relative z-10">
        
        {/* Name + Age */}
        <div className="mb-2 flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-500 tracking-wide">
            Name:
          </span>
          <h2 className="text-lg font-bold text-gray-900">
            {firstName} {lastName}
            {age && <span className="font-medium">, {age}</span>}
          </h2>
        </div>

        {/* Gender */}
        {gender && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-500 tracking-wide">
              Gender:
            </span>
            <p className="text-lg font-bold text-gray-900 capitalize">{gender}</p>
          </div>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <div className="mt-3">
            <span className="text-sm font-semibold text-gray-500 tracking-wide">
              Skills:
            </span>
            <div className="mt-1 flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-xl"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* About */}
        {about && (
          <div className="mt-3">
            <span className="text-sm font-semibold text-gray-500 tracking-wide">
              About:
            </span>
            <p className="text-gray-700 mt-1 line-clamp-3">{about}</p>
          </div>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex items-center justify-center gap-6 py-3 bg-white">
        
        {/* REJECT BUTTON */}
        <button
          onClick={() => handleReqeust("ignored",_id)}
          disabled={loadingAction}
          className="w-14 h-14 bg-white shadow-md rounded-full flex items-center justify-center text-red-500 text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingAction === "ignored" ? "..." : "✖"}
        </button>

        {/* ACCEPT BUTTON */}
        <button
          onClick={() => handleReqeust("interested",_id)}
          disabled={loadingAction}
          className="w-14 h-14 bg-white shadow-md rounded-full flex items-center justify-center text-green-500 text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingAction === "interested" ? "..." : "❤"}
        </button>

      </div>
    </div>
  );
};

export default UserCard;
