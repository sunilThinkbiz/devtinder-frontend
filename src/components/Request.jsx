import axios from "axios";
import React, { useEffect } from "react";
import { API_BASE_URL, API_ENDPOINTS } from "../constants/appConstant";
import { addReqeust } from "../store/slices/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Request = () => {
  const requests = useSelector((state) => state.request);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchRequest = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.REQUESTS}`, {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addReqeust(res.data.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  console.log("req", requests);
  useEffect(() => {
    fetchRequest(); // call the function
  }, []);

  if (!requests) return null;
  if (requests.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-medium">
        No Connections Found
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-8">Request</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {requests.map((request, index) => {
          const user = request.fromToUserId; // <- use this
          if (!user) return null;

          const {
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
            email,
            _id,
          } = user;
          return (
            <div
              key={index}
              className="bg-white shadow-xl rounded-3xl p-5 w-80 hover:scale-105 transition-transform cursor-pointer"
            >
              <img
                src={photoUrl}
                alt="profile"
                className="w-40 h-40 rounded-full object-cover mx-auto shadow-md"
              />
              <div className="text-center mt-4">
                <h2 className="text-xl font-semibold capitalize">
                  {firstName} {lastName}
                </h2>
                {age && (
                  <p className="text-gray-500 text-sm">
                    {age} • {gender}
                  </p>
                )}
                {email && <p className="text-gray-500 text-sm mt-1">{email}</p>}
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {about}
                </p>
                <button
                  onClick={() => navigate(`/profile/${_id}?from=requests&requestId=${request._id}`)}
                  className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full shadow-md"
                >
                  View Profile
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Request;
