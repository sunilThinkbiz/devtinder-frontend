import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { API_BASE_URL, API_ENDPOINTS } from "../constants/appConstant";

const ViewProfile = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fromRequests = searchParams.get("from") === "requests";
  const requestId = searchParams.get("requestId");

 useEffect(() => {
  const loadProfile = async () => {
    try {
      const url = `${API_BASE_URL}${API_ENDPOINTS.USERS.VIEW_PROFILE}/${id}`;
            const res = await axios.get(url, { withCredentials: true });
      setProfile(res.data.data);

    } catch (err) {
      console.log("Fetch profile error:", err);
    }
  };

  loadProfile();
}, [id]);

  const handleAcceptRequest = async () => {
    if (!requestId) {
      alert("Request ID not found");
      return;
    }
    setLoading(true);
    try {
      const url = `${API_BASE_URL}/request/review/accepted/${requestId}`;
      await axios.post(url, {}, { withCredentials: true });
      // Navigate back to requests page after accepting
      navigate("/request");
    } catch (err) {
      console.log("Accept request error:", err);
      alert("Failed to accept request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRejectRequest = async () => {
    if (!requestId) {
      alert("Request ID not found");
      return;
    }
    setLoading(true);
    try {
      const url = `${API_BASE_URL}/request/review/rejected/${requestId}`;
      await axios.post(url, {}, { withCredentials: true });
      // Navigate back to requests page after rejecting
      navigate("/request");
    } catch (err) {
      console.log("Reject request error:", err);
      alert("Failed to reject request. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  if (!profile)
    return (
      <div className="flex justify-center mt-20 text-xl">Loading...</div>
    );

  const { firstName, lastName, age, gender, about, photoUrl, email, skills } =
    profile;

  return (
    <div className="flex justify-center mt-12 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-6 w-full max-w-xl">

        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src={photoUrl}
            alt="profile"
            className="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-pink-400"
          />
        </div>

        {/* Name + Info */}
        <div className="text-center mt-4">
          <h1 className="text-3xl font-bold capitalize">
            {firstName} {lastName}
          </h1>

          {age && (
            <p className="text-gray-600 text-lg mt-1">
              {age} • {gender}
            </p>
          )}

          {email && <p className="text-gray-500 text-sm mt-1">{email}</p>}
        </div>

        {/* About Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">About</h2>
          <p className="text-gray-700 leading-relaxed">{about}</p>
        </div>

        {/* Interests */}
        {skills && skills.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          {fromRequests ? (
            <>
              <button
                onClick={handleAcceptRequest}
                disabled={loading}
                className="bg-green-500 text-white px-6 py-2 rounded-full shadow hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Accept"}
              </button>
              <button
                onClick={handleRejectRequest}
                disabled={loading}
                className="bg-red-500 text-white px-6 py-2 rounded-full shadow hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Reject"}
              </button>
              <button
                onClick={() => navigate("/request")}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full shadow hover:bg-gray-300"
              >
                Back
              </button>
            </>
          ) : (
            <>
              <button className="bg-pink-500 text-white px-6 py-2 rounded-full shadow hover:bg-pink-600">
                Message
              </button>
              <button
                onClick={() => navigate("/connections")}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full shadow hover:bg-gray-300"
              >
                Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
