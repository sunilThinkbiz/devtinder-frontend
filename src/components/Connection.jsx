import React, {useEffect } from 'react'
import { API_BASE_URL, API_ENDPOINTS } from '../constants/appConstant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../store/slices/connectionSlice';
import { useNavigate } from 'react-router-dom';

const Connection = () => {
    const connections = useSelector((state) => state.connection);
    const dispatch = useDispatch();
    const navigate  = useNavigate()
    const fetchConnections = async () => {
        const res = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.CONNECTIONS}`, {withCredentials: true});
        dispatch(addConnection(res.data.data));

    }

    useEffect(() => {
        fetchConnections();
    }, []);

    if(!connections) return;
    if(connections.length === 0){
        return <div className="min-h-screen flex items-center justify-center text-2xl font-medium">No Connections Found</div>
    }
 return (
  <div className="flex flex-col items-center mt-10">
    <h1 className="text-3xl font-bold mb-8">Connections</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {connections.map((connection, index) => {
        const { firstName, lastName, photoUrl, age, gender, about, email } = connection;

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

              <p className="text-gray-600 text-sm mt-2 line-clamp-3">{about}</p>

              <button  onClick={() => navigate(`/profile/${connection._id}`)} className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-full shadow-md">
                View Profile
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

}

export default Connection